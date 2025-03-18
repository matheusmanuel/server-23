interface Device {
  name: string;
  email: string;
  password: string;
  imei: string;
  serial: string;
  code: string;
  model: string;
  number: string;
  description?: string;
  id?: string;
}

export default Device;