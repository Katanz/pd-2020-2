export function arrayFromLenght(number){
    return Array.from(new Array(number).keys()).map(i => i+1)
}