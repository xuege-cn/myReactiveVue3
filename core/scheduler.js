const queue = []
const p = Promise.resolve()
let isFlushing = false

export function queueJob(job) {
    if (!queue.includes(job)) {
        queue.push(job)
        if (!isFlushing) {
            nextTick(flushJobs)
        }
    }
}

export function nextTick(fn) {
    return fn ? p.then(fn) : p
}

function flushJobs(seenJobs) {
    isFlushing = true
    let job
    while ((job = queue.shift())) {
        job()
    }
    isFlushing = false
}