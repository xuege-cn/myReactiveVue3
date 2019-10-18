import { mutableHandlers } from './baseHandler'

// 这个map存储key: target， value：proxy
// 作用：
//  1.避免重复proxy
const rawToReactive = new WeakMap()
// 这个map存储key：proxy， value：target
// 作用：
//  1.避免proxy对象再次被proxy
const reactiveToRaw = new WeakMap()
export const targetMap = new WeakMap()

export function reactive(target){
    return createReactiveObject(
        target,
        rawToReactive,
        reactiveToRaw,
        mutableHandlers
    )
}

// 创建响应式对象
function createReactiveObject(target, toProxy, toRaw, handlers){
    // 如果当前对象已被proxy，那么直接返回
    let observed = toProxy.get(target)
    if (observed !== void 0) {
        return observed
    }

    // 检测被proxy的对象，即这里的target，自身是否是个proxy，如果是的话，直接返回
    if (toRaw.has(target)) {
        return target
    }

    // 当前的target既没有被proxy，也不是个proxy对象，那么对它proxy
    observed = new Proxy(target, handlers)

    // 实例化之后把它维护到两个map
    toProxy.set(target, observed)
    toRaw.set(observed, target)

    // 把当前的target维护到targetMap，targetMap的作用 -> 【继续往下看，先不管】
    if (!targetMap.has(target)) {
        targetMap.set(target, new Map())
    }
    return observed
}

// toRaw函数，传入proxy对象，获取target
// 
export function toRaw(observed) {
    return reactiveToRaw.get(observed) || observed
}