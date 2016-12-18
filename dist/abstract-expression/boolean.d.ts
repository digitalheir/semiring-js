import { TimesExpression, PlusExpression } from "../expression/binary-function";
export declare class Disjunction extends PlusExpression<boolean> {
    resolve(): boolean;
}
export declare class Conjunction extends TimesExpression<boolean> {
    resolve(): boolean;
}
