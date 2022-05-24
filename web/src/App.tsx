import { Widget } from "./components/Widget"
import { Header } from './components/Header'
import { LoginForm } from './components/LoginForm';
import { FeedbacksListing } from './components/FeedbacksListing';
import { useState } from "react";
import { api } from "./lib/api";

interface User {
  name: string; 
  email: string;
  role: string;
}

export function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<User | null>(null);


  async function loginUser(email: string, password: string, name?: string) {
    const info = await api.post('/login', {
      email, 
      password
    }) 

    localStorage.setItem('token', info.data.token)
    setUser(info.data.user)
    console.log(info.data.user);
  }

  async function createUser(email: string, password: string, name?: string) {
    const info = await api.post('/users', {
      name,
      email, 
      password
    })

    localStorage.setItem('token', info.data.token)
    setUser(info.data.user)
  }

  return (
    <> 
      <Header changeIsLogin={setIsLogin} user={user} clearUser={setUser}/>
      { user?.name === undefined && <LoginForm isLogin={isLogin} submitLogin={loginUser} createUser={createUser}/>}
      { user?.role === "admin" && <FeedbacksListing /> }
      <Widget />
    </>
  );
}

