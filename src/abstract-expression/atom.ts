import {Expression} from "./expression";

function isNumber(x: any): x is number {
    return typeof x === "number";
}

export class AtomicValue<T> implements Expression<T> {
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

    toString(radix?: number) {
        let str = this._value.toString();
        if (radix && isNumber(this._value)) str = this._value.toString(radix);

        return `{${str}}`;
    }
}