/**
 * Represents an expression tree which can be resolved to a value
 */
export interface Expression<T> {
    resolve(): T;
}

