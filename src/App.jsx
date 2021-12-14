import { useState, useEffect } from 'react';
import './App.css'
import Todo from './components/todo'
import firebase from 'firebase/app';
import 'firebase/auth';

function App() {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem('auth') === 'true'
  );
  const [token, setToken] = useState('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem('auth', 'true');
        userCred.getIdToken().then((token) => {
          setToken(token);
        });
      }
    });
  }, []);

  const loginWithGoogle = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (userCred) => {
        if (userCred) {
          setAuth(true);
          window.localStorage.setItem('auth', 'true');
        }
      });
  };

  const logout = () => {
    firebase.auth().signOut();
    setAuth(false);
    window.localStorage.setItem('auth', 'false');
  };

  function Login() {
    return (
      <form>
        <button onClick={loginWithGoogle}>Login</button>
      </form>
    )
  }

  return (
    <>
      {auth ? (
        <Todo
          token={token}
          logout={logout}
        />
      ) : (
        < Login />
      )}
    </>
  )
}

export default App
