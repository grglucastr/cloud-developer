// Super Simple Unit Functions

export const add = (a: number, b: number) => {
    return a + b;
    }

export const divide = (a: number, b: number) => {
    if(b === 0) { throw new Error('div by 0') }

    return a / b;
    }

export const concatenate = (str1: string, str2: string) => {
    if(str1.length === 0){
        throw new Error('empty strings not allowed');
    }
    return str1.concat(str2);
}