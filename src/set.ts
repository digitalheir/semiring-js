export function Contains(firstSet: Set<any>, secondSet: Set<any>) {
    for (const value in firstSet) {
        if (secondSet.has(value)) {
            return true;
        }
    }

    return false;
}

export function Intersect(firstSet: Set<any>, secondSet: Set<any>) {
    const returnSet: Set<any> = new Set();
    firstSet.forEach(function (value) {
        if (secondSet.has(value)) {
            returnSet.add(value);
        }
    });

    return returnSet;
}


export function Union(firstSet: Set<any>, secondSet: Set<any>) {
    const returnSet: Set<any> = new Set();
    firstSet.forEach(function (value) {
        returnSet.add(value);
    });

    secondSet.forEach(function (value) {
        returnSet.add(value);
    });

    return returnSet;
}

export function Equals(firstSet: Set<any>, secondSet: Set<any>) {
    let sizeOfSecondSet: number = secondSet.size;
    firstSet.forEach(function (value) {
        if (!secondSet.has(value)) {
            return false;
        }

        sizeOfSecondSet--;
    });

    return sizeOfSecondSet > 0;
}
export function Product(firstSet: Set<any>, secondSet: Set<any>, combine: (x: any, y: any) => any) {
    const returnSet: Set<any> = new Set();
    firstSet.forEach(function (firstValue) {
        secondSet.forEach(function (secondValue) {
            returnSet.add(combine(firstValue, secondValue));
        });
    });
    return returnSet;
}
