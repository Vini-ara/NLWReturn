export function Header() {
  return (
    <div className="h-16 px-10 min-w-full flex items-center justify-between bg-zinc-800"> 
      <h1 className="text-lg font-bold text-zinc-300 hover:brightness-125 cursor-pointer"> 
        Feedbacks NLW
      </h1>

      <div className="text-md font-bold">
        <button className="bg-brand-500 py-1 px-3 mr-4 rounded-md hover:bg-brand-300 transition-colors">
          Entrar
        </button>
        <button className="bg-transparent py-1 px-3 rounded-md hover:bg-zinc-600 transition-colors">
          Cadastre-se
        </button>
      </div>
    </div>
  );
}
 
