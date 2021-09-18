import { isDef, isPrimitive, isUndef } from "../util/index"

import VNode from './vnode'
export function createPatchFunction(backend){
    const { nodeOps,modules } = backend

    function emptyNodeAt (elm) {
        return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }

    function insert(parent,elm,ref){
        if(isDef(parent)){
            if(isDef(ref)){

            }else {
                nodeOps.appendChild(parent,elm)
            }
        }
    }

    function createElm(vnode,
        insertedVnodeQueue,
        parentElm,
        refElm,
        nested,
        ownerArray,
        index
    ){
        if(createComponent(vnode,insertedVnodeQueue,parentElm,refElm)){
            return
        }
        const {data,children,tag} = vnode
        if(isDef(tag)){
            //存在标签
            vnode.elm = nodeOps.createElement(tag,vnode)
            createChildren(vnode,children)
            insert(parentElm,vnode.elm)
        }else {
            vnode.elm = nodeOps.createTextNode(vnode.text)
            insert(parentElm,vnode.elm)
        }
    }

    function createChildren(vnode,children,insertedVnodeQueue){
        if(Array.isArray(children)){
            for(let i =0;i<children.length;i++) {
                createElm(children[i],insertedVnodeQueue,vnode.elm)
            }
        }else if(isPrimitive(vnode.text)) {
            nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)) )
        }
    }

    
    return  function patch(oldVnode,vnode,hydrating,removeOnly){
        console.log('vdom patch:',oldVnode,vnode,hydrating,removeOnly)
        const insertedVnodeQueue = []

        if(isUndef(oldVnode)){

        }else {
            const isRealElement = isDef(oldVnode.nodeType)
            if(isRealElement) {
                //如果是真实节点，那么就是入口的APP
                oldVnode = emptyNodeAt(oldVnode)
            }
            // replacing existing element
            const oldElm = oldVnode.elm
            const parentElm = nodeOps.parentNode(oldElm)

            createElm(vnode,insertedVnodeQueue,parentElm,nodeOps.nextSibling(oldElm))
        }
    }
}


function createComponent(vnode,insertedVnodeQueue,parentElm,refElm){
    let i  = vnode.data
    if(isDef(i)) {
        const isReactivate = isDef(vnode.componentInstance) && i.keepAlive
        if(isDef(i = i.hook) && isDef(i = i.init) ){
            console.log('patch.js:  i(vnode,false)')
            i(vnode,false)
        }
        
        if(isDef(vnode.componentInstance)){
            console.log(vnode,insertedVnodeQueue,parentElm,refElm,'vnode,insertedVnodeQueue,parentElm,refElm')
            console.log('patch.js: componentInstance',vnode.componentInstance);
            return 
        }
    }
}