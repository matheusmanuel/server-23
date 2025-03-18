import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import "./newDevices.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Device from "../../../../interfaces/device";

export default function NewDevices() {
  const navigate = useNavigate();
  const [formDevice, setFormDevice] = useState<Device>({
    name: "",
    email: "",
    password: "",
    imei: "",
    code: "",
    number: "",
    serial: "",
    description: "",
    model: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormDevice({ ...formDevice, [name]: value });
  };

  const goHome = () => {
    navigate("/");
  };

  const handleSubmit = async () => {
    console.log("devices: ", formDevice);

    window.electron.createDevices(formDevice).then((response)=>{
      goHome();
    }).catch((error: Error)=>{
      console.error("Erro ao criar um dispositivo: ", error);
    })    
  };

  return (
    <main className="container mx-auto px-[3%] mt-8">
      <div className="cursor-pointer" onClick={goHome}>
        <i className="pi pi-chevron-left" />
      </div>

      <h2 className="text-2xl font-semibold">Adicionar novo Dispositivo</h2>
      <p className="text-sm text-neutral-700">Adicionar um novo Dispositivo</p>

      <div className="mt-3 space-y-3">
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
              name="name"
              value={formDevice.name}
              onChange={handleChange}
              placeholder="Jhon doe"
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
              name="email"
              onChange={handleChange}
              value={formDevice.email}
              required
              placeholder="example@icloud.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Senha
            </label>

            <InputText
              className="w-full mb-2"
              type="text"
              name="password"
              value={formDevice.password}
              required
              onChange={handleChange}
              placeholder="******"
            />
          </div>

          <div>
            <label
              htmlFor="imei"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              IMEI
            </label>

            <InputText
              name="imei"
              className="w-full mb-2"
              type="text"
              required
              onChange={handleChange}
              value={formDevice.imei}
              maxLength={16}
              placeholder="0000000000000"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="serial"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Serial
            </label>

            <InputText
              className="w-full mb-2"
              type="text"
              required
              maxLength={16}
              name="serial"
              onChange={handleChange}
              value={formDevice.serial}
              placeholder="XXXXXXXX"
            />
          </div>

          <div>
            <label
              htmlFor="code"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Código
            </label>

            <InputText
              name="code"
              value={formDevice.code}
              onChange={handleChange}
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
              htmlFor="number"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Número
            </label>

            <InputText
              name="number"
              value={formDevice.number}
              className="w-full mb-2"
              type="text"
              required
              maxLength={16}
              placeholder="952775348"
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="model"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Modelo
            </label>

            <InputText
              name="model"
              value={formDevice.model}
              onChange={handleChange}
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
            name="description"
            value={formDevice.description}
            onChange={handleChange}
            rows={400}
          ></InputTextarea>
        </div>

        <div className="flex items-center justify-end mb-10">
          <Button
            onClick={() => {
              handleSubmit();
            }}
            className="w-full md:w-fit text-center btn-save-device"
          >
            Salvar dispositivo
          </Button>
        </div>
      </div>
    </main>
  );
}
