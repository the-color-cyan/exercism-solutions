export function find(haystack: number[], needle: number): number | never {
    let length = haystack.length;
    let begindex = 0;
    let endex = (length > 1 ? length : 1) - 1;

    while (begindex != endex) {
        const middex = begindex + Math.ceil((endex - begindex) / 2);

        if (haystack[middex] > needle) {
            endex = middex - 1;
        } else {
            begindex = middex;
        }
    }

    if (haystack[begindex] === needle) {
        return begindex;
    }

    throw new Error("Value not in array");
}
