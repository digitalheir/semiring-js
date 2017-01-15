import {Set, EmptySet, Contains, Intersection, Product, Equals} from "../set";
import {Semiring} from "../index";

export class FormalLanguage {
    readonly alphabet: Set;
    readonly content: Set;

    constructor (alphabet: Set, ?content: Set) {
	this.alphabet = alphabet;
	this.content = content || EmptySet;
    };
}

export function StringSemiring(S: Set) {
    var stringSemiring: Semiring<FormalLanguage>{
	additiveIdentity: new FormalLanguage(S),
	multiplicativIdentity: new FormalLanguage(S, new Set(EmptySet)),
	plus: LanguageUnion,
	times: Concatenation 
    }	
}

export function Concatenation(FirstLang: FormalLanguage, secondLang: FormalLanguage) {
    if (!Compatible(firstLang, secondLang)){
        throw new Error("Arguments do not have compatible alphabets.")	
    }

    var alph = firstLang.alphabet,
	content = Product(firstLang, secondLang, Concat);
    return new FormalLanguage(alph, content);
}

export function LanguageUnion(FirstLang: FormalLanguage, secondLang: FormalLanguage) {
    if (!Compatible(firstLang, secondLang)){
        throw new Error("Arguments do not have compatible alphabets.")	
    }

    return new FormalLanguage(firstlang.alphabet, Union(firstLang.content, secondLang.content));  
}

export function Compatible(FirstLang: FormalLanguage, secondLang: FormalLanguage){
    return Equals(firstLang.alphabet, secondLang.alphabet); 
}
