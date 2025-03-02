import { useEffect, useRef, useState } from 'react';
import './chat.css'
import EmojiPicker from 'emoji-picker-react';

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false)
  }
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
        <div className="message">
          <img src="./avatar.png" alt="avatar" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nihil repudiandae laboriosam repellat eos, aperiam quae, voluptatibus nisi porro harum officia id! Ad ipsum iste, animi vero autem aperiam repellat? Ad nesciunt repudiandae alias illo nemo, error voluptas placeat quidem!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nihil repudiandae laboriosam repellat eos, aperiam quae, voluptatibus nisi porro harum officia id! Ad ipsum iste, animi vero autem aperiam repellat? Ad nesciunt repudiandae alias illo nemo, error voluptas placeat quidem!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="avatar" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nihil repudiandae laboriosam repellat eos, aperiam quae, voluptatibus nisi porro harum officia id! Ad ipsum iste, animi vero autem aperiam repellat? Ad nesciunt repudiandae alias illo nemo, error voluptas placeat quidem!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nihil repudiandae laboriosam repellat eos, aperiam quae, voluptatibus nisi porro harum officia id! Ad ipsum iste, animi vero autem aperiam repellat? Ad nesciunt repudiandae alias illo nemo, error voluptas placeat quidem!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="avatar" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nihil repudiandae laboriosam repellat eos, aperiam quae, voluptatibus nisi porro harum officia id! Ad ipsum iste, animi vero autem aperiam repellat? Ad nesciunt repudiandae alias illo nemo, error voluptas placeat quidem!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="https://images.pexels.com/photos/19155212/pexels-photo-19155212/free-photo-of-roof-on-a-yellow-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nihil repudiandae laboriosam repellat eos, aperiam quae, voluptatibus nisi porro harum officia id! Ad ipsum iste, animi vero autem aperiam repellat? Ad nesciunt repudiandae alias illo nemo, error voluptas placeat quidem!</p>
            <span>1 min ago</span>
          </div>
        </div>
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
        <button className='sendButton'>Send</button>
      </section>
    </section>
  )
}

export default Chat