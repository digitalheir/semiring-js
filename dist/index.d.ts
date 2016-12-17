export declare enum Property {
    RightSemiring = 0,
    LeftSemiring = 1,
    Idempotent = 2,
    Commutative = 3,
    Path = 4,
}
export declare abstract class Semiring<Val> {
    private properties;
    abstract MultiplicativeIdentity: Val;
    abstract AdditiveIdentity: Val;
    constructor(properties: Property[] | {
        [prop: string]: boolean;
    });
    getProperties(): {
        [prop: string]: boolean;
    };
    hasProperty(prop: Property): boolean;
    abstract plus(x: Val, y: Val): Val;
    abstract times(x: Val, y: Val): Val;
}
export default Semiring;
