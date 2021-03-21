import { useState, useRef } from 'react'

export default function Tag ({
  data, list, setList, 
  index, setShowModal,
  setName, setWebsite, flag
}) {
  const [showAlt, setAlt] = useState(false)
  const [showAltBtn, setBtn] = useState(false)
  let timer = useRef()

  function handleConMouseEnter(e) {
    timer = window.setTimeout(() => {
      setBtn(true)
    }, 1000)
  }

  function handleConMouseLeave () {
    window.clearTimeout(timer)
    setBtn(false)
  }

  function handleClick () {
    setName(data.title)
    setWebsite(data.url)
    setShowModal(true)
    flag.current = index
  }

  function handleDelete () {
    list.splice(index, 1)
    window.localStorage.setItem('list', JSON.stringify(list))
    setList([...list])
  }

  return <div 
    onMouseEnter={handleConMouseEnter}
    onMouseLeave={handleConMouseLeave}
    onClick={() => {
      console.log('将要跳转去' + data.title)
    }} 
    className="add-tag-con"
  >
    <div className="icon-area">
      <img src={data.img} />
    </div>
    <span className="tag-title">{data.title}</span>

    {
      showAltBtn
      ? <div onClick={(e) => {
          e.stopPropagation()
          setAlt(true)
        }} className="alt-btn">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      : null
    }

    {
      showAlt 
      ? <div onMouseLeave={() => setAlt(false)} className="alt-area">
          <span onClick={handleClick}>修改快捷方式</span>
          <span onClick={handleDelete}>移除</span>
        </div>
      : null
    }
    

    <style jsx>{`
      .add-tag-con {
        width: 112px;
        height: 112px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        cursor: pointer;
        position: relative;
      }

      .add-tag-con .alt-area {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        background-color: #2D2E31;
        padding: 10px 0;
        border-radius: 5px;
        width: 100%;
      }

      .add-tag-con .alt-area span {
        padding: 5px 15px;
        border-radius: 2px;
        color: white;
      }

      .add-tag-con .alt-btn {
        width: 10px;
        height: 10px;
        position: absolute;
        top: 5px;
        right: 10px;
        display: flex;
        flex-direction: column;
      }

      .add-tag-con .alt-btn span {
        display: block;
        width: 10px;
        height: 4px;
        line-height: 4px;
        color: white;
        font-size: 15px;
      }

      .add-tag-con .alt-area span:hover {
        background-color: #5F6368;
      }

      .add-tag-con:hover {
        background-color: #576870;
      }

      .add-tag-con .icon-area {
        width: 50px;
        height: 50px;
        background-color: #36464D;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .add-tag-con .tag-title {
        color: white;
        text-decoration: none;
      }
    `}</style>
  </div>
}
