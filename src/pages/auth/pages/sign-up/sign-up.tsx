import { InputText } from "primereact/inputtext";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './sign-up.css';
import appleLogo from './apple_logo_black.png';

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [passWord, setPassWord] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void=>{
    e.preventDefault();
    
    window.electron.login({email, passWord}).then((response)=>{
      if(response===true){
        toast.success("Login feito com sucesso");
        navigate('/dashboard');
      }else{
        toast.error("email ou senha incorrectos! Tente novamente");
      }
    }).catch((err: Error)=>{
      console.error('erro ao realizar o login: ', err);
    })
    
  }

  return (
    <main>
      <div>
        {/* <img src={} alt="" /> */}
        <section className={`bg-gray-50 h-full`}>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 relative">
            <img src={appleLogo} alt="Apple logo" className="w-30 absolute left-[48%] opacity-[0.1]" />
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y- md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Faça login na sua conta
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit} >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Seu e-mail
                    </label>

                    <InputText
                      className="w-full mb-2"
                      type="text"
                      required
                      value={email}

                      onChange={(e)=>{
                        setEmail(e.target.value);
                      }}

                      placeholder="seuemail@gmail.com"
                    />

                    {/* input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="seuemail@gmail.com"
                      required
                    /> */}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Senha
                    </label>

                    <InputText
                      className="w-full mb-0"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={passWord}
                      onChange={(e)=>{
                        setPassWord(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="cursor-pointer w-full bg-blue-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Entrar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}