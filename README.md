## vue3.0 数据驱动源码解读

### 问题1.
看完reactive.js源码，遗留个问题：
    new Proxy的handlers来源于baseHandler.js
        -> 看下baseHandler.js的mutableHandlers：代理操作主要做什么？


### 问题2.
看完effect.js的源码：
    effect的作用：
        1.track收集依赖
        2.trigger触发更新
        3.scheduleRun任务调度
        4.最重要的：维护依赖effect

⚠️⚠️⚠️effect.js中的effect函数：其实是给外部用的，提供给dom解析（即runtime-core）用的，因为dom跟data之间要建立依赖
下面三个文件中，用到了effect：
runtime-core/src/apiWatch.ts
runtime-core/src/createRender.ts


### 在runtime-core/src/createRender.ts中调用了effect()，传入的option是如下：
{
  scheduler: queueJob
}