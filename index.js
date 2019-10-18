import { reactive } from './core/reactive'
import { compile } from './core/compile'

export function Vue(option){
    let proxy = reactive(option.data)
    let el = document.getElementById('app')
    let fragment = compile(el, proxy)
    el.appendChild(fragment)
}

new Vue({
    el: 'app',
    data: {
        name: 'my name is xuege'
    }
})