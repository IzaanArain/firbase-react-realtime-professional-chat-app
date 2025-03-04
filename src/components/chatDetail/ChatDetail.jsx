import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase'
import { useChatStore } from '../../store/chatStore';
import { useUserStore } from '../../store/userStore';
import './chatDetail.css'

const ChatDetail = () => {
  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock  } = useChatStore();


  const handleBlock = async () => {
    if(!user) return;
    const userDocRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      })
      changeBlock()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='chatDetail'>
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="avatar" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet consectetur</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat setting</span>
            <img src="./arrowUp.png" alt="arrowup" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="arrowup" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="arrowup" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/19155212/pexels-photo-19155212/free-photo-of-roof-on-a-yellow-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <span>photo_2025_2.png</span>
              </div>
              <img src="./download.png" alt="download" className='icon'/>
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/19155212/pexels-photo-19155212/free-photo-of-roof-on-a-yellow-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <span>photo_2025_2.png</span>
              </div>
              <img src="./download.png" alt="download" className='icon'/>
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/19155212/pexels-photo-19155212/free-photo-of-roof-on-a-yellow-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <span>photo_2025_2.png</span>
              </div>
              <img src="./download.png" alt="download" className='icon'/>
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/19155212/pexels-photo-19155212/free-photo-of-roof-on-a-yellow-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <span>photo_2025_2.png</span>
              </div>
              <img src="./download.png" alt="download" className='icon'/>
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="arrowup" />
          </div>
        </div>
        <button onClick={handleBlock}>
        {
          isCurrentUserBlocked 
          ? "You Are Blocked!" 
          : isReceiverBlocked
          ? "User Blocked!"
          : "Block User"
        } 
        </button>
        <button className='logout' onClick={()=> auth.signOut()}>Logout</button>
      </div>
    </section>
  )
}

export default ChatDetail