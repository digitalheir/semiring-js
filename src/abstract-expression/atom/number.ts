import {Atom} from "./atom";

export class Num extends Atom<number> {
    toString(radix?: number): string {
        return "{" + this.value.toString(radix) + "}";
    }
}

export default Num;