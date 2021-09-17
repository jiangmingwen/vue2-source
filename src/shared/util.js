export function noop(a,b,c){}

export function isUndef(v){
    return  v=== undefined || v === null 
}


export function isDef(v) {
    return v !== undefined && v !== null
}

export function isTrue(v) {
    return v===true
}

export function isFalse(v) {
    return v=== false
}

export  function isPrimitive(v) {
    return (typeof v === 'string'
        ||
        typeof v === 'number'
        ||
        typeof v === 'symbol'
        ||
        typeof v === 'boolean'
    )
}

//这些方法会被重写
export const no = (a,b,c) => false

export const identity = _ => _

const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

export function cached(fn) {
    const cache = Object.create(null)
    return (function cachedFn (str) {
      const hit = cache[str]
      return hit || (cache[str] = fn(str))
    })
  }

const camelizeRE = /-(\w)/g
/**
 * 转换
 */
export const camelize = cached((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})