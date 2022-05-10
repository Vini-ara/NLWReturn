import { useState } from "react";

interface LoginFormProps {
  isLogin: boolean;
}

export function LoginForm({ isLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="bg-zinc-800 px-8 py-10 relative mt-[15vh] max-w-xl rounded-lg mx-auto flex flex-col items-center justify-center">   
      <h2 className="text-xl font-bold text-center">{isLogin ? "Entrar" : "Cadastrar-se"}</h2>

      <div className="h-8 mt-10 relative self-start w-full"> 
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          required
          className="peer w-full absolute top-0 bg-transparent p-2 border-black rounded-md outline-none focus:border-brand-500"
        />
        <label className={`top-[1px] left-[1px] p-2 inline-block transition-all pointer-events-none peer-focus:translate-x-[-7px] 
          peer-focus:-translate-y-8 peer-focus:text-xs peer-focus:text-brand-500 peer-valid:translate-x-[-7px] peer-valid:-translate-y-8 
          peer-valid:text-xs ${email.length ? "peer-invalid:translate-x-[-7px] peer-invalid:-translate-y-8 peer-invalid:text-xs peer-invalid:text-red-400" : ''}`}>
          E-mail 
        </label>
      </div>

      <div className="h-8 mt-10 relative w-full">
        <input 
          type="password" 
          required 
          onChange={(e) => setPassword(e.target.value)}
          className="w-full peer absolute top-0 bg-transparent p-2 border-black rounded-md outline-none focus:border-brand-500"
        />
        <label className="top-[1px] left-[1px] p-2 inline-block transition-all pointer-events-none peer-focus:translate-x-[-7px] peer-focus:-translate-y-8 peer-focus:text-xs peer-focus:text-brand-500 peer-valid:translate-x-[-7px] peer-valid:-translate-y-8 peer-valid:text-xs">
          Senha
        </label>
      </div>

      <button 
        type="submit" 
        className="mt-8 p-3 text-md font-bold bg-brand-500 w-full rounded-md hover:bg-brand-300"
      > 
        Conecte-se
      </button>
    </form>
  );
}
