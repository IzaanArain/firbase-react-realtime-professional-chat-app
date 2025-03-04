import List from './components/list/List';
import Chat from './components/chat/Chat';
import ChatDetail from './components/chatDetail/ChatDetail';
import Auth from './components/auth/Auth';
import Notification from './components/notification/Notification';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useUserStore } from './store/userStore';
import { useChatStore } from './store/chatStore';

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSubscribe();
    }
  }, [fetchUserInfo]);

  if (isLoading) return <div className='loading'>Loading...</div>;

  return (
    <div className="container">
      {
        currentUser ? (
          <>
            <List />
            {chatId && <Chat />}
            {chatId && <ChatDetail />}
          </>
        ) : (<Auth />)
      }
      <Notification />
    </div>
  )
}

export default App
