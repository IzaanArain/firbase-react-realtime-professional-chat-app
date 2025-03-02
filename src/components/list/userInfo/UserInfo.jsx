import './userInfo.css'

const UserInfo = () => {
  return (
    <section className='userInfo'>
      <div className="user">
        <img src="./avatar.png" alt="avatar" />
        <h2>John Doe</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="more" />
        <img src="./video.png" alt="video" />
        <img src="./edit.png" alt="edit" />
      </div>
    </section>
  )
}

export default UserInfo