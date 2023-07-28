// 实现发布订阅模式案例

// 定义博客发布订阅中心
class BlogCenter {
    constructor() {
        // 保存博主和订阅者对应关系的对象
        this.bloggerSubscribe = {}
    }

    // 订阅者订阅博主
    subscribe(subscriber, bloggerName) {
        if (!this.bloggerSubscribe[bloggerName]) {
            this.bloggerSubscribe[bloggerName] = []
        }
        if (!this.bloggerSubscribe[bloggerName].includes(subscriber)) {
            this.bloggerSubscribe[bloggerName].push(subscriber)
        }
    }

    // 订阅者取消订阅博主
    unsubscribe(subscriber, bloggerName) {
        if (this.bloggerSubscribe[bloggerName]) {
            this.bloggerSubscribe[bloggerName] = this.bloggerSubscribe[bloggerName].filter(item => item !== subscriber)
        }
    }
}

// 定义博主
class Blogger {
    constructor(name) {
        this.name = name
    }

    // 博主发布博客
    publishBlog(bloggerSubscribe, blog) {
        if (bloggerSubscribe[this.name] && bloggerSubscribe[this.name].length > 0) {
            bloggerSubscribe[this.name].forEach(subscriber => {
                subscriber.update(blog)
            })
        } else {
            console.log(`no subscriber for blogger: ${this.name}`)
        }
    }
}

// 定义订阅者
class Subscriber {
    constructor(name) {
        this.name = name
    }

    // 订阅者接收博客
    update(blog) {
        console.log(`${this.name} receive blog: ${blog}`)
    }
}

// 创建博客发布订阅中心
const blogCenter = new BlogCenter()
// 创建博主
const blogger1 = new Blogger('blogger1')
const blogger2 = new Blogger('blogger2')
// 创建订阅者
const subscriber1 = new Subscriber('subscriber1')
const subscriber2 = new Subscriber('subscriber2')
const subscriber3 = new Subscriber('subscriber3')
// 订阅者订阅博主
blogCenter.subscribe(subscriber1, blogger1.name)
blogCenter.subscribe(subscriber1, blogger1.name)
blogCenter.subscribe(subscriber3, blogger2.name)
// 博主发布博客
blogger1.publishBlog(blogCenter.bloggerSubscribe, 'hello world')
blogger2.publishBlog(blogCenter.bloggerSubscribe, 'hello world again')
// 订阅者取消订阅博主
blogCenter.unsubscribe(subscriber1, blogger1.name)
// 博主再次发布博客
blogger1.publishBlog(blogCenter.bloggerSubscribe, 'hello world again and again')
blogger2.publishBlog(blogCenter.bloggerSubscribe, 'hello world again and again and again')
