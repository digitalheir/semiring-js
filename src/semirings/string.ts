import {Equals, Product, Union} from "../util/sets";
import {Semiring} from "../index";

export interface FormalLanguage<T> {
    alphabet: Set<T>;
    content: Set<{} | string | T[]>;
}

export function createStringSemiring<T>(S: Set<T>): Semiring<FormalLanguage<T>> {
    const multiplicativeIdentity: FormalLanguage<T> = {
        alphabet: S,
        content: new Set<T>()
    };
    const additiveIdentity: FormalLanguage<T> = {
        alphabet: S,
        content: new Set<T>()
    };
    return {
        additiveIdentity,
        multiplicativeIdentity,
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

export function Concatenation<T>(firstLang: FormalLanguage<T>, secondLang: FormalLanguage<T>) {
    if (!Compatible(firstLang, secondLang)) {
        throw new Error("Arguments are not compatible.");
    }

    const alphabet = firstLang.alphabet;
    const content = Product(firstLang.content, secondLang.content, wordProduct) || new Set<T>();

    return {
        alphabet,
        content
    };
}


function isString<T>(val: string | any[]): val is string | string[] {
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

export function LanguageUnion<T>(firstLang: FormalLanguage<T>, secondLang: FormalLanguage<T>) {
    if (!Compatible(firstLang, secondLang)) {
        throw new Error("Arguments do not have compatible alphabets.");
    }

    return {
        alphabet: firstLang.alphabet,
        content: Union(firstLang.content, secondLang.content) || new Set<T>()
    };
}

export function Compatible<T>(firstLang: FormalLanguage<T>, secondLang: FormalLanguage<T>) {
    return Equals(firstLang.alphabet, secondLang.alphabet);
}
