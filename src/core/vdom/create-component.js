import { isUndef } from "../util/index"

export function createComponent(Ctor, data, context, children, tag){
    console.log(Ctor,'createComponent')
    if(isUndef(Ctor)){
        return
    }

    const baseCtor = context.$options._base
    console.log(baseCtor,'baseCtor')
}