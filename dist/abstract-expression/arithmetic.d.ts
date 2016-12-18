import { PlusExpression, TimesExpression } from "../expression/binary-function";
export declare class Multiplication extends TimesExpression<number> {
    resolve(): number;
}
export declare class Addition extends PlusExpression<number> {
    resolve(): number;
}
