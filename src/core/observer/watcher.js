export default class Watcher {
    constructor(vm,expOrFn,cb,options,isRenderWatcher){
        console.log('watcher.js vm', vm)
        expOrFn()
    }
}