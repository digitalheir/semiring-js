export interface Semiring<T> {
    multiplicativeIdentity: T;
    additiveIdentity: T;
    plus: (x: T, y: T) => T;
    times: (x: T, y: T) => T;
}
export default Semiring;
export declare enum Property {
    RightSemiring = 0,
    LeftSemiring = 1,
    Idempotent = 2,
    Commutative = 3,
    Path = 4,
}
