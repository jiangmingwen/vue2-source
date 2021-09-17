import { initMixin } from "./init"
import { lifecycleMixin } from "./lifecycle"
import { renderMixin } from "./render"

function Vue(options){
    console.log('jay vue',options)
    this._init(options)
}

initMixin(Vue)  //实现了 _init
lifecycleMixin(Vue) //实现了 _update
renderMixin(Vue) //实现了 _render


export default Vue

