import { Expression } from "../abstract-expression/expression";
export declare abstract class BinaryFunction<T> implements Expression<T> {
    left: Expression<T>;
    right: Expression<T>;
    constructor(left: Expression<T>, right: Expression<T>);
    setLeft(left: Expression<T>): void;
    setRight(left: Expression<T>): void;
    abstract resolve(): T;
}
export declare abstract class PlusExpression<T> extends BinaryFunction<T> {
}
export declare abstract class TimesExpression<T> extends BinaryFunction<T> {
}
