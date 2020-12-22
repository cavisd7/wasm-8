//https://stackoverflow.com/questions/48728515/deep-compare-javascript-function
export function deepCompare (curr, next) {
    if (typeof curr == 'object' && typeof next == 'object') {
        if (Object.keys(curr).length != Object.keys(next).length) {
            return false;
        };

        for (let key in curr) {
            if (!deepCompare(curr[key], next[key])) {
                return false;
            };
        };

        return true;
    } else {
        return curr === next;
    };
};