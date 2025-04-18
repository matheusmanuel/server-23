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
      .then((response: Device[]) => {
        setDevices(response);
      })
      .catch((error: Error) => {
        console.error("Erro ao buscar todos os devices: ", error);
      });
  }, []);

  type RowDataType = {
    id: string | number; // Defina o tipo correto do ID, dependendo do que você usa
    // Adicione outras propriedades conforme necessário
  };
  
  // type ColumnType = {
  //   field: string;
  //   header: string;
  //   // Adicione outras propriedades, dependendo da estrutura da sua coluna
  // };

  // column: ColumnType
  function actionTemplate(rowData: RowDataType) {
    return (
      <div className="gap-2 flex">
        <Button
          type="button"
          icon="pi pi-pencil"
          severity="warning"
          onClick={() => {
            navigate(`/dashboard/edit/${rowData.id}`);
          }}
        />
        <Button
          type="button"
          icon="pi pi-trash"
          severity="danger"
          onClick={() => {
            navigate(`/dashboard/delete/${rowData.id}`);
          }}
        />
        <Button
          type="button"
          icon="pi pi-eye"
          severity="secondary"
          onClick={() => {
            navigate(`/dashboard/view/${rowData.id}`);
          }}
        />
      </div>
    );
  }

  useEffect(() => {
    window.electron
      .searchDevices(keyword)
      .then((response: Device[]) => {
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
              navigate("/dashboard/new");
            }}
            label="Adicionar Dispositivo"
            icon="pi pi-plus"
            className="p-button-success"
          />
        </div>
        <div className="flex justify-between mb-4">
          <span className="p-input-icon-left relative w-full">
            <div className="absolute top-[50%] -translate-y-[50%] left-[15px]">
              <i className="pi pi-search" />
            </div>
            <InputText
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Buscar..."
              className="search-input w-full"
            />
          </span>
        </div>
        <DataTable
          value={devices}
          paginator
          rows={10}
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
          <Column body={actionTemplate} header="Acções" />
        </DataTable>
      </div>
    </>
  );
}