import React, { memo, useState } from 'react'
import '@pages/demo/demo01.less'

function Demo01() {
  // 实现一个简单使用useState的组件
  // 1. 引入useState
  // 2. 使用useState
  // 3. 返回一个数组，第一个元素是状态，第二个元素是修改状态的函数
  // 4. 使用状态
  // 5. 修改状态
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>Demo Number {count}</h1>
      <button
        className="add-button"
        onClick={() => setCount(count + 1)}
      >
        Add
      </button>
    </div>
  )
}

export default memo(Demo01)
