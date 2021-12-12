import {
    AtomicValue,
    Bool,
    BooleanSemiring,
    FloatingPointSemiring,
    fromProbabilityToMinusLog as fromProbability,
    LogSemiring,
    makeDeferrable,
    Num,
    Semiring,
    toProbabilityFromMinusLog as toProbability,
    TropicalSemiring
} from "../src/index";
import {expect} from "chai";
import {createStringSemiring, FormalLanguage} from "../src";

const BooleanExpressionSemiring = makeDeferrable(BooleanSemiring);

describe("FloatingPointSemiring", () => {
    it("should calculate values", () => {
        expect(
            FloatingPointSemiring.times(2, 3)
        ).to.equal(6);
    });
    it("should calculate values - deferred", () => {
        const changeMe = new Num(5);
        const times = makeDeferrable(FloatingPointSemiring).times(
            changeMe,
            new Num(30)
        );
        expect(times.resolve()).to.equal(150);
        changeMe.value = changeMe.value * 2;
        expect(times.resolve()).to.equal(300);
    });
});

describe("LogSemiring", () => {
    it("should calculate probabilties", () => {
        const lvalue = LogSemiring.times(
            fromProbability(0.3),
            fromProbability(0.5)
        );
        expect(toProbability(lvalue)).to.equal(0.15);

        const x = fromProbability(0.3);
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

        const changeMe = new AtomicValue(fromProbability(0.3));
        const lvalue3 = deferrableLogSemiring.plus(
            changeMe,
            new AtomicValue(fromProbability(0.5))
        );

        expect(toProbability(lvalue3.resolve())).to.be.above(0.799999999).and.below(0.800001);
        changeMe.value = fromProbability(toProbability(changeMe.value) / 2);
        expect(toProbability(lvalue3.resolve())).to.be.above(0.649999999).and.below(0.65000001);
    });
});

describe("TropicalSemiring", () => {

    it("should calculate probabilties", () => {
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

describe("BooleanSemiring", () => {
    it("should calculate correctly - ast", () => {
        expect(BooleanSemiring.times(true, true)).to.equal(true);
    });

    it("should calculate expressions correctly", () => {
        expect(BooleanExpressionSemiring.times(Bool.TRUE, Bool.TRUE)
            .resolve()
            .valueOf())
            .to.equal(true);

        expect(BooleanExpressionSemiring.plus(Bool.TRUE, Bool.FALSE)
            .resolve()
            .valueOf())
            .to.equal(true);

        expect(BooleanExpressionSemiring.times(Bool.TRUE, Bool.FALSE)
            .resolve()
            .valueOf())
            .to.equal(false);

        expect(BooleanExpressionSemiring.plus(Bool.FALSE, Bool.FALSE)
            .resolve()
            .valueOf())
            .to.equal(false);
    });
});

describe("StringSemiring", () => {
    const alphabet: Set<string> = new Set<string>(["a", "b", "c", "d", "e"]);
    const StringSemiring: Semiring<FormalLanguage<string>> = createStringSemiring(alphabet);
    const testLanguage1 = {alphabet, content: new Set<string>(["ab"])};
    const testLanguage2 = {alphabet, content: new Set<string[]>([["c", "d"]])};

    it("should calculate product of languages correctly with the mult. unit", () => {
        const result = StringSemiring.times(testLanguage1, StringSemiring.multiplicativeIdentity);
        expect(result.alphabet.size).to.equal(5);
        expect(result.alphabet.has("d")).to.equal(true);
        expect(result.content.size).to.equal(0);
    });
    it("should calculate addition of languages correctly with the additive. unit", () => {
        const result = StringSemiring.plus(testLanguage1, StringSemiring.additiveIdentity);
        expect(result).to.deep.equal(testLanguage1);
    });

    it("should calculate product of languages correctly", () => {
        const result = StringSemiring.times(testLanguage1, testLanguage2);
        // const wantedResult = {alphabet: testLanguage1.alphabet, content: new Set<string>(["abcd", "cdab"])};
        expect(result.content.size).to.equal(1);
        expect(result.content.has("abcd")).to.be.true;
    });

    it("should calculate addition of languages correctly", () => {
        const result = StringSemiring.plus(testLanguage1, testLanguage2);
        // const wantedResult = {alphabet: testLanguage1.alphabet, content: new Set<string>(["ab", "cd"])};
        expect(result.content.size).to.equal(2);
        testLanguage1.content.forEach(s =>
            expect(result.content.has(s)).to.be.true
        );
        testLanguage2.content.forEach(s =>
            expect(result.content.has(s)).to.be.true
        );
    });
});

