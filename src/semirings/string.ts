import {Equals, Product, Union} from "../util/sets";
import {Semiring} from "../index";

export class FormalLanguage {
    readonly alphabet: Set<any>;
    readonly content: Set< {} | string | Array<any>>;

    constructor(alphabet: Set<any>, content?: Set<Array<any> | string>) {
        this.alphabet = alphabet;
        this.content = content || new Set();
    };
}

export function StringSemiring(S: Set<any>): Semiring<FormalLanguage> {
    return {
        additiveIdentity: new FormalLanguage(S),
        multiplicativeIdentity: new FormalLanguage(S, new Set([])),
        plus: LanguageUnion,
        times: Concatenation
    };
}

function wordProduct(x: any[] | string, y: any[] | string) {
    if (x instanceof Array && x.length === 0) {
        return y;
    }

    if (y instanceof Array && y.length === 0) {
        return x;
    }

    if (typeof x === "string" && typeof y === "string") {
        return x + y;
    } else if (isString(x) || isString(y)) {
        return toString(x) + toString(y);
    } else {
        return x.concat(y);
    }
}

export function Concatenation(firstLang: FormalLanguage, secondLang: FormalLanguage) {
    if (!Compatible(firstLang, secondLang)) {
        throw new Error("Arguments are not compatible.");
    }

    const alph = firstLang.alphabet;
    const content = Product(firstLang.content, secondLang.content, wordProduct);
    return new FormalLanguage(alph, content);
}


function isString(val: string | Array<any>): val is string {
    if (typeof val === "string") {
        return true;
    }

    if (val instanceof Array) {
        for (const item of val) {
            if (!isString(item)) {
                return false;
            }
        }

        return true;
    }

    return false;
}

function toString(val: any): string {
    if (typeof val === "string") {
        return val;
    }

    const retString = [];

    if (val instanceof Array) {
        for (const item of val) {
            const substring = toString(item);
            if (!isString(substring)) {
                return undefined;
            } else {
                retString.push(substring);
            }
        }
    }

    return retString.join("");
}

export function LanguageUnion(firstLang: FormalLanguage, secondLang: FormalLanguage) {
    if (!Compatible(firstLang, secondLang)) {
        throw new Error("Arguments do not have compatible alphabets.");
    }

    return new FormalLanguage(firstLang.alphabet, Union(firstLang.content, secondLang.content));
}

export function Compatible(firstLang: FormalLanguage, secondLang: FormalLanguage) {
    return Equals(firstLang.alphabet, secondLang.alphabet);
}
