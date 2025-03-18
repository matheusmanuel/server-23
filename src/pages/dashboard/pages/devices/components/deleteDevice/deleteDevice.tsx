import React, { useEffect, useRef, useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import "./deleteDevice.css";
import { useNavigate, useParams } from "react-router-dom";
import Device from "../../../../../../interfaces/device";

export default function DeleteDevice() {
  const {deviceId} = useParams();
  console.log('DEvice id: ', deviceId);
  const [Device, setDevice] = useState<Device | null>();
  const navigate = useNavigate();

  useEffect(()=>{
    window.electron.getDevice(deviceId).then((response: any)=>{
      setDevice(response);
    }).catch((error: Error)=>{
      console.error("Erro ao Buscar o device: ", error);
    })
  }, [deviceId]);

  const toast = useRef<Toast>(null);

  const accept = () => {
    window.electron
      .deleteDevice(Device.id)
      .then((response) => {
        console.log("status deleted: ", response);
      })
      .catch((error: Error) => {
        console.error(`Erro ao deletar o device: `, error);
      });

    toast.current?.show({
      severity: "success",
      summary: "Sucesso",
      detail: "Dispositivo Eliminado com sucesso!",
      life: 3000,
    });

    navigate("/");
  };

  const reject = () => {
    navigate(`/`);
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
      <Toast ref={toast} />
      <ConfirmDialog />
    </>
  );
}
