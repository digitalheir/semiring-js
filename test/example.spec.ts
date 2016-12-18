import {LogSemiring, toProbability, fromProbability} from "../src/semirings/log";

//import * as Mocha from 'mocha'
import {expect} from 'chai';
import {Bool} from "../src/abstract-expression/atom/boolean";
import {BooleanSemiring, BooleanExpressionSemiring} from "../src/semirings/boolean";
import {FloatingPointSemiring, FloatingPointTreeSemiring} from "../src/semirings/floating-point";
import {Num} from "../src/abstract-expression/atom/number";
import {makeDeferrable} from "../src/index";
import {Atom} from "../src/abstract-expression/atom/atom";



describe('FloatingPointSemiring', () => {
    it('should calculate values', () => {
        expect(
            FloatingPointSemiring.times(2, 3)
        ).to.equal(6);
    });
    it('should calculate values - deferred', () => {
        let changeMe = new Num(5);
        const times = FloatingPointTreeSemiring.times(
            changeMe,
            new Num(30)
        );
        expect(times.resolve()).to.equal(150);
        changeMe.value = changeMe.value * 2;
        expect(times.resolve()).to.equal(300);
    });
});
describe('LogSemiring', () => {
    it('should calculate probabilties', () => {
        const lvalue = LogSemiring.times(
            fromProbability(0.3),
            fromProbability(0.5)
        );
        expect(toProbability(lvalue)).to.equal(0.15);

        let x = fromProbability(0.3);
        let xvalue = LogSemiring.times(
            x,
            LogSemiring.multiplicativeIdentity
        );
        expect(xvalue).to.equal(x);

        xvalue = LogSemiring.plus(
            x,
            LogSemiring.additiveIdentity
        );
        expect(xvalue).to.equal(x);


        const lvalue2 = LogSemiring.plus(
            fromProbability(0.3),
            fromProbability(0.5)
        );
        expect(toProbability(lvalue2)).to.be.above(0.799999999).and.below(0.800001);

        const deferrableLogSemiring = makeDeferrable(LogSemiring);

        let changeMe = new Atom(fromProbability(0.3));
        const lvalue3 = deferrableLogSemiring.plus(
            changeMe,
            new Atom(fromProbability(0.5))
        );

        expect(toProbability(lvalue3.resolve())).to.be.above(0.799999999).and.below(0.800001);
        changeMe.value = fromProbability(toProbability(changeMe.value) / 2);
        expect(toProbability(lvalue3.resolve())).to.be.above(0.649999999).and.below(0.65000001);
    });
});

describe('BooleanSemiring', () => {
    it('should calculate correctly - ast', () => {
        expect(
            BooleanSemiring.times(true, true)
        ).to.equal(true);
    });

    it('should calculate expressions correctly', () => {
        expect(
            BooleanExpressionSemiring.times(Bool.TRUE, Bool.TRUE)
                .resolve()
                .valueOf()
        ).to.equal(true);

        expect(
            BooleanExpressionSemiring.plus(Bool.TRUE, Bool.FALSE)
                .resolve()
                .valueOf()
        ).to.equal(true);

        expect(
            BooleanExpressionSemiring.times(Bool.TRUE, Bool.FALSE)
                .resolve()
                .valueOf()
        ).to.equal(false);

        expect(
            BooleanExpressionSemiring.plus(Bool.FALSE, Bool.FALSE)
                .resolve()
                .valueOf()
        ).to.equal(false);


        // console.log(bsr.hasProperty(Property.Idempotent));
        // console.log(bsr.hasProperty(Property.Commutative));
    });
});