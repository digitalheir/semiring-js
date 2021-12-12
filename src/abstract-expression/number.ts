import {AtomicValue} from "./atom";
export class Num extends AtomicValue<number> {
    toString(radix?: number): string {
        return `{${this.value.toString(radix)}}`;
    }
}

export default Num;