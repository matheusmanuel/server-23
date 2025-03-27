import { useEffect, useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "./deleteDevice.css";
import { useNavigate, useParams } from "react-router-dom";
import Device from "../../../../../../interfaces/device";
import toast from "react-hot-toast";

export default function DeleteDevice() {
  const {deviceId} = useParams();
  const [Device, setDevice] = useState<Device | null>();
  const navigate = useNavigate();

  useEffect(()=>{
    window.electron.getDevice(deviceId as string).then((response)=>{
      setDevice(response);
    }).catch((error: Error)=>{
      console.error("Erro ao Buscar o device: ", error);
    })
  }, [deviceId]);

  const accept = () => {
    window.electron
      .deleteDevice(Device?.id as string)
      .then(() => {
        showSuccess();
      })
      .catch((error: Error) => {
        console.error(`Erro ao deletar o device: `, error);
      });

    navigate("/dashboard");
  };

  const showSuccess = () => {
    toast.success("Dispositivo deletado com sucesso!");
  };

  const reject = () => {
    navigate(`/dashboard`);
    // toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  };
  
  confirmDialog({
    message: "Você deseja excluir este registro? Esse acção é Irreversível",
    header: "Você tem certeza?",
    icon: "pi pi-info-circle",
    defaultFocus: "accept",
    acceptClassName: "btn-acept p-button-danger",
    rejectClassName: "p-button-primary",
    accept,
    reject,
  });

  return (
    <>
      {/* <Toast ref={toast} /> */}
      <ConfirmDialog />
    </>
  );
}
