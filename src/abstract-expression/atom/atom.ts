import {Expression} from "../expression";
export abstract class Atom<T> implements Expression<T> {
    private _value: T;

    constructor(value: T) {
        this._value = value;
    }

    set value(value: T) {
        this._value = value;
    }

    get value() {
        return this._value;
    }

    resolve(): T {
        return this.value;
    }

    toString() {
        return "{" + this._value.toString() + "}";
    }
}