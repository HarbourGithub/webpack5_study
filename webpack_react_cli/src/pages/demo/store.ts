type Subscriber = () => void

let count = 0

let subscribers: Subscriber[] = []

const setCount = (newCount: number) => {
    count = newCount
    subscribers.forEach((item) => {
        item()
    })
}

const subscribe = (callback: Subscriber) => {
    subscribers.push(callback)
    return () => {
        subscribers = subscribers.filter((item) => item !== callback)
    }
}

const getCount = () => {
    return count
}

export {
    setCount,
    subscribe,
    getCount
}