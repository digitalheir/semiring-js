import {Atom} from "./atom";

export class NumberLeaf extends Atom<number> {
    toString(radix?: number): string {
        return "{"+this.value.toString(radix)+"}";
    }
}

export default NumberLeaf;