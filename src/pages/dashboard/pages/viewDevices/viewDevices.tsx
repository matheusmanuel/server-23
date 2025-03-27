import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import "./viewDevices.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Device from "../../../../interfaces/device";

export default function ViewDevices() {
  const { deviceId } = useParams();

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

  const goHome = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    window.electron
      .getDevice(deviceId as string)
      .then((response: Device) => {
        setFormDevice(response);
        console.log(response);
      })
      .catch((error: Error) => {
        console.error("houve um erro ao buscar os dados dos device: ", error);
      });
  }, [deviceId]);

  return (
    <main className="container mx-auto px-[3%] mt-8">
      <div className="cursor-pointer" onClick={goHome}>
        <i className="pi pi-chevron-left" />
      </div>

      <h2 className="text-2xl font-semibold">Informações do dispositivo do: {formDevice.name} </h2>
      <p className="text-sm text-neutral-700 mt-2">
        Visualize as informações do <strong>{formDevice.model}</strong> do{" "}
        <strong>{formDevice.name}</strong>
      </p>

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
              name="email"
              value={formDevice.email}
              required
              placeholder="matheusmanuel@gmail.com"
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
              value={formDevice.imei}
              maxLength={16}
              placeholder="3548373738397466"
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
              type="number"
              required
              maxLength={16}
              name="serial"
              value={formDevice.serial}
              placeholder="NHDKHPMDB"
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
            rows={400}
          ></InputTextarea>
        </div>

        <div className="flex items-center justify-end mb-10">
          <Button
            onClick={goHome}
            className="w-full md:w-fit text-center btn-save-device"
          >
            Voltar
          </Button>
        </div>
      </div>
    </main>
  );
}
