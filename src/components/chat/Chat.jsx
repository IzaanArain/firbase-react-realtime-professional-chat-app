import { useEffect, useRef, useState } from 'react';
import './chat.css'
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../store/chatStore';
import { useUserStore } from '../../store/userStore';

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);

  const { currentUser } = useUserStore();
  const { chatId, user } = useChatStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    })

    return () => {
      unSub();
    }
  }, [chatId]);


  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false)
  };

  const handleSend = async () => {
    if (!text.trim() === "") return;
    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date()
        })
      });

      const userIds = [currentUser.id, user.id];

      userIds.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapShot = await getDoc(userChatsRef)

        if (userChatsSnapShot.exists()) {
          const userChatsData = userChatsSnapShot.data();

          const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ?  true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          })
        }
      })

    } catch (error) {
      console.log(error)
    }
  };
  return (
    <section className='chat'>
      <section className="top">
        <div className="user">
          <img src="./avatar.png" alt="avatar" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, sunt!</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="phone" />
          <img src="./video.png" alt="video" />
          <img src="./info.png" alt="info" />
        </div>
      </section>
      <section className="center">
        {
          chat?.messages.map((msg) => (
            <div className="message own" key={msg.createdAt}>
              <div className="texts">
                {msg.img && (
                  <img
                    src="https://images.pexels.com/photos/19155212/pexels-photo-19155212/free-photo-of-roof-on-a-yellow-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="" />
                )}
                <p>{msg.text}</p>
                {/* <span>{msg.createdAt}</span> */}
              </div>
            </div>
          ))
        }
        <div ref={endRef}></div>
      </section>
      <section className="bottom">
        <div className="icons">
          <img src="./img.png" alt="img" />
          <img src="/camera.png" alt="camera" />
          <img src="./mic.png" alt="microphone" />
        </div>
        <input
          type="text"
          value={text}
          placeholder='Type a message...'
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt="emoji"
            onClick={() => setOpen((prev) => !prev)} />
          <div className="emojiPicker">
            <EmojiPicker
              open={open}
              onEmojiClick={handleEmoji}
            />
          </div>
        </div>
        <button className='sendButton' onClick={handleSend}>Send</button>
      </section>
    </section>
  )
}

export default Chat