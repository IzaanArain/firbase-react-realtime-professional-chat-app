import { useEffect, useState } from 'react'
import './chatList.css'
import AddUser from './addUser/AddUser'
import { useUserStore } from '../../../store/userStore';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { items } from '../../../constants/constants';
import { useChatStore } from '../../../store/chatStore';

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const { currentUser } = useUserStore();
  const { changeChat, chatId } = useChatStore();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      // console.log(source, " data: ", doc.data());
      // setChats(doc.data());
      const items = res.data().chats
      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);
        const user = userDocSnap.data();
        return { ...item, user }
      });
      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => {
      unsub()
    }
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item)=> {
      const {user,...rest} = item;
      return rest
    });
    const chatIndex = userChats.findIndex((item)=> item.chatId === chat.chatId);
    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);
    try {
      await updateDoc(userChatsRef, {
        chats: userChats
      });
      changeChat(chat.chatId, chat.user)
    } catch (error) {
      console.log(error)
    }
  };

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
      {
        chats.map((chat, index) => (
          <div
            className="item"
            key={`${chat.chatId}`}
            onClick={() => handleSelect(chat)}
            style={{
              backgroundColor: chat.isSeen ? "transparent" : "#5183fe",
            }}
          >
            <img src={chat.user.avatar || "./avatar.png"} alt="avatar" />
            <div className="texts">
              <span>{chat.user.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))
      }
      {addMode && <AddUser />}
    </section>
  )
}

export default ChatList