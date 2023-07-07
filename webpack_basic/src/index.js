import { test01 } from "./js/test01"
import { test02 } from "./js/test02"
import "./style/test01.css"
import "./style/test01.less"
import "./style/iconfont.css"

test01()
test02()

document.getElementById("btn").onclick = function () {
    import(/* webpackChunkName: 'add' */ "./js/test03").then(({ add }) => {
        console.log(add(1, 2))
    }).catch(() => {
        console.log("加载失败")
    })
}