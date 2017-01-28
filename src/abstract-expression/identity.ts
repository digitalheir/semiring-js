import {Expression} from "./expression";

//noinspection JSUnusedGlobalSymbols
export class Identity<T> implements Expression<T> {
    private expression: Expression<T>;

    constructor(e: Expression<T>) {
        this.expression = e;
    }

    resolve() {
        return this.expression.resolve();
    }
}