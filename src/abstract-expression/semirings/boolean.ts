import {Semiring, Property} from "../../index";
import {PlusExpression, TimesExpression} from "../../expression/binary-function";
import {Expression} from "../expression";
import {Bool} from "../atom/boolean";

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


export class BooleanTreeSemiring extends Semiring<Expression<boolean>> {
    public AdditiveIdentity: Expression<boolean> = Bool.FALSE;
    public MultiplicativeIdentity: Expression<boolean> = Bool.TRUE;

    constructor() {
        super([Property.Idempotent]);
    }


    plus(x: Expression<boolean>, y: Expression<boolean>): Disjunction {
        return new Disjunction(x, y);
    }

    times(x: Expression<boolean>, y: Expression<boolean>): Conjunction {
        return new Conjunction(x, y);
    }

    public and = this.times;
    public or = this.plus;
}

export default BooleanTreeSemiring;