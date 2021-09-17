import Vue from '../../../core/index'
import { mountComponent } from '../../../core/instance/lifecycle'
import { query } from '../util/index'
import { patch } from './patch'


//比较新旧虚拟节点
Vue.prototype.__patch__ = patch

// public mount method
Vue.prototype.$mount = function (el,hydrating){
    el =  query(el) 
    return mountComponent(this, el, hydrating)
}


export default Vue
