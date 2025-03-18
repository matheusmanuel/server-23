import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/Datatable";
import { Column } from "primereact/column";
import "./device.css";
import { useNavigate } from "react-router-dom";
import Device from "../../../../interfaces/device";

export default function DevicesComponent() {
  const [devices, setDevices] = useState<Device[]>([]);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    window.electron
      .getAllDevices()
      .then((response: any) => {
        setDevices(response);
      })
      .catch((error: Error) => {
        console.error("Erro ao buscar todos os devices: ", error);
      });
  }, []);

  function actionTemplate(rowData: any, column) {
    console.log("column", column);
    console.log("rowData", rowData);
    return (
      <div className="gap-2 flex">
        <Button
          type="button"
          icon="pi pi-pencil"
          severity="warning"
          onClick={() => {
            navigate(`/edit/${rowData.id}`);
          }}
        />
        <Button
          type="button"
          icon="pi pi-trash"
          severity="danger"
          onClick={() => {
            navigate(`/delete/${rowData.id}`);
          }}
        />
        <Button
          type="button"
          icon="pi pi-eye"
          severity="secondary"
          onClick={() => {
            navigate(`/view/${rowData.id}`);
          }}
        />
      </div>
    );
  }

  useEffect(() => {
    window.electron
      .searchDevices(keyword)
      .then((response: any) => {
        setDevices(response);
      })
      .catch((error: Error) => {
        console.error("Erro ao buscar todos os devices: ", error);
      });
  }, [keyword]);

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen container mx-auto px-[3%]">
        <div className="flex md:items-center justify-between mt-8 flex-col md:flex-row mb-6">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold">
              Server23 - Todos os dispositivos
            </h1>
            <p>Gerencie todas os dispositivos aqui</p>
          </div>
          <Button
            onClick={() => {
              navigate("/new");
            }}
            label="Adicionar Dispositivo"
            icon="pi pi-plus"
            className="p-button-success"
          />
        </div>
        <div className="flex justify-between mb-4">
          <span className="p-input-icon-left relative">
            <div className="absolute top-[50%] -translate-y-[50%] left-[15px]">
              <i className="pi pi-search" />
            </div>
            <InputText
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Buscar..."
              className="search-input"
            />
          </span>
        </div>
        <DataTable
          value={devices}
          paginator
          rows={5}
          className="p-datatable-gridlines"
        >
          <Column field="name" header="Nome" sortable></Column>
          <Column field="email" header="E-mail" sortable></Column>
          {/* <Column field="senha" header="Senha" sortable></Column> */}
          <Column field="imei" header="IMEI" sortable></Column>
          <Column field="serial" header="Serial" sortable></Column>
          {/* <Column field="codigo" header="Código" sortable></Column> */}
          <Column field="number" header="Número" sortable></Column>
          <Column field="model" header="Modelo" sortable></Column>
          {/* <Column field="descricao" header="Descrição" sortable></Column> */}
          <Column body={actionTemplate.bind(this)} header="Acções" />
        </DataTable>
      </div>
    </>
  );
}
