import {ADD}  from "./floating-point";
import {Semiring} from "../index";

/**
 * A tropical semiring defined with `min` as semiring addition
 */
export const TropicalSemiring: Semiring<number> = {
    additiveIdentity: Infinity,
    multiplicativeIdentity: 0.0,

    plus: (x: number, y: number) => {
        return Math.min(x, y);
    },
    times: ADD
};

export default TropicalSemiring;
