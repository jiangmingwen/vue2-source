import * as nodeOps from './node-ops'
import { createPatchFunction } from "../../../core/vdom/patch";

const modules = '' //platformModules.concat(baseModules)

export const patch = createPatchFunction({ nodeOps,modules })