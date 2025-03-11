import { InputText } from "primereact/inputtext";

export default function SignUp() {
  return (
    <main>
      <form>
        <section className="bg-gray-50 h-full">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <img
              src="assets/img/logo_h.png"
              className="mb-8 block"
              alt="Logo ..."
            />
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y- md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Faça login na sua conta
                </h1>
                <form className="space-y-4" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Seu e-mail
                    </label>

                    <InputText
                      className="w-full mb-2"
                      type="email"
                      required
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
      </form>
    </main>
  );
}
