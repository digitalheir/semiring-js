import {TimesExpression, PlusExpression} from "../expression/binary-function";

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