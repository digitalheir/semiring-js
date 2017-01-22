import {Equals, Product, Union} from "../set";
import {Semiring} from "../index";

export class FormalLanguage {
    readonly alphabet: Set<any>;
    readonly content: Set< {} | Array<any>>;

    constructor(alphabet: Set<any>, content?: Set<Array<any>>) {
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

export function Concatenation(firstLang: FormalLanguage, secondLang: FormalLanguage) {
    if (!Compatible(firstLang, secondLang)) {
        throw new Error("Arguments do not have compatible alphabets.");
    }

    const alph = firstLang.alphabet,
        content = Product(firstLang.content, secondLang.content, Array.concat);
    return new FormalLanguage(alph, content);
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
