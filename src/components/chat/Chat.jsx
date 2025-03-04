import { useEffect, useRef, useState } from 'react';
import './chat.css'
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../store/chatStore';
import { useUserStore } from '../../store/userStore';
import { upload } from '../../lib/upload';

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: ""
  });

  const endRef = useRef(null);

  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, } = useChatStore();

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

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  const handleSend = async () => {
    if (!text.trim() === "") return;
    let imgUrl = null
    try {
      if (img.file) {
        imgUrl = await upload(img.file)
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
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
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          })
        }
      })

    } catch (error) {
      console.log(error)
    }

    setImg({
      file: null,
      url: ""
    })
    setText("");
  };

  return (
    <section className='chat'>
      <section className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="avatar" />
          <div className="texts">
            <span>{user?.username}</span>
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
            <div className={msg.senderId === currentUser?.id ? `message own` : `message`} key={msg.createdAt}>
              <div className="texts">
                {msg.img && (
                  <img
                    src={msg.img}
                    alt="" />
                )}
                <p>{msg.text}</p>
                {/* <span>{msg.createdAt}</span> */}
              </div>
            </div>
          ))
        }
        {
          img.url && (
            <div className='message own'>
              <div className="texts">
                <img src={img.url} alt="image" />
              </div>
            </div>
          )
        }
        <div ref={endRef}></div>
      </section>
      <section className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="img" />
          </label>
          <input type="file" id='file' style={{ display: "none" }} onChange={handleImg} />
          <img src="/camera.png" alt="camera" />
          <img src="./mic.png" alt="microphone" />
        </div>
        <input
          type="text"
          value={text}
          placeholder={isCurrentUserBlocked || isReceiverBlocked
            ? "You can not send a message"
            : 'Type a message...'}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
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
        <button
          className='sendButton'
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </section>
    </section>
  )
}

export default Chat