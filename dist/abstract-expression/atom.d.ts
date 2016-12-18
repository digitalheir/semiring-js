import { Expression } from "./expression";
export declare class Atom<T> implements Expression<T> {
    private _value;
    constructor(value: T);
    value: T;
    resolve(): T;
    toString(radix?: number): string;
}
