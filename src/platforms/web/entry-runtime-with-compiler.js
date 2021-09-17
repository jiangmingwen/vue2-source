import Vue from './runtime/index'
import { query } from './util/index'

const mount = Vue.prototype.$mount

Vue.prototype.$mount = function(el,hydrating){
    el = el && query(el)
    const options = this.$options
    if(!options.render){
        //没有render函数
        let template = options.template
        if(template){
            if(typeof template === 'string'){

            }else if(template.nodeType){
                template = template.innerHTML
            }
        }else if(el){

        }else {
            return this
        }

        //存在template 进行编译
        if(template){
            //通过编译得到render
            let render = ()=>{ console.log('编译方法得到的render') }
            options.render = render
        }
    }
    //如果有render函数
    return mount.call(this,el,hydrating)
}

export default Vue