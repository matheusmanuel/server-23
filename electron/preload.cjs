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
  // insertMantra: (mantra) => ipcRenderer.invoke('insert-mantra', mantra),
  editDevice: (device) => ipcRenderer.invoke('edit-device', device),
  deleteDevice: (id) => ipcRenderer.invoke('delete-device', id),
  getDevice: (deviceId) => ipcRenderer.invoke('get-device', deviceId),
  // updateVisibleMantra: (mantraData) => ipcRenderer.invoke('update-visible-mantra', mantraData), 
  // sendNotification: (title, body) => ipcRenderer.send('notify', { title, body })
});