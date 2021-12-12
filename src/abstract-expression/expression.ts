/**
 * Represents an expression tree which can be resolved to a value
 */
export interface Expression<T> {
    resolve(): T;
}

// export class Identifity<T> implements Expression<T> {
//     readonly x: T;
//
//     constructor(x: T) {
//         this.x = x;
//     }
//
//     resolve(): T {
//         return this.x;
//     }
// }