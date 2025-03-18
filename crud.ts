const { ipcRenderer } = require("electron");

// Criar um novo dispositivo
async function addDevice(device) {
  const result = await ipcRenderer.invoke("create-device", device);
  console.log("Dispositivo criado:", result);
}

// Buscar todos os dispositivos
async function fetchDevices() {
  const devices = await ipcRenderer.invoke("get-devices");
  console.log("Lista de dispositivos:", devices);
}

// Atualizar um dispositivo
async function updateDevice(device) {
  const result = await ipcRenderer.invoke("update-device", device);
  console.log("Atualização feita:", result);
}

// Deletar um dispositivo
async function deleteDevice(id) {
  const result = await ipcRenderer.invoke("delete-device", id);
  console.log("Dispositivo deletado:", result);
}
