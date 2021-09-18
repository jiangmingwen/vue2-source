import { isUndef,isObject, isDef } from "../util/index"
import VNode from "./vnode"
import { activeInstance } from '../instance/lifecycle'
export function createComponent(Ctor, data, context, children, tag){
    if(isUndef(Ctor)){
        return
    }

    const baseCtor = context.$options._base
    if(isObject(Ctor)){
        Ctor =  baseCtor.extend(Ctor)
    }

    if (typeof Ctor !== 'function') {
        return
    }
    
    
    data = data || {}
    let asyncFactory,propsData = data,listeners = data.on
    //安装组件的钩子函数
    installComponentHooks(data)
    console.log(data,'data')
    const name = Ctor.options.name || tag
    const vnode = new VNode(
      `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
      data, undefined, undefined, undefined, context,
      { Ctor, propsData, listeners, tag, children },
      asyncFactory
    )

    return vnode
}


const componentVNodeHooks = {
    init(vnode,hydrating){
        if(  vnode.componentInstance &&
            !vnode.componentInstance._isDestroyed &&
            vnode.data.keepAlive){

        }else {
            let child = vnode.componentInstance = createComponentInstanceForVnode(vnode,activeInstance)
        }   
        console.log('component vnode init')
    },
    prepatch(){
        console.log('component vnode prepatch')
    },
    insert(){
        console.log('component vnode insert')
    },
    destroy() {
        console.log('component vnode destroy')
    },
}

const hooksToMerge = Object.keys(componentVNodeHooks)

function installComponentHooks(data) {
    console.log(data,'installComponentHooks')
    const hooks = data.hook || (data.hook = {})
    for (let i = 0; i < hooksToMerge.length; i++) {
        const key = hooksToMerge[i]
        const existing = hooks[key]
        const toMerge = componentVNodeHooks[key]
        if (existing !== toMerge && !(existing && existing._merged)) {
            hooks[key] = existing ? mergeHook(toMerge, existing) : toMerge
        }
    }
}

function mergeHook (f1, f2) {
    const merged = (a, b) => {
      f1(a, b)
      f2(a, b)
    }
    merged._merged = true
    return merged
}

//创建组件的实例
export function createComponentInstanceForVnode(vnode,parent){
    const options = {
        _isComponent: true,//是否是组件
        _parentVnode: vnode,
        parent
    }

    const inlineTemplate = vnode.data.inlineTemplate

    if (isDef(inlineTemplate)) {
        options.render = inlineTemplate.render
        options.staticRenderFns = inlineTemplate.staticRenderFns
    }
    //Ctor继承了Vue的，他是Vue的子类，相当于new Vue(options)
    return new vnode.componentOptions.Ctor(options)
}