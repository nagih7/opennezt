import _ from 'lodash'
import assert from 'assert'

// Check if a function is an async function
export function isAsyncFunction(v) {
    return _.isFunction(v) && v.constructor && v.constructor.name === 'AsyncFunction'
}

// Wrap an async function to catch errors
export function asyncHandler(fn) {
    assert(isAsyncFunction(fn), new TypeError('"fn" is required and must be an async function.'))
    return function asyncUtilWrap(...args) {
        const fnReturn = fn(...args)
        const next = args[args.length - 1]
        return Promise.resolve(fnReturn).catch(next)
    }
}
