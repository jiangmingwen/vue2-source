import { hasOwn } from "../../shared/util"

/**
 * 
 * @param {*} options $options
 * @param {*} type components
 * @param {*} id 自定义组件名称
 * @param {*} warnMissing 
 * @returns 
 */
export function resolveAsset(options,type,id,warnMissing){
    if(typeof id !== 'string'){
        return
    }
    const assets = options[type]
    if(hasOwn(assets,id)){
        return assets[id]
    }

    //todo  注册 jay-com 用 jayCom也行

}