import {
    LogSemiring,
    makeDeferrable,
    BooleanSemiring,
    StringSemiringGenerator,
    fromProbabilityToMinusLog as fromProbability,
    toProbabilityFromMinusLog as toProbability,
    Atom,
    Bool, Num, FloatingPointSemiring, TropicalSemiring, Semiring
} from "../src/index";
import {expect} from "chai";
import {FormalLanguage} from "../src/semirings/string";

const BooleanExpressionSemiring = makeDeferrable(BooleanSemiring);


describe("FloatingPointSemiring", () => {
    it('should calculate values', () => {
        expect(
            FloatingPointSemiring.times(2, 3)
        ).to.equal(6);
    });
    it('should calculate values - deferred', () => {
        let changeMe = new Num(5);
        const times = makeDeferrable(FloatingPointSemiring).times(
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


describe('TropicalSemiring', () => {
    
    it('should calculate probabilties', () => {
        expect(TropicalSemiring.multiplicativeIdentity).to.equal(0.0);
        expect(TropicalSemiring.additiveIdentity).to.equal(Infinity);
        
        expect(TropicalSemiring.times(
            0.3,
            0.5
        )).to.equal(0.3 + 0.5);
        expect(TropicalSemiring.times(
            Infinity,
            0.5
        )).to.equal(Infinity);
        expect(TropicalSemiring.times(
            0,
            0.5
        )).to.equal(0.5);

        expect(TropicalSemiring.plus(
            0.3,
            0.5
        )).to.equal(0.3);
        
        expect(TropicalSemiring.plus(
            0.3,
            Infinity
        )).to.equal(0.3);
        
        expect(TropicalSemiring.plus(
            0.0,
            Infinity
        )).to.equal(0);
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

let alph: Set<string> = new Set(['a', 'b', 'c', 'd', 'e']);
let StringSemiring: Semiring<FormalLanguage> = StringSemiringGenerator(alph);
describe("StringSemiring", () => {
    it("", () => {
        expect(
            .times(true, true);;;
        ).
        to.equal(true);
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
