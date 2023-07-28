// 发布订阅模式实现
class BlogPublisher {
    static channels = {};

    static publish(blogAuthorName, article) {
        if (BlogPublisher.channels[blogAuthorName]) {
            BlogPublisher.channels[blogAuthorName].forEach((subscriber) => {
                subscriber.update(blogAuthorName, article);
            });
        }
    }
}

class BlogSubscriber {
    static subscriptions = {};

    static subscribe(userName, blogAuthorName) {
        if (!BlogSubscriber.subscriptions[userName]) {
            BlogSubscriber.subscriptions[userName] = [];
        }

        if (!BlogSubscriber.subscriptions[userName].includes(blogAuthorName)) {
            BlogSubscriber.subscriptions[userName].push(blogAuthorName);
        }

        if (!BlogPublisher.channels[blogAuthorName]) {
            BlogPublisher.channels[blogAuthorName] = [];
        }

        if (!BlogPublisher.channels[blogAuthorName].includes(BlogSubscriber.subscriptions[userName])) {
            BlogPublisher.channels[blogAuthorName].push(BlogSubscriber.subscriptions[userName]);
        }
    }

    static unsubscribe(userName, blogAuthorName) {
        if (BlogSubscriber.subscriptions[userName]) {
            BlogSubscriber.subscriptions[userName] = BlogSubscriber.subscriptions[userName].filter(
                (author) => author !== blogAuthorName
            );

            BlogPublisher.channels[blogAuthorName] = BlogPublisher.channels[blogAuthorName].filter(
                (subscribers) => subscribers !== BlogSubscriber.subscriptions[userName]
            );
        }
    }
}

// 发布者（博客作者）
class BlogAuthor {
    constructor(name) {
        this.name = name;
    }

    publishArticle(article) {
        BlogPublisher.publish(this.name, article);
    }
}


// 订阅者（用户）
class User {
    constructor(name) {
        this.name = name;
    }

    subscribe(blogAuthorName) {
        BlogSubscriber.subscribe(this.name, blogAuthorName);
    }

    unsubscribe(blogAuthorName) {
        BlogSubscriber.unsubscribe(this.name, blogAuthorName);
    }

    update(blogAuthorName, article) {
        console.log(`${this.name} 收到来自 ${blogAuthorName} 的新文章：${article}`);
    }
}

// 使用发布订阅模式实现博客文章订阅系统
const user1 = new User('Alice');
const user2 = new User('Bob');

const blogAuthor1 = new BlogAuthor('Author1');
const blogAuthor2 = new BlogAuthor('Author2');

user1.subscribe('Author1');
user2.subscribe('Author1');
user2.subscribe('Author2');

blogAuthor1.publishArticle('Article 1 from Author1');
blogAuthor2.publishArticle('Article 1 from Author2');

user1.unsubscribe('Author1');

blogAuthor1.publishArticle('Article 2 from Author1');
