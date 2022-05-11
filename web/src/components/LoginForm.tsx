import { FormEvent, useEffect, useState } from "react";

interface LoginFormProps {
  isLogin: boolean;
  submitLogin: (email: string, password: string, name?: string) => Promise<void>;
  createUser: (email: string, password: string, name?: string) => Promise<void>;
}

export function LoginForm({ isLogin, submitLogin, createUser }: LoginFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, [isLogin])

  async function handleSubmit(event: FormEvent, func: (email: string, password: string, name?: string) => Promise<void>) {
    event.preventDefault();

    try {
      await func(email, password, name);
    } catch(err: any) {
      if(err.response.status === 400){
        console.log(err.response.data.error)
        setErrorMsg(err.response.data.error);
      } else {
        setErrorMsg("Ops, something unexpected happened")
      }
    }

    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <form onSubmit={(e) => {isLogin ? handleSubmit(e, submitLogin) : handleSubmit(e, createUser)}} className="bg-zinc-800 px-8 py-10 relative mt-[15vh] max-w-xl rounded-lg mx-auto flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold text-center">{isLogin ? "Entrar" : "Cadastrar-se"}</h2>

      {!isLogin ? (
        <div className="h-8 mt-10 relative self-start w-full"> 
          <input 
            type="text" 
            onChange={(e) => setName(e.target.value)} 
            required
            value={name}
            name="name"
            className="peer w-full absolute top-0 bg-transparent p-2 border-black rounded-md outline-none focus:border-brand-500"
          />
          <label className={`top-[1px] left-[1px] p-2 inline-block transition-all pointer-events-none peer-focus:translate-x-[-7px] 
            peer-focus:-translate-y-8 peer-focus:text-xs peer-focus:text-brand-500 peer-valid:translate-x-[-7px] peer-valid:-translate-y-8 
            peer-valid:text-xs ${name.length ? "peer-invalid:translate-x-[-7px] peer-invalid:-translate-y-8 peer-invalid:text-xs peer-invalid:text-red-400" : ''}`}>
            Name 
          </label>
        </div>
      ) : null}

      <div className="h-8 mt-10 relative self-start w-full"> 
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          required
          value={email}
          name="email"
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
          value={password}
          name="password"
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
