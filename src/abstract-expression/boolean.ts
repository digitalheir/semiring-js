import {TimesExpression, PlusExpression} from "../expression/binary-function";
import {AtomicValue} from "./atom";

export class Disjunction extends PlusExpression<boolean> {
    resolve(): boolean {
        return (this.left.resolve() || this.right.resolve());
    }
}

export class Conjunction extends TimesExpression<boolean> {
    resolve(): boolean {
        return (this.left.resolve() && this.right.resolve());
    }
}

export class Bool extends AtomicValue<boolean> {
    public static TRUE: Bool = new Bool(true);
    public static FALSE: Bool = new Bool(false);

    private constructor(value: boolean) {
        super(value);
    }

    static from(bool: boolean): Bool {
        if (bool)
            return this.TRUE;
        else
            return this.FALSE;
    }
}

export default Bool;