// 实现发布订阅模式案例

// 定义博客发布订阅中心
class BlogCenter {
    constructor() {
        // 保存博主和订阅者对应关系的对象
        this.bloggerSubscribe = {}
    }

    // 订阅者订阅博主
    blogCenterSubscribe(subscriber, bloggerName) {
        if (!this.bloggerSubscribe[bloggerName]) {
            this.bloggerSubscribe[bloggerName] = []
        }
        if (!this.bloggerSubscribe[bloggerName].includes(subscriber)) {
            this.bloggerSubscribe[bloggerName].push(subscriber)
        }
    }

    // 订阅者取消订阅博主
    blogCenterUnsubscribe(subscriber, bloggerName) {
        if (this.bloggerSubscribe[bloggerName] && this.bloggerSubscribe[bloggerName].length > 0) {
            this.bloggerSubscribe[bloggerName] = this.bloggerSubscribe[bloggerName].filter(item => item !== subscriber)
        }
        if (this.bloggerSubscribe[bloggerName] && this.bloggerSubscribe[bloggerName].length === 0) {
            delete this.bloggerSubscribe[bloggerName]
        }
    }

    // 博主发布博客
    blogCenterPublishBlog(bloggerName, blog) {
        if (this.bloggerSubscribe[bloggerName] && this.bloggerSubscribe[bloggerName].length > 0) {
            this.bloggerSubscribe[bloggerName].forEach(subscriber => {
                subscriber.update(blog)
            })
        } else {
            console.log(`no subscriber for blogger: ${bloggerName}`)
        }
    }
}

// 定义博主
class Blogger {
    constructor(name) {
        this.name = name
    }

    // 博主发布博客
    publishBlog(blogCenter, blog) {
        blogCenter.blogCenterPublishBlog(this.name, blog)
    }
}

// 定义订阅者
class Subscriber {
    constructor(name) {
        this.name = name
    }

    // 订阅者订阅博主
    subscribe(blogCenter, bloggerName) {
        blogCenter.blogCenterSubscribe(this, bloggerName)
    }

    // 订阅者取消订阅博主
    unsubscribe(blogCenter, bloggerName) {
        blogCenter.blogCenterUnsubscribe(this, bloggerName)
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
subscriber1.subscribe(blogCenter, blogger1.name)
subscriber2.subscribe(blogCenter, blogger1.name)
subscriber3.subscribe(blogCenter, blogger2.name)
// 博主发布博客
blogger1.publishBlog(blogCenter, 'hello world')
blogger2.publishBlog(blogCenter, 'hello world again')
// 订阅者取消订阅博主
subscriber1.unsubscribe(blogCenter, blogger1.name)
// 博主再次发布博客
blogger1.publishBlog(blogCenter, 'hello world again again')
blogger2.publishBlog(blogCenter, 'hello world again again again')
