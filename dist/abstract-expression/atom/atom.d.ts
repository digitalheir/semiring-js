import { Expression } from "../expression";
export declare abstract class Atom<T> implements Expression<T> {
    private _value;
    constructor(value: T);
    value: T;
    resolve(): T;
    toString(): string;
}
