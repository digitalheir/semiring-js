import * as React from "react";
import {
    Semiring,
    FloatingPointSemiring,
    createStringSemiring,
    LogSemiring,
    TropicalSemiring, BooleanSemiring, Bool
} from "semiring";
import {PureComponent, StatelessComponent} from "react";

export interface TexState {
    selectedSemiring: keyof typeof supportedSemirings;
}

export interface TexProps {
}

const supportedSemirings = {
    "Probability": true,
    "Log": true,
    "Tropical": true,
    "Boolean": true,
    "String": true,
};

function getSemiringComponent(s: keyof typeof supportedSemirings) {
    switch (s) {
        case "Probability":
            return <ProbabilitySemiringComponent/>;
        case "Log":
            return <LogSemiringComponent/>;
        case "Tropical":
            return <TropicalSemiringComponent/>;
        case "Boolean":
            return <BooleanSemiringComponent/>;
        case "String":
        // return <StringSemiringComponent/>;
    }
    return <SemiringComponent semiring={s}/>;
}

export class SemiringDemo extends React.PureComponent<TexProps, TexState> {
    constructor() {
        super();
        this.state = {
            selectedSemiring: "Probability"
        };
    }

    semiringChange(selected: keyof typeof supportedSemirings) {
        this.setState({
            selectedSemiring: selected
        });
    }

    render() {
        return <div className="demo">
            <select name="semirings"
                    className="mdc-select"
                    onChange={(e: any) => this.semiringChange(e.target.value as keyof typeof supportedSemirings)}
            >
                {
                    Object.keys(supportedSemirings)
                        .map((s, i) => <option selected={i === 0} key={s} value={s}>{`${s} semiring`}</option>)
                }</select>
            {getSemiringComponent(this.state.selectedSemiring)}
        </div>;
    }
}

export interface SemiringProps {
    semiring: string;
}

export interface SemiringState<T> {
    plusLeft: T;
    plusRight: T;
    timesLeft: T;
    timesRight: T;
}

const LEFT_RIGHT = ["Left", "Right"];
const PLUS_TIMES = ["plus", "times"];

function getSemiring(selected: string) {
    switch (selected) {
        case "Probability":
            return FloatingPointSemiring;
        case "Log":
            return LogSemiring;
        case "Tropical":
            return TropicalSemiring;
        case "Boolean":
            return BooleanSemiring;
        case "String":
            const alphabet: Set<string> = new Set<string>(["a", "b", "c"]);
            return createStringSemiring(alphabet);
        default:
            throw new Error("Unknown semiring: " + selected);
    }
}

function stringified(res: any) {
    if (res as any === Infinity) return "Infinity";
    else return JSON.stringify(res);
}

function renderResult<T>(o: "plus" | "times", rig: Semiring<T>, plusLeft: T, plusRight: T, timesLeft: T, timesRight: T): string {
    let res;
    if (o === "plus") {
        res = (rig.plus(plusLeft, plusRight));
    } else {
        res = (rig.times(timesLeft, timesRight));
    }
    return stringified(res);
}

function renderEquations<T>(rig: Semiring<T>, plusLeft: T, plusRight: T, timesLeft: T, timesRight: T, changeState: (a: string, b: string) => any) {
    return <div className="semiring-equations">{PLUS_TIMES.map((o: "plus" | "times") =>
        <div key={o} className="semiring-equation">
            <div className="mdc-form-field mdc-form-field--align-end">
                <div className="mdc-textfield">
                    <input id={`${o}Left`}
                           onChange={(e) => changeState(`${o}Left`, e.target.value)}
                           type="text" className="mdc-textfield__input equation-field"/>
                </div>
            </div>
            <span className="operator">{o === "plus" ? "⊕" : "⊗"}</span>
            <div className="mdc-form-field mdc-form-field--align-end">
                <div className="mdc-textfield">
                    <input id={`${o}Right`}
                           onChange={(e) => changeState(`${o}Right`, e.target.value)}
                           type="text" className="mdc-textfield__input equation-field"/>
                </div>
            </div>
            = {renderResult(o, rig, plusLeft, plusRight, timesLeft, timesRight)
        }
        </div>
    )}</div>;
}

function setInitialCalculations(rig: Semiring<any>) {
    const s: any = {};
    LEFT_RIGHT.forEach(lr => {
        const valueToSet = (lr === "Left" ? rig.multiplicativeIdentity : rig.additiveIdentity);
        const valueString = stringified(valueToSet);
        PLUS_TIMES.forEach(pt => {
            const id = `${pt}${lr}`;
            const p = document.getElementById(id) as HTMLInputElement;
            // console.log(id);
            // console.log(valueToSet);
            s[id] = valueToSet;
            if (p) p.value = valueString;
        });
    });
    return (s);
}


export class SemiringComponent<T> extends PureComponent<SemiringProps, SemiringState<T>> {
    constructor({semiring}: SemiringProps) {
        super();
        const rig: Semiring<any> = getSemiring(semiring);
        this.state = initState(rig);
    }

    componentDidUpdate(prevProps: SemiringProps, prevState: SemiringState<T>) {
        console.log(this.props.semiring !== prevProps.semiring);
        if (this.props.semiring !== prevProps.semiring) this.setState(setInitialCalculations(getSemiring(this.props.semiring)));
    }

    componentDidMount() {
        this.setState(setInitialCalculations(getSemiring(this.props.semiring)));
    }

    changeState(k: string, value: string) {
        const selected = this.props.semiring;
        if ((   selected) === "Probability"
            || (selected) === "Log"
            || (selected) === "Tropical") {
            try {
                const number: T = (parseFloat(value) as any);
                switch (k) {
                    case "plusLeft":
                        this.setState({plusLeft: number});
                        break;
                    case "plusRight":
                        this.setState({plusRight: number});
                        break;
                    case "timesLeft":
                        this.setState({timesLeft: number});
                        break;
                    case "timesRight":
                        this.setState({timesRight: number});
                        break;
                }
            } catch (e) {
                console.error(e);
            }
        }
        if (selected === "Boolean") {
            const number: T = (value.trim().toLowerCase() === "true" ? true : false as any);
            switch (k) {
                case "plusLeft":
                    this.setState({plusLeft: number});
                    break;
                case "plusRight":
                    this.setState({plusRight: number});
                    break;
                case "timesLeft":
                    this.setState({timesLeft: number});
                    break;
                case "timesRight":
                    this.setState({timesRight: number});
                    break;
            }
        }
        if (selected === "String") {
            let number: T = {} as any;
            try {
                number = JSON.parse(value);
            } catch (e) {
                console.error("Can't parse " + value);
            }
            switch (k) {
                case "plusLeft":
                    this.setState({plusLeft: number});
                    break;
                case "plusRight":
                    this.setState({plusRight: number});
                    break;
                case "timesLeft":
                    this.setState({timesLeft: number});
                    break;
                case "timesRight":
                    this.setState({timesRight: number});
                    break;
            }
        }
    }

    render() {
        try {
            const rig = getSemiring(this.props.semiring) as any as Semiring<T>;
            const plusRight = this.state.plusRight;
            const plusLeft = this.state.plusLeft;
            const timesRight = this.state.timesRight;
            const timesLeft = this.state.timesLeft;
            console.log(`${plusLeft} ⊕ ${plusRight} = ${rig.plus(plusLeft, plusRight)}`);
            console.log(`${timesLeft} ⊗ ${timesRight} = ${rig.times(timesLeft, timesRight)}`);

            return <div>
                {this.props.semiring === "String"
                    ? <p>A semiring of formal languages. Used in automaton theory. (<a
                        href="http://www.openfst.org/twiki/pub/FST/FstHltTutorial/tutorial_part1.pdf">An unweighted
                        functional transducer can be seen as as a weighted automaton over the string semiring.</a>)</p>
                    : ""}
                {renderEquations(rig, plusLeft, plusRight, timesLeft, timesRight, (k: string, value: string) => this.changeState(k, value))}
            </div>;
        } catch (e) {
            return <div className="error">
                {e.message}
            </div>;
        }
    }
}

function newState<T>(k: keyof SemiringState<T>, number: T): Pick<SemiringState<T>, keyof SemiringState<T>> {
    const s: any = {};
    s[k] = number;
    return s as Pick<SemiringState<T>, keyof SemiringState<T>>;
}

export class ProbabilitySemiringComponent extends PureComponent<{}, SemiringState<number>> {
    readonly rig: Semiring<number> = FloatingPointSemiring;

    constructor() {
        super();
        this.state = initState(this.rig);
    }

    changeState(k: string, value: string) {
        try {
            this.setState(newState(k as keyof SemiringState<number>, (parseFloat(value))));
        } catch (e) {
            console.error(e);
        }
    }


    componentDidMount() {
        this.setState(setInitialCalculations(this.rig));
    }

    render() {
        try {
            return <div>
                <p>This semiring implements the common notion of calculating probabilties through addition and
                    multiplication.</p>
                {renderEquations(FloatingPointSemiring, this.state.plusLeft, this.state.plusRight, this.state.timesLeft, this.state.timesRight, (k: string, value: string) => this.changeState(k, value))}
            </div>;
        } catch (e) {
            return <div className="error">
                {e.message}
            </div>;
        }
    }
}

export class LogSemiringComponent extends PureComponent<{}, SemiringState<number>> {
    readonly rig: Semiring<number> = LogSemiring;

    constructor() {
        super();
        this.state = initState(this.rig);
    }

    changeState(k: string, value: string) {
        try {
            this.setState(newState(k as keyof SemiringState<number>, (parseFloat(value))));
        } catch (e) {
            console.error(e);
        }
    }


    componentDidMount() {
        this.setState(setInitialCalculations(this.rig));
    }

    render() {
        try {
            return <div>
                <p>A semiring usually used for multiplying numbers close to zero, to avoid arithmetic underflow.</p>
                {renderEquations(this.rig, this.state.plusLeft, this.state.plusRight, this.state.timesLeft, this.state.timesRight, (k: string, value: string) => this.changeState(k, value))}
            </div>;
        } catch (e) {
            return <div className="error">
                {e.message}
            </div>;
        }
    }
}

export class TropicalSemiringComponent extends PureComponent<{}, SemiringState<number>> {
    readonly rig: Semiring<number> = LogSemiring;

    constructor() {
        super();
        this.state = {
            plusLeft: this.rig.multiplicativeIdentity,
            plusRight: this.rig.additiveIdentity,
            timesLeft: this.rig.multiplicativeIdentity,
            timesRight: this.rig.additiveIdentity,
        };
    }

    changeState(k: string, value: string) {
        try {
            this.setState(newState(k as keyof SemiringState<number>, (parseFloat(value))));
        } catch (e) {
            console.error(e);
        }
    }


    componentDidMount() {
        this.setState(setInitialCalculations(this.rig));
    }

    render() {
        try {
            return <div>
                <p>A semiring that describes <a href="https://en.wikipedia.org/wiki/Tropical_geometry">Tropical
                    geometry</a>. An interesting application of this semiring was made by <a
                    href="https://www.theguardian.com/science/video/2013/jul/12/geometry-banking-crisis-video">Paul
                    Klemperer for use in auctions during the financial crisis</a>.</p>
                {renderEquations(this.rig, this.state.plusLeft, this.state.plusRight, this.state.timesLeft, this.state.timesRight, (k: string, value: string) => this.changeState(k, value))}
            </div>;
        } catch (e) {
            return <div className="error">
                {e.message}
            </div>;
        }
    }
}

export class StringSemiringComponent extends PureComponent<{}, SemiringState<number>> {
    readonly rig: Semiring<number> = LogSemiring;

    constructor() {
        super();
        this.state = {
            plusLeft: this.rig.multiplicativeIdentity,
            plusRight: this.rig.additiveIdentity,
            timesLeft: this.rig.multiplicativeIdentity,
            timesRight: this.rig.additiveIdentity,
        };
    }

    changeState(k: string, value: string) {
        try {
            this.setState(newState(k as keyof SemiringState<number>, (parseFloat(value))));
        } catch (e) {
            console.error(e);
        }
    }


    componentDidMount() {
        this.setState(setInitialCalculations(this.rig));
    }

    render() {
        try {
            return <div>
                <p>A semiring that describes <a href="https://en.wikipedia.org/wiki/Tropical_geometry">Tropical
                    geometry</a>. An interesting application of this semiring was made by <a
                    href="https://www.theguardian.com/science/video/2013/jul/12/geometry-banking-crisis-video">Paul
                    Klemperer for use in auctions during the financial crisis</a>.</p>
                {renderEquations(this.rig, this.state.plusLeft, this.state.plusRight, this.state.timesLeft, this.state.timesRight, (k: string, value: string) => this.changeState(k, value))}
            </div>;
        } catch (e) {
            return <div className="error">
                {e.message}
            </div>;
        }
    }
}


function initState<T>(rig: Semiring<T>) {
    return {
        plusLeft: rig.multiplicativeIdentity,
        plusRight: rig.additiveIdentity,
        timesLeft: rig.multiplicativeIdentity,
        timesRight: rig.additiveIdentity,
    };
}

export class BooleanSemiringComponent extends PureComponent<{}, SemiringState<boolean>> {
    readonly rig: Semiring<boolean> = BooleanSemiring;

    constructor() {
        super();
        this.state = initState(this.rig);
    }

    changeState(k: string, value: string) {
        try {
            const val = (value.trim().toLowerCase() === "true");
            this.setState(newState(k as keyof SemiringState<boolean>, val));
        } catch (e) {
            console.error(e);
        }
    }


    componentDidMount() {
        this.setState(setInitialCalculations(this.rig));
    }

    render() {
        try {
            return <div>
                <p>A semiring that represents Boolean logic: AND, OR, TRUE and FALSE.</p>
                {renderEquations(this.rig, this.state.plusLeft, this.state.plusRight, this.state.timesLeft, this.state.timesRight, (k: string, value: string) => this.changeState(k, value))}
            </div>;
        } catch (e) {
            return <div className="error">
                {e.message}
            </div>;
        }
    }
}

// // TODO
// export class StringSemiringComponent extends PureComponent<{}, SemiringState<boolean>> {
//     readonly rig: Semiring<boolean> = BooleanSemiring;
//
//     constructor() {
//         super();
//         this.state = initState(this.rig);
//     }
//
//     changeState(k: string, value: string) {
//         try {
//             const val = (value.trim().toLowerCase() === "true");
//             this.setState(newState(k as keyof SemiringState<boolean>, val));
//         } catch (e) {
//             console.error(e);
//         }
//     }
//
//
//     componentDidMount() {
//         this.setState(setInitialCalculations(this.rig));
//     }
//
//     render() {
//         try {
//             return <div>
//                 <p>A semiring that represents Boolean logic: AND, OR, TRUE and FALSE.</p>
//                 {renderEquations(this.rig, this.state.plusLeft, this.state.plusRight, this.state.timesLeft, this.state.timesRight, (k: string, value: string) => this.changeState(k, value))}
//             </div>;
//         } catch (e) {
//             return <div className="error">
//                 {e.message}
//             </div>;
//         }
//     }
// }
