export function dateTimeReviver (key, value) {
    if (typeof value === 'string') {
        const a = /^__Date\((.+)\)$/.exec(value);
        if (a) {
            return new Date(a[1]);
        }
    }
    return value;
  }
  
export function dateTimeReplacer(key, val) {
    if (key === 'date') {
        return `__Date(${val})`;
    } else {
        return val;
    }
}