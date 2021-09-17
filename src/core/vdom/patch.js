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

    function createChildren(vnode,children){
        if(Array.isArray(children)){
            for(let i =0;i<children.length;i++) {
                createElm(children[i],null,vnode.elm)
            }
        }else if(isPrimitive(vnode.text)) {
            nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)) )
        }
    }

    
    return  function patch(oldVnode,vnode,hydrating,removeOnly){
        console.log('vdom patch:',oldVnode,vnode,hydrating,removeOnly)
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
            createElm(vnode,null,parentElm)
        }
    }
}


