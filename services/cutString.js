
export function cutString(str, countOfChar){
    if (str.length >= countOfChar){
        return str.substring(0, countOfChar) + '...'
    }
    return str
}
