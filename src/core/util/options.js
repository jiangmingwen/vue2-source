import { hasOwn } from "../../shared/util"
import config from '../config'

const strats = config.optionMergeStrategies


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

const defaultStrat = function (parentVal, childVal) {
    return childVal === undefined
      ? parentVal
      : childVal
  }
  

export function mergeOptions(parent,child,vm) {
    if(typeof child === 'function') {
        child = child.options
    }

    const options = {}
    let key
    for(key in parent){
        mergeField(key)
    }

    for(key in child) {
        if(!hasOwn(parent,key)) {
            mergeField(key)
        }
    }

    function mergeField(key) {
        const strat = strats[key] || defaultStrat
        options[key] = strat(parent[key],child[key])
    }

    return options
}