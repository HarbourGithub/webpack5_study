// 使用发布订阅模式实现事件的监听和触发
// 1. 定义一个对象，用来存储事件
// 2. 定义一个on方法，用来监听事件
// 3. 定义一个emit方法，用来触发事件
// 4. 定义一个off方法，用来移除事件
// 5. 定义一个once方法，用来只监听一次事件
class EventEmitter {
    constructor() {
        this.events = {}
    }
    // 监听事件
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = []
        }
        if (!this.events[eventName].includes(callback)) {
            this.events[eventName].push(callback)
        }
    }
    // 取消监听事件
    off(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(item => item !== callback)
        }
    }
    // 触发事件
    emit(eventName, arg) {
        if (this.events[eventName] && this.events[eventName].length > 0) {
            this.events[eventName].forEach(callback => {
                callback(arg)
            })
        } else {
            console.log(`no listener for event: ${eventName}`)
        }
    }
    // 只监听一次事件
    once(eventName, callback) {
        const fn = (arg) => {
            callback(arg)
            this.off(eventName, fn)
        }
        this.on(eventName, fn)
    }
}

// 创建一个事件监听器
const eventEmitter = new EventEmitter()
// 定义一个事件
const eventName = 'click'
// 定义一个事件监听器
const listener = (args) => {
    console.log(`receive event: ${args}`)
}
// 监听事件
eventEmitter.on(eventName, listener)
// 触发事件
eventEmitter.emit(eventName, 'hello world')
eventEmitter.emit(eventName, 'hello world again')
// 取消监听事件
eventEmitter.off(eventName, listener)
eventEmitter.emit(eventName, 'hello world again again')
// 只监听一次事件
eventEmitter.once(eventName, listener)
eventEmitter.emit(eventName, 'hello world again again again')
eventEmitter.emit(eventName, 'hello world again again again')