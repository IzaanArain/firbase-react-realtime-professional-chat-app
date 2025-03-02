import './list.css'
import UserInfo from "./userInfo/UserInfo"
import ChatList from "./chatList/ChatList"
  ;
const List = () => {
  return (
    <section className='list'>
      <UserInfo />
      <ChatList />
    </section>
  )
}

export default List