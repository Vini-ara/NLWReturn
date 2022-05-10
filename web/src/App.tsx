import { Widget } from "./components/Widget"
import { Header } from './components/Header'
import { LoginForm } from './components/LoginForm';
import { useState } from "react";

export function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({});

  return (
    <> 
      <Header />
      <LoginForm isLogin={isLogin} />
      <Widget />
    </>
  );
}

