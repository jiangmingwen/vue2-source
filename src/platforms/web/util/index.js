export function query(el){
    if(typeof el  === 'string'){
        const selected = document.querySelector(el)
        if(!selected){
            return document.createElement('div')
        }
        return selected
    }else {
        return el
    }
}


export const namespaceMap = {
    svg: 'http://www.w3.org/2000/svg',
    math: 'http://www.w3.org/1998/Math/MathML'
}