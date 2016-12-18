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

    public abstract resolve(): T;
}

export class WrappedBinaryFunction<T> extends BinaryFunction<T> {
    private f: (x: T, y: T)=>T;

    constructor(left: Expression<T>, right: Expression<T>, f: (x: T, y: T)=>T) {
        super(left, right);
        this.f = f;
    }

    public resolve(): T {
        return this.f(this.left.resolve(), this.right.resolve());
    };
}

export function wrapBinaryFunction<T>(left: Expression<T>, right: Expression<T>, f: (x: T, y: T)=>T): WrappedBinaryFunction<T> {
    return new WrappedBinaryFunction(left, right, f);
}

export abstract class PlusExpression<T> extends BinaryFunction<T> {
}

export abstract class TimesExpression<T> extends BinaryFunction<T> {
}