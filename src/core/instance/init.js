import { initRender } from "./render"
import {initLifecycle} from './lifecycle'
import { initProxy } from "./proxy"
import { mergeOptions } from "../util/index"

export function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        const vm = this
        if(options && options._isComponent) {
            //初始化内部组件
            initInteralComponent(vm,options)
        }else {
            vm.$options = mergeOptions(
                resolveConstructorOptions(vm.constructor),
                options||{},
                vm
            )
        }
        vm._self = this

        initProxy(vm) //挂载_renderProxy
        initLifecycle(vm)
        initRender(vm) // 挂载 $createElement

        if(vm.$options.el){
            console.log(vm.$options.el)
            vm.$mount(vm.$options.el)
        }
    }
}


export function resolveConstructorOptions (Ctor){
    let options = Ctor.options 

    return options
}

//初始化组件内部的一些属性，因为这里做会比动态合并更快
export function initInteralComponent(vm,options){
  const opts = vm.$options = Object.create(vm.constructor.options)
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}