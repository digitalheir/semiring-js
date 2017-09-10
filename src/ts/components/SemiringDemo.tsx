import * as React from "react";
import {Semiring, FloatingPointSemiring, LogSemiring, TropicalSemiring, BooleanSemiring} from "semiring";
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
};

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
            <SemiringComponent semiring={this.state.selectedSemiring}/>
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
        default:
            throw new Error("Unknown semiring: " + selected);
    }
}

function renderResult<T>(o: "plus" | "times", rig: Semiring<T>, plusLeft: T, plusRight: T, timesLeft: T, timesRight: T): string {
    let res;
    if (o === "plus") {
        res = (rig.plus(plusLeft, plusRight));
    } else {
        res = (rig.times(timesLeft, timesRight));
    }
    if (res as any === Infinity) return "Infinity";
    else return JSON.stringify(res);
}

export class SemiringComponent<T> extends PureComponent<SemiringProps, SemiringState<T>> {
    constructor({semiring}: SemiringProps) {
        super();
        const rig: Semiring<any> = getSemiring(semiring);
        this.state = {
            plusLeft: rig.multiplicativeIdentity,
            plusRight: rig.additiveIdentity,
            timesLeft: rig.multiplicativeIdentity,
            timesRight: rig.additiveIdentity,
        };
    }

    setInitialCalculations() {
        const rig = getSemiring(this.props.semiring);
        const s: any = {};
        LEFT_RIGHT.forEach(lr => {
            const valueToSet = (lr === "Left" ? rig.multiplicativeIdentity : rig.additiveIdentity);
            const valueString = valueToSet.toString();
            PLUS_TIMES.forEach(pt => {
                const id = `${pt}${lr}`;
                const p = document.getElementById(id) as HTMLInputElement;
                // console.log(id);
                // console.log(valueToSet);
                s[id] = valueToSet;
                if (p) p.value = valueString;
            });
        });
        this.setState(s);
    }

    componentDidUpdate(prevProps: SemiringProps, prevState: SemiringState<T>) {
        console.log(this.props.semiring !== prevProps.semiring);
        if (this.props.semiring !== prevProps.semiring) this.setInitialCalculations();
    }

    componentDidMount() {
        this.setInitialCalculations();
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
    }

    render() {
        const rig = getSemiring(this.props.semiring) as any as Semiring<T>;
        const plusRight = this.state.plusRight;
        const plusLeft = this.state.plusLeft;
        const timesRight = this.state.timesRight;
        const timesLeft = this.state.timesLeft;
        console.log(`${plusLeft} ⊕ ${plusRight} = ${rig.plus(plusLeft, plusRight)}`);
        console.log(`${timesLeft} ⊗ ${timesRight} = ${rig.times(timesLeft, timesRight)}`);

        return <div className="semiring-equations">
            {
                PLUS_TIMES.map((o: "plus" | "times") =>
                    <div className="semiring-equation">
                        <div className="mdc-form-field mdc-form-field--align-end">
                            <div className="mdc-textfield">
                                <input id={`${o}Left`}
                                       onChange={(e) => this.changeState(`${o}Left`, e.target.value)}
                                       type="text" className="mdc-textfield__input equation-field"/>
                            </div>
                        </div>
                        <span className="operator">{o === "plus" ? "⊕" : "⊗"}</span>
                        <div className="mdc-form-field mdc-form-field--align-end">
                            <div className="mdc-textfield">
                                <input id={`${o}Right`}
                                       onChange={(e) => this.changeState(`${o}Right`, e.target.value)}
                                       type="text" className="mdc-textfield__input equation-field"/>
                            </div>
                        </div>
                        = {renderResult(o, rig, plusLeft, plusRight, timesLeft, timesRight)
                    }
                    </div>
                )
            }
        </div>;
    }
}
