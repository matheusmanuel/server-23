import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/Datatable";
import { Column } from "primereact/column";
import "./device.css";
import { useNavigate } from "react-router-dom";

export default function DevicesComponent() {
  const [filter, setFilter] = useState("");
  const devices = [
    {
      nome: "Altino",
      email: "altinojoao12@icloud.com",
      senha: "Joaomix2020",
      imei: "3548373738397466",
      serial: "NHDKHPMDB",
      codigo: "226610",
      numero: "+244 934739922",
      modelo: "iPhone 11",
      descricao: "Descrição...",
    },
    {
      nome: "Carlos",
      email: "carlos@email.com",
      senha: "Senha1234",
      imei: "3548373738397467",
      serial: "ABC123XYZ",
      codigo: "226611",
      numero: "+244 923456789",
      modelo: "Samsung S21",
      descricao: "Celular pessoal",
    },
    {
      nome: "Maria",
      email: "maria@email.com",
      senha: "Maria@2023",
      imei: "3548373738397468",
      serial: "XYZ789ABC",
      codigo: "226612",
      numero: "+244 912345678",
      modelo: "iPhone 13",
      descricao: "Celular trabalho",
    },
    {
      nome: "João",
      email: "joao@email.com",
      senha: "JoaoPass2022",
      imei: "3548373738397469",
      serial: "LMN456DEF",
      codigo: "226613",
      numero: "+244 911223344",
      modelo: "Xiaomi Mi 11",
      descricao: "Dispositivo secundário",
    },
    {
      nome: "Ana",
      email: "ana@email.com",
      senha: "Ana@4567",
      imei: "3548373738397470",
      serial: "PQR654GHI",
      codigo: "226614",
      numero: "+244 955667788",
      modelo: "Google Pixel 6",
      descricao: "Celular principal",
    },
    {
      nome: "Pedro",
      email: "pedro@email.com",
      senha: "Pedro789",
      imei: "3548373738397471",
      serial: "STU987JKL",
      codigo: "226615",
      numero: "+244 922334455",
      modelo: "OnePlus 9",
      descricao: "Celular reserva",
    },
    {
      nome: "Beatriz",
      email: "beatriz@email.com",
      senha: "BeaSecure",
      imei: "3548373738397472",
      serial: "VWX654MNO",
      codigo: "226616",
      numero: "+244 933445566",
      modelo: "Huawei P50",
      descricao: "Celular de teste",
    },
    {
      nome: "Ricardo",
      email: "ricardo@email.com",
      senha: "Ric@2021",
      imei: "3548373738397473",
      serial: "YZA123BCD",
      codigo: "226617",
      numero: "+244 944556677",
      modelo: "Motorola Edge 20",
      descricao: "Celular alternativo",
    },
    {
      nome: "Luísa",
      email: "luisa@email.com",
      senha: "Luisa9876",
      imei: "3548373738397474",
      serial: "EFG345HIJ",
      codigo: "226618",
      numero: "+244 955667788",
      modelo: "Sony Xperia 5",
      descricao: "Celular de backup",
    },
    {
      nome: "Fábio",
      email: "fabio@email.com",
      senha: "FabioPass",
      imei: "3548373738397475",
      serial: "KLM678NOP",
      codigo: "226619",
      numero: "+244 966778899",
      modelo: "Asus ROG Phone 5",
      descricao: "Celular gamer",
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen container mx-auto px-[3%]">
        <div className="flex md:items-center justify-between mt-8 flex-col md:flex-row mb-6">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold">
              Filipe - Lista de Dispositivos
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
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
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
          <Column field="nome" header="Nome" sortable></Column>
          <Column field="email" header="E-mail" sortable></Column>
          {/* <Column field="senha" header="Senha" sortable></Column> */}
          <Column field="imei" header="IMEI" sortable></Column>
          <Column field="serial" header="Serial" sortable></Column>
          {/* <Column field="codigo" header="Código" sortable></Column> */}
          <Column field="numero" header="Número" sortable></Column>
          <Column field="modelo" header="Modelo" sortable></Column>
          {/* <Column field="descricao" header="Descrição" sortable></Column> */}
          <Column field="actions" header="Acções">
          </Column>
        </DataTable>
      </div>
    </>
  );
}
