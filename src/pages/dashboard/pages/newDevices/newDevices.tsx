import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import "./newDevices.css";
import { useNavigate } from "react-router-dom";

export default function NewDevices() {

    const navigate = useNavigate();

    const goHome = ()=>{
        navigate('/');
    }

  return (
    <main className="container mx-auto px-[3%] mt-8">
      
      <div className="cursor-pointer" onClick={goHome}>
        <i className="pi pi-chevron-left" />
      </div>

      <h2 className="text-2xl font-semibold">Adicionar novo Dispositivo</h2>
      <p className="text-sm text-neutral-700">Adicionar um novo Dispositivo</p>

      <form action="" className="mt-3 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nome do proprietário
            </label>

            <InputText
              className="w-full mb-2"
              type="text"
              required
              placeholder="Matheus Manuel"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email do proprietário
            </label>

            <InputText
              className="w-full mb-2"
              type="email"
              required
              placeholder="matheusmanuel@gmail.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Senha
            </label>

            <InputText
              className="w-full mb-2"
              type="text"
              required
              placeholder="******"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              IMEI
            </label>

            <InputText
              className="w-full mb-2"
              type="text"
              required
              maxLength={16}
              placeholder="3548373738397466"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Serial
            </label>

            <InputText
              className="w-full mb-2"
              type="text"
              required
              maxLength={16}
              placeholder="NHDKHPMDB"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Código
            </label>

            <InputText
              className="w-full mb-2"
              type="text"
              required
              placeholder="************"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Número
            </label>

            <InputText
              className="w-full mb-2"
              type="text"
              required
              maxLength={16}
              placeholder="952775348"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Modelo
            </label>

            <InputText
              className="w-full mb-2"
              type="text"
              required
              maxLength={16}
              placeholder="Iphone 24 pro"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Descrição
          </label>

          <InputTextarea
            placeholder="Digite aqui a sua descrição"
            className="w-full"
            rows={400}
          ></InputTextarea>
        </div>

        <div className="flex items-center justify-end mb-10">
          <Button className="w-full md:w-fit text-center btn-save-device">
            Salvar dispositivo
          </Button>
        </div>
      </form>
    </main>
  );
}
