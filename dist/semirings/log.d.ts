import { Semiring } from "../index";
export default class LogSemiring extends Semiring<number> {
    AdditiveIdentity: number;
    MultiplicativeIdentity: number;
    constructor();
    plus(x: number, y: number): number;
    times(x: number, y: number): number;
    static fromProbability(x: number): number;
    static toProbability(x: number): number;
}
