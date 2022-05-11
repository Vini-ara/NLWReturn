import { SignOut } from "phosphor-react";

interface HeaderProps {
  changeIsLogin: (state: boolean) => void;
  user: {
    name: string; 
    email: string;
    role: string;
  } | null;
  clearUser: (state: HeaderProps["user"] | null) => void;
}

export function Header({ changeIsLogin, user, clearUser }: HeaderProps) {
  function handleSignOut() {
    localStorage.removeItem('token');
    clearUser(null)
  }

  return (
    <div className="h-16 px-10 min-w-full flex items-center justify-between bg-zinc-800"> 
      <h1 className="text-lg font-bold text-zinc-300 hover:brightness-125 cursor-pointer"> 
        Feedbacks NLW
      </h1>

      <div className="text-md font-bold flex gap-2 items-center">
        { !user?.name ? (
          <>
            <button 
              onClick={() => changeIsLogin(true)}
              className="bg-brand-500 py-1 px-3 mr-4 rounded-md hover:bg-brand-300 transition-colors"
            >
              Entrar
            </button>
            <button 
              onClick={() => changeIsLogin(false)}
              className="bg-transparent py-1 px-3 rounded-md hover:bg-zinc-600 transition-colors"
            >
              Cadastre-se
            </button>
          </>
        ) : (
          <>
            <p> 
              {user?.name} 
            </p> 
            <button onClick={handleSignOut}>
              <SignOut size={32}/>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
 
