import { initRender } from "./render"
import {initLifecycle} from './lifecycle'
import { initProxy } from "./proxy"

export function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        const vm = this
        vm.$options = options
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