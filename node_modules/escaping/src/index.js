/**
 * Split string by non escaped char
 * @param {string} str
 * @param {string} splitChar
 * @param {string} escapeChar
 * @return {Array}
 */
export function split(str, splitChar, escapeChar) {
    let res = [];
    let key = '';
    let escaped;
    str = str.split('');
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (!escaped && char === splitChar) {
            res.push(key);
            key = '';
        } else {
            if (!escaped && char === escapeChar) {
                escaped = true;
            } else {
                if (escaped && char !== escapeChar && char !== splitChar) {
                    key += escapeChar;
                }
                key += char;
                escaped = false;
            }
        }
    }
    if (escaped) {
        key += escapeChar;
    }
    res.push(key);
    return res;
}

/**
 * Unescape string
 * @param {string} str
 * @param {string} splitChar
 * @param {string} escapeChar
 * @return {string}
 */
export function unescape(str, splitChar, escapeChar) {
    return split(str, splitChar, escapeChar).join(splitChar);
}

/**
 * Escape string
 * @param {string} str
 * @param {string} splitChar
 * @param {string} escapeChar
 * @return {string}
 */
export function escape(str, splitChar, escapeChar) {
    return str
        .split(escapeChar).join(escapeChar + escapeChar)
        .split(splitChar).join(escapeChar + splitChar);
}