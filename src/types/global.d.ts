import Device from "../interfaces/device";

// export {};

declare global {
  interface Window {
    electron: {
      getDevice: (deviceId: string) => Promise<Device>;
      login: (user: { email: string; passWord: string }) => Promise<boolean>;
      createDevices: (device: Device) => Promise<Device>;
      deleteDevice: (deviceId: string) => Promise<void>;
      getAllDevices: () => Promise<Device[]>;
      searchDevices: (keyword: string) => Promise<Device[]>;
      imeiExists: (imei: string, id: number|null) => Promise<boolean>;
      serialExists: (imei: string, id: number|null) => Promise<boolean>;
      editDevice: (formDevice: Device) => Promise<void>;
      // Adicione outros métodos usados no preload.js
    };
  }
}