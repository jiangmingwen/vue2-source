import { isDef, isPrimitive, isTrue, resolveAsset } from '../util/index'
import { normalizeChildren } from './helper/index'
import VNode from './vnode'
import config from '../config'
import { createComponent } from './create-component'


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
        //如果children不是数组，给他搞成数组，
        //如果是数组，可能是树结构，递归处理children
        children = normalizeChildren(children)
    }else if(normalizationType === SIMPLE_NORMALIZE){

    }

    if(typeof tag === 'string') {
        let Ctor 
        //判断tag是不是一个保留标签，即html的原生标签
        if(config.isReservedTag(tag)){
            vnode = new VNode(
                config.parsePlatformTagName(tag),
                data,
                children,
                undefined,
                undefined,
                context
            )
        }else if(!data && isDef(Ctor = resolveAsset(context.$options,'components',tag)) ){
            //如果没有data，而且是自定义组件
             vnode = createComponent(Ctor, data, context, children, tag)
        }else {
            vnode = new VNode(tag,data,children,undefined,undefined,context)
        }
    }
    return vnode
}