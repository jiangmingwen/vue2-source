import Watcher from "../observer/watcher"
import { noop } from "../util/index"

export let activeInstance = null 

export function setActiveInstance(vm){
    const prevActiveInstance = activeInstance
    activeInstance = vm
    return () => {
        activeInstance = prevActiveInstance
    }
}


export function lifecycleMixin (Vue){
    Vue.prototype._update = function (vnode,hydrating){
        const vm = this
        const prevEl = vm.$el

        const restoreActiveInstance = setActiveInstance(vm)

        //上一次的虚拟dom
        const prevVnode = vm._vnode

        if(!prevVnode) {
            //第一次渲染
            vm.$el = vm.__patch__(vm.$el,vnode,hydrating,false )
        }else {
            //更新
            vm.$el = vm.__patch__(prevVnode,vnode)
        }
        //做完patch以后，恢复当前的vue实例
        restoreActiveInstance()

        vm._vnode = vnode
    }
}

export function initLifecycle(vm){
    const options = vm.$options
    let parent = options.parent
    vm.$parent = parent
}

export function mountComponent (vm,el,hydrating){
    vm.$el = el
    let updateComponent =  () => {
        vm._update(vm._render(), hydrating)
    }

    new Watcher(vm, updateComponent, noop, {
        before () {
        }
    }, true /* isRenderWatcher */)
    return vm
}
