const { ipcMain, inAppPurchase } = require("electron");
const makeConnection = require("../db/db.cjs"); // Importa a conexão SQLite
let db;

const initIPC = () => {
  db = makeConnection(); // Abre a conexão com o banco de dados

  // 📌 Criar um novo dispositivo
  ipcMain.handle("create-device", async (event, device) => {
    return new Promise((resolve, reject) => {
      const query = `
      INSERT INTO apple_devices (name, email, password, imei, serial, code, number, model, description) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

      db.run(
        query,
        [
          device.name,
          device.email,
          device.password,
          device.imei,
          device.serial,
          device.code,
          device.number,
          device.model,
          device.description || "",
        ],
        function (err) {
          if (err) {
            console.error("Erro ao criar dispositivo:", err);
            reject(err);
          } else {
            resolve({ id: this.lastID, ...device });
          }
        }
      );
    });
  });

  // 📌 Listar todos os dispositivos
  ipcMain.handle("get-devices", async () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM apple_devices", (err, rows) => {
        if (err) {
          console.error("Erro ao buscar dispositivos:", err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });

  ipcMain.handle('imei-exists', async (event, imei, id) => {
    return new Promise((resolve, reject) => {
      const query = id
        ? "SELECT * FROM apple_devices WHERE imei = ? AND id != ?"
        : "SELECT * FROM apple_devices WHERE imei = ?";
      const params = id ? [imei, id] : [imei];

      db.get(query, params, (err, row) => {
        if (err) {
          console.error("Erro ao verificar o IMEI: ", err);
          reject(err);
        } else {
          resolve(!!row); // Retorna true se encontrar outro device com o IMEI
        }
      });
    });
  });

  ipcMain.handle('serial-exists', async (event, serial, id) => {
    return new Promise((resolve, reject) => {
      const query = id
        ? "SELECT * FROM apple_devices WHERE serial = ? AND id != ?"
        : "SELECT * FROM apple_devices WHERE serial = ?";
      const params = id ? [serial, id] : [serial];

      db.get(query, params, (err, row) => {
        if (err) {
          console.error("Erro ao verificar o Serial: ", err);
          reject(err);
        } else {
          resolve(!!row); // Retorna true se encontrar outro device com o Serial
        }
      });
    });
  });


  // Listar dados de um dispositivo
  ipcMain.handle("get-device", async (event, deviceId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM apple_devices WHERE id = ?`;

      db.get(query, [
        deviceId
      ],
        function (err, row) {
          if (err) {
            console.error("Erro ao atualizar dispositivo:", err);
            reject(err);
          } else {
            resolve(row);
          }
        })
    })
  })

  // 📌 Atualizar um dispositivo
  ipcMain.handle("edit-device", async (event, device) => {
    return new Promise((resolve, reject) => {
      const query = `
      UPDATE apple_devices 
      SET name = ?, email = ?, password = ?, imei = ?, serial = ?, code = ?, number = ?, model = ?, description = ? 
      WHERE id = ?
    `;

      db.run(
        query,
        [
          device.name,
          device.email,
          device.password,
          device.imei,
          device.serial,
          device.code,
          device.number,
          device.model,
          device.description || "",
          device.id,
        ],
        function (err) {
          if (err) {
            console.error("Erro ao atualizar dispositivo:", err);
            reject(err);
          } else {
            console.log("Dispositivo atualizado com ID:", device.id);
            resolve({ success: true });
          }
        }
      );
    });
  });

  // 📌 Deletar um dispositivo
  ipcMain.handle("delete-device", async (event, id) => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM apple_devices WHERE id = ?", [id], function (err) {
        if (err) {
          console.error("Erro ao deletar dispositivo:", err);
          reject(err);
        } else {
          console.log("Dispositivo deletado com ID:", id);
          resolve({ success: true });
        }
      });
    });
  });

  // Login
  ipcMain.handle("login", async (event, user) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE email = ? AND senha = ?", [user.email, user.passWord], (err, row) => {
        if (err) {
          console.error("Erro ao fazer o login, ", err);
          reject(err);
        } else {
          resolve(!!row); //Retorna true caso encontrar um usuario com as credencias certas.
        }
      })
    })
  })
  ipcMain.handle("search-devices", async (event, keyword) => {
    return new Promise((resolve, reject) => {
      const searchQuery = `%${keyword}%`;

      const query = `
      SELECT * FROM apple_devices 
      WHERE 
        name LIKE ? OR 
        email LIKE ? OR 
        password LIKE ? OR 
        imei LIKE ? OR 
        serial LIKE ? OR 
        code LIKE ? OR 
        number LIKE ? OR 
        model LIKE ?
    `;

      db.all(
        query,
        [searchQuery, searchQuery, searchQuery, searchQuery, searchQuery, searchQuery, searchQuery, searchQuery],
        (err, rows) => {
          if (err) {
            console.error("Erro na pesquisa:", err);
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  });
}


module.exports = { initIPC, db };