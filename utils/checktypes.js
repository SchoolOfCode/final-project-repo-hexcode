export function isNumeric(num) {
    //https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
    // isNaN(num)         // returns true if the variable does NOT contain a valid number
    // Examples
    // isNaN(123)         // false
    // isNaN('123')       // false
    // isNaN('1e10000')   // false (This translates to Infinity, which is a number)
    // isNaN('foo')       // true
    // isNaN('10px')      // true
    // isNaN('')          // false
    // isNaN(' ')         // false
    // isNaN(false)       // false
    return !isNaN(num);
}
export function isNotNumeric(num) {
    return isNaN(num);
}
