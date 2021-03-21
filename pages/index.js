import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Image from '../components/image.js'
import Tag from '../components/tag.js'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [website, setWebsite] = useState('')
  const [focusInput, setFocusInput] = useState(0)
  const [list, setList] = useState([])
  const flag = useRef(-1)

  useEffect(() => {
    const string = window.localStorage.getItem('list')
    const listItem = JSON.parse(string)
    if (listItem) setList(listItem)
  }, [])

  function handleAddBtn() {
    setShowModal(true)
    flag.current = -1
  }

  function handleSubmit () {
    if (flag.current === -1) {
      const newList = [{title: name, img: '/tags/mbec.png', url: website}, ...list]
      setList(newList)
      window.localStorage.setItem('list', JSON.stringify(newList))
    } else {
      list[flag.current] = {title: name, img: '/tags/mbec.png', url: website}
      const newList = [...list]
      setList(newList)
      window.localStorage.setItem('list', JSON.stringify(newList))
    }
    setName('')
    setWebsite('')
    setShowModal(false)
  }

  return (
    <div className="app-container">
      <Head>
        <title>新标签页</title>
      </Head>

      <Image />

      <div className="input-area">
        <div>
          <img src="/imgs/search.svg" className="search-img" />
          <input placeholder="在 goole 上搜索, 或者输入一个网址" />
          <img src="/imgs/googlemic_clr_24px.svg" className="clr-img" />
        </div>
      </div>

      <div className="tags-container">
        <div>

          {
            list.map((li, index) => {
              return <Tag 
                setList={setList} 
                list={list}
                index={index} 
                key={index} 
                data={li} 
                setShowModal={setShowModal}
                setName={setName}
                setWebsite={setWebsite}
                flag={flag}
              />
            })
          }

          <div onClick={handleAddBtn} className="add-tag-con">
            <div className="icon-area">
              <img src="/tags/add.svg" />
            </div>
            <span>添加快捷方式</span>
          </div>
        </div>
      </div>

      {
        showModal ? (<div className="add-modal-con">
          <div className="modal-content">
            <div className="modal-title">
              添加快捷方式
            </div>
            <div 
              className={[
                'modal-input-area', 
                focusInput === 1 ? 'active' : ''
              ].join(' ')}
            >
              <span>名称</span>
              <div>
                <input 
                  onFocus={() => setFocusInput(1)} 
                  onInput={(e) => setName(e.target.value)} 
                  value={name}
                />
              </div>
            </div>
            <div 
              className={[
                'modal-input-area', 
                focusInput === 2 ? 'active' : ''
              ].join(' ')}
            >
              <span>网址</span>
              <div>
                <input 
                  onFocus={() => setFocusInput(2)} 
                  onInput={(e) => setWebsite(e.target.value)} 
                  value={website}
                />
              </div>
            </div>
            <div className="btn-area">
              <button onClick={() => {
                setShowModal(false)
                setFocusInput(0)
              }}>取消</button>
              <button 
                className={`${!(name && website) ? 'disabled' : ''}`}
                onClick={handleSubmit}
                disabled={!(name && website)}
              >完成</button>
            </div>
          </div>
        </div>) : null
      }

      <style jsx>{`
        .app-container {
          width: 100%;
          height: 100%;
          background-color: #445760;
          padding-top: 180px;
          box-sizing: border-box;
        }

        .input-area {
          display: flex;
          justify-content: center;
        }

        .input-area > div {
          width: 560px;
          height: 46px;
          display: flex;
          background-color: white;
          align-items: center;
          border-radius: 23px;
          padding: 0 15px;
          box-sizing: border-box;
          overflow: hidden;
        }

        .input-area > div > img {
          width: 24px;
          height: 24px;
        }

        .input-area > div > input {
          display: block;
          outline: none;
          border: none;
          height: 100%;
          flex: 1;
          padding: 0 10px;
          font-size: 18px;
        }

        .tags-container {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .tags-container > div {
          width: 560px;
          display: flex;
          flex-wrap: wrap;
        }

        .tags-container > div .add-tag-con {
          width: 112px;
          height: 112px;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 15px;
          cursor: pointer;
        }

        .tags-container > div .add-tag-con:hover {
          background-color: #576870;
        }

        .tags-container > div .add-tag-con .icon-area {
          width: 50px;
          height: 50px;
          background-color: #36464D;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .tags-container > div .add-tag-con span {
          color: white;
        }

        .add-modal-con {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .add-modal-con .modal-content {
          width: 515px;
          height: 245px;
          background-color: #292A2D;
          border-radius: 10px;
          padding: 20px;
          color: white;
          position: relative;
        }

        .add-modal-con .modal-content .modal-input-area {
          padding: 10px 0;
        }

        .add-modal-con .modal-content .active span {
          color: #8AB4F8;
        }

        .add-modal-con .modal-content .active > div input {
          border-bottom: 2px solid #8AB4F8 !important;
        }

        .add-modal-con .modal-content .modal-input-area > div {
          margin: 5px 0;
        }

        .add-modal-con .modal-content .modal-input-area > div input {
          border: 0;
          outline: 0;
          display: block;
          height: 25px;
          width: 100%;
          border-radius: 5px;
          padding: 0 5px;
          background-color: black;
          color: white;
        }

        .add-modal-con .modal-content .btn-area {
          width: 100%;
          height: 35px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          position: absolute;
          bottom: 20px;
          right: 20px;
        }

        .add-modal-con .modal-content .btn-area button {
          width: 60px;
          height: 32px;
          border: 1px solid #5F6368;
          outline: 0;
          border-radius: 5px;
          background-color: #292A2D;
          color: #7FA6E5;
          cursor: pointer;
          margin-left: 10px;
        }

        .add-modal-con .modal-content .btn-area button:nth-of-type(1):hover {
          background-color: #31353C;
        }

        .add-modal-con .modal-content .btn-area button:nth-of-type(2) {
          background-color: #8AB4F8;
          color: black;
        }

        .add-modal-con .modal-content .btn-area button:nth-of-type(2):hover {
          background-color: #7FA6E5;
        }

        .add-modal-con .modal-content .btn-area button.disabled {
          background-color: #3C4043;
          color: #5F6368;
          cursor: default;
        }

        .add-modal-con .modal-content .btn-area button.disabled:hover {
          background-color: #3C4043;
          color: #5F6368;
          cursor: default;
        }
      `}</style>
    </div>
  )
}
