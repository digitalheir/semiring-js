import { Semiring } from "../semiring";
export declare const LogSemiring: Semiring<number>;
export declare function fromProbability(x: number): number;
export declare function toProbability(x: number): number;
export default LogSemiring;
