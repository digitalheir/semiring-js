import { Atom } from "./atom";
export declare class Bool extends Atom<boolean> {
    static TRUE: Bool;
    static FALSE: Bool;
    private constructor(value);
    static from(bool: boolean): Bool;
}
export default Bool;
