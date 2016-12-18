/**
 * Semiring defined on objects of type T.
 *
 * A semiring is specified by two binary operations ⊕ and ⊗ and two designated elements ZERO and ONE with the following properties:
 *
 * - ⊕: associative, commutative, and has 0 as its identity.
 * - ⊗: associative and has identity 1, distributes w.r.t. ⊕, and has 0 as an annihilator: 0 ⊗ a = a ⊗ 0 = 0.
 *
 * A semiring can have algebraic properties (commutative, idempotent, etc). These need to be passed explicitly and are
 * not checked for validity. So take care if you rely on these properties.
 *
 */
export interface Semiring<T> {
    //properties: {[prop: string]: boolean};
    /**
     * Also known as 'one', because 'one' ⊗ x = x
     */
    multiplicativeIdentity: T;
    /**
     * Also known as 'zero', because 'zero' ⊕ x = x
     */
    additiveIdentity: T;

    /**
     * ⊕
     */
    plus: (x: T, y: T) => T;

    /**
     * ⊗
     */
    times: (x: T, y: T) => T;

    // /**
    //  *
    //  * @param properties
    //  */
    // constructor(properties: Property[]|{[prop: string]: boolean}) {
    //     if (isPropArray(properties)) {
    //         this.properties = {};
    //         for (let prop of properties) {
    //             let property: string = Property[prop];
    //             this.properties[property] = true;
    //         }
    //     } else
    //         this.properties = properties;
    // }
    //
    // /**
    //  *
    //  * @returns properties dictionary
    //  */
    // public getProperties(): {[prop: string]: boolean} {
    //     return this.properties;
    // };
    //
    // /**
    //  *
    //  * @param prop
    //  * @returns {boolean} Whether this semiring has given property
    //  */
    // public hasProperty(prop: Property): boolean {
    //     const propertyName: string = Property[prop];
    //     let notHasProperty = !this.properties[propertyName];
    //     return !notHasProperty;
    // };
}

export default Semiring;

export enum Property {
    /**
     * If times right-distributes wrt plus
     */
    RightSemiring,
        /**
         * If times left-distributes wrt plus
         */
    LeftSemiring,
        /**
         * An idempotent semiring is one whose addition is idempotent: a + a = a, for all a
         */
    Idempotent,
        /**
         * A commutative semiring is one whose multiplication is commutative.
         */
    Commutative,
        /**
         * ∀ a, b: a ⊕ b = a or a ⊕ b = b
         */
    Path
}
