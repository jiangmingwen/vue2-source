import { isPrimitive, isTrue } from '../util/index'
import { normalizeChildren } from './helper/index'
import VNode from './vnode'

export function createElement(
    context, 
    tag,
    data,
    children,
    normalizationType,
    alwaysNormalize
){
     //处理传进来的数据可以在第二个参数，也可以在第三个参数
    //如果第二个参数是数据，放在children的位置上去
    if(Array.isArray(data) || isPrimitive(data)){
        normalizationType = children
        children = data
        data = undefined
    }

    if(isTrue(alwaysNormalize)){
        normalizationType = ALWAYS_NORMALZIE
    }

   return  _createElement(  context, tag,data,children,normalizationType)
}

const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALZIE = 2

export function _createElement( context, 
    tag,
    data,
    children,
    normalizationType
){

    let vnode
    if(normalizationType === ALWAYS_NORMALZIE){
        children = normalizeChildren(children)

    }else if(normalizationType === SIMPLE_NORMALIZE){

    }

    if(typeof tag === 'string') {
        //todo

        vnode = new VNode(tag,data,children,undefined,undefined,context)
    }

    return vnode
}