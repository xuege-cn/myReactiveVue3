import { effect } from './effect'
import { queueJob } from './scheduler'

export function compile(el, vm){
    let fragment = document.createDocumentFragment();
    let node;
    
    while(node = el.firstChild){
        compileNode(vm, node)
        fragment.append(node)
    }

    return fragment
}

const reg = /\{\{(.*)\}\}/;
function compileNode(vm, node){
    let { nodeType, nodeValue, nodeName } = node;

    node.update = (type, bindName) => {
        return effect(() => {
            node[type] = vm[bindName]
        }, { scheduler: queueJob })
    }


    let bindName;
    switch(nodeType){
        case 1:
            if(nodeName == 'INPUT'){
                let { attributes } = node;
                for(let attr of attributes){
                    if(attr.name === 'v-model'){
                        bindName = attr.value;
                    }
                }
                if(bindName){
                    node.addEventListener('input', e => {
                        vm[bindName] = e.target.value;
                    })
                }
                node.update('value', bindName)()
            }
            break;
        case 3:
            let isModal = reg.test(nodeValue)
            if(isModal){
                bindName = RegExp.$1 && RegExp.$1.trim();
                node.update('nodeValue', bindName)()
            }
            break;
    }
}