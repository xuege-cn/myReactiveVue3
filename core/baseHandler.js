import { toRaw } from './reactive'
import { track, trigger } from './effect'

// 为了便于理解，这里只做了get和set的proxy
// 其他的代码都是一般的代理，不讲，讲一下track和trigger
// 从vue 2.0的源码其实可以知道：
//  1.get的时候会做依赖收集：即这里的track
//  2.set的时候会做更新广播：即这里的trigger
export const mutableHandlers = {
    get(target, key, receiver){
        const res = Reflect.get(target, key, receiver)
        track(target, 'get', key)
        return res
    },
    set(target, key, value, receiver){
        const oldValue = target[key]
        const result = Reflect.set(target, key, value, receiver)

        // 这里检测key是否是target的自有属性
        const hadKey = target.hasOwnProperty(key)
        // 在reactive维护了一个reactiveToRaw队列，存储了[proxy]:[target]这样的队列，这里检测下是否是使用createReactiveObject新建的proxy
        if (target === toRaw(receiver)) {
            // 判断是否值改变，才触发更新
            if (hadKey && value !== oldValue) {
                trigger(target, 'set', key)
            }
        }
        return result
    }
}