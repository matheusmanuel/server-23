import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import "./editDevices.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Device from "../../../../interfaces/device";
import toast from "react-hot-toast";

export default function EditDevices() {
  const { deviceId } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<Device>({});

  const handleReverter = () => {
    setFormDevice(initialData);
  };

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

  const [errors, setErrors] = useState<Device>({});
  const newErrors: Device = {};

  const validateForm = async () => {
    if (!formDevice.name)
      newErrors.name = "O nome do proprietário é obrigatório.";
    if (!formDevice.email)
      newErrors.email = "O email do proprietário é obrigatório.";
    if (!formDevice.password) newErrors.password = "A senha é obrigatória.";
    if (!formDevice.imei) newErrors.imei = "O IMEI é obrigatório.";
    if (!formDevice.code) newErrors.code = "O código é obrigatório.";
    if (!formDevice.number) newErrors.number = "O número é obrigatório.";
    if (!formDevice.serial)
      newErrors.serial = "O número de série é obrigatório.";
    if (!formDevice.model) newErrors.model = "O modelo é obrigatório.";

    if (formDevice.imei && formDevice.imei.toLowerCase() != "null") {
      try {
        const exists = await window.electron.imeiExists(
          formDevice.imei,
          formDevice.id as number
        );
        if (exists) {
          newErrors.imei = "Este IMEI já está cadastrado.";
        }
      } catch (error) {
        console.error("Erro ao verificar IMEI:", error);
      }
    }

    if (formDevice.serial && formDevice.serial.toLowerCase() != "null") {
      try {
        const exists = await window.electron.serialExists(
          formDevice.serial,
          formDevice.id as number
        );
        if (exists) {
          newErrors.serial = "Este número de série já está cadastrado.";
        }
      } catch (error) {
        console.error("Erro ao verificar Serial:", error);
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length == 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormDevice({ ...formDevice, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const goHome = () => {
    navigate("/dashboard");
  };

  const handleSubmit = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    window.electron
      .editDevice(formDevice)
      .then(() => {
        showSuccess();
        goHome();
      })
      .catch((error: Error) => {
        console.error("Erro ao editar um dispositivo: ", error);
        toast.error("Houve um erro ao editar um dispositivo");
      });
  };

  const showSuccess = () => {
    toast.success("Dispositivo editado com sucesso!");
  };

  useEffect(() => {
    window.electron
      .getDevice(deviceId as string)
      .then((response) => {
        setFormDevice(response);
        setInitialData(response);
      })
      .catch((error: Error) => {
        console.error("Erro ao buscar um dispositivo: ", error);
      });
  }, [deviceId]);

  return (
    <main className="container mx-auto px-[3%] mt-8">
      <div className="cursor-pointer" onClick={goHome}>
        <i className="pi pi-chevron-left" />
      </div>

      <h2 className="text-2xl font-semibold">
        Editar Dispositivo: {formDevice.model}
      </h2>
      <p className="text-sm text-neutral-700">
        Editar o {formDevice.model} do {formDevice.name}
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
              onChange={handleChange}
              placeholder="Matheus Manuel"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
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
              placeholder="matheusmanuel@gmail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
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
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
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
              placeholder="3548373738397466"
            />
            {errors.imei && (
              <p className="text-red-500 text-sm">{errors.imei}</p>
            )}
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
              placeholder="NHDKHPMDB"
            />
            {errors.serial && (
              <p className="text-red-500 text-sm">{errors.serial}</p>
            )}
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
            {errors.code && (
              <p className="text-red-500 text-sm">{errors.code}</p>
            )}
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
            {errors.number && (
              <p className="text-red-500 text-sm">{errors.number}</p>
            )}
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
            {errors.model && (
              <p className="text-red-500 text-sm">{errors.model}</p>
            )}
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
          <div className="mr-4" onClick={handleReverter}>
            <Button severity="secondary">Reverter alerações</Button>
          </div>
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
