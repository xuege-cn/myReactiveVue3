import { targetMap } from './reactive'

const activeReactiveEffectStack = []

// 下面这两个api是初始化effect，就不过于纠结了
export function effect(fn, options){
    const effect = createReactiveEffect(fn, options)
    return effect
}

function createReactiveEffect(fn, options){
    const effect = function(){
        if (!activeReactiveEffectStack.includes(effect)) {
            try {
              activeReactiveEffectStack.push(effect)
              return fn()
            } finally {
              activeReactiveEffectStack.pop()
            }
        }
    }
    effect.scheduler = options.scheduler
    return effect
}

// 作用：
// 1.收集依赖
export function track(target, type, key){
    const effect = activeReactiveEffectStack[activeReactiveEffectStack.length - 1]
    // proxy初始化的时候，这个depsMap为new Map
    let depsMap = targetMap.get(target)
    if (depsMap === void 0) {
        targetMap.set(target, (depsMap = new Map()))
    }

    // 如果是第一次这个dep是没有的，因为depsMap是new Map
    let dep = depsMap.get(key)
    if (dep === void 0) {
        // 这里把依赖放进去。依赖是个Set
        depsMap.set(key, (dep = new Set()))
    }
    // 这里的effect就是依赖。
    // 依赖是啥？可以理解为依赖保存了data <-> dom的关系
    dep.add(effect)
    // effect.deps.push(dep)
}

// 作用：
//  1.触发了数据更新，这时候得更新dom了
export function trigger(target, type, key){
    const depsMap = targetMap.get(target)
    const effects = new Set()
    const run = effect => {
        scheduleRun(effect, target, type, key)
    }
    // 解析出依赖中要更新的effect
    addRunners(effects, depsMap.get(key))

    // 任务调度执行
    effects.forEach(run)
}

function addRunners(effects, effectsToAdd){
    effectsToAdd.forEach(effect => {
        effects.add(effect)
    })
}

// 任务调度，就理解为data更新之后，调用effect.scheduler去更新dom
function scheduleRun(effect, target, type, key){
    if (effect.scheduler !== void 0) {
        effect.scheduler(effect)
    } else {
        effect()
    }
}