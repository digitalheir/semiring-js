import {Atom} from "./atom";

export class Bool extends Atom<boolean> {
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