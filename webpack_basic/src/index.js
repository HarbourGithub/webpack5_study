import { add } from "./javascript/math"
import './style/index.css'
import './style/index.less'
import './style/iconfont.css'

console.log(add(1, 2))

// 获取id为audio的元素
const audio = document.getElementById('audio')
// 播放音频
audio.play()

// 获取id为video的元素
const video = document.getElementById('video')
// 播放视频
video.play()

Array.from(new Set([1, 2, 3]))

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js').then(registration => {
//             console.log('SW registered: ', registration)
//         }).catch(registrationError => {
//             console.log('SW registration failed: ', registrationError)
//         })
//     })
// }