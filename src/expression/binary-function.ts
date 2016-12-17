import {Expression} from "../abstract-expression/expression";

export abstract class BinaryFunction<T> implements Expression<T> {
    public left: Expression<T>;
    public right: Expression<T>;

    constructor(left: Expression<T>, right: Expression<T>) {
        this.left = left;
        this.right = right;
    }

    public setLeft(left: Expression<T>) {
        this.left = left;
    }

    public setRight(left: Expression<T>) {
        this.left = left;
    }

    public abstract resolve():T;
}

export abstract class PlusExpression<T> extends BinaryFunction<T> {
}

export abstract class TimesExpression<T> extends BinaryFunction<T> {
}