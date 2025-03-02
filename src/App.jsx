import List from './components/list/List';
import Chat from './components/chat/Chat';
import ChatDetail from './components/chatDetail/ChatDetail';
import Auth from './components/auth/Auth';
import Notification from './components/notification/Notification';

function App() {

  const user = true;

  return (
    <div className="container">
      {
        user ? (
          <>
            <List />
            <Chat />
            <ChatDetail />
          </>
        ) : (<Auth />)
      }
      <Notification/>
    </div>
  )
}

export default App
