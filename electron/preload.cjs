window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  createDevices: (device) => ipcRenderer.invoke('create-device', device),
  getAllDevices: () => ipcRenderer.invoke('get-devices'),
  searchDevices: (keyword) => ipcRenderer.invoke('search-devices', keyword),
  editDevice: (device) => ipcRenderer.invoke('edit-device', device),
  deleteDevice: (id) => ipcRenderer.invoke('delete-device', id),
  getDevice: (deviceId) => ipcRenderer.invoke('get-device', deviceId),
  imeiExists: (imei, id) => ipcRenderer.invoke('imei-exists', imei, id),
  serialExists: (serial, id) => ipcRenderer.invoke('serial-exists', serial, id),
  login: (user) => ipcRenderer.invoke('login', user)
});