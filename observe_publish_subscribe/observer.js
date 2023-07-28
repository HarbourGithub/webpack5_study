// 实现观察者模式案例

// 定义一个消息通知中心
class MessageCenter {
  constructor() {
    this.observers = []
  }

  // 添加订阅者
  addObserver(observer) {
    this.observers.push(observer)
  }

  // 删除订阅者
  removeObserver(observer) {
    this.observers = this.observers.filter(item => item !== observer)
  }

  // 通知所有订阅者
  notify(message) {
    this.observers.forEach(observer => {
      observer.update(message)
    })
  }
}

// 定义一个消息观察者
class Observer {
  constructor(name) {
    this.name = name
  }

  update(message) {
    console.log(`${this.name} get message: ${message}`)
  }
}

const messageCenter = new MessageCenter()
const observer1 = new Observer('observer1')
const observer2 = new Observer('observer2')
messageCenter.addObserver(observer1)
messageCenter.addObserver(observer2)
messageCenter.notify('hello world')
messageCenter.removeObserver(observer1)
messageCenter.notify('hello world again')
