import { useState } from 'react'
import './chatList.css'
import AddUser from './addUser/AddUser'

const ChatList = () => {
  const [addMode, setAddMode] = useState(false)
  return (
    <section className='chatList'>
      <section className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="text" placeholder='Search' />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt="plus" c
          className='add'
          onClick={() => setAddMode((prev) => !prev)}
        />
      </section>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>hello</p>
        </div>
      </div>
      {addMode && <AddUser/>}
    </section>
  )
}

export default ChatList