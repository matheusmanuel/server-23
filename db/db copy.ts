import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.IS_DEV == "true";
const pathFileDB = isDev
  ? path.join(__dirname, "db_mantras.db")
  : path.join(process.resourcesPath, "db_mantras.db");
  
function makeConnection() {
  if (fs.existsSync(pathFileDB)) {
    return new sqlite.Database(pathFileDB);
  } else {
    console.log("Banco de dados criado:", pathFileDB);

    const db = new sqlite.Database(pathFileDB, (error) => {
      if (error) {
        console.error("Erro na criação do banco:", error);
        return;
      }
      createTablesInDatabase(db);
    });

    return db;
  }
}

function createTablesInDatabase(db: sqlite3.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(255) UNIQUE NOT NULL,
      senha VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS apple_devices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      senha VARCHAR(255) NOT NULL,
      imei VARCHAR(50) UNIQUE NOT NULL,
      serial VARCHAR(50) UNIQUE NOT NULL,
      codigo VARCHAR(20) NOT NULL,
      numero VARCHAR(20) NOT NULL,
      modelo VARCHAR(50) NOT NULL,
      descricao TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `, (err) => {
    if (err) {
      console.error("Erro ao criar tabelas:", err);
    } else {
      console.log("Tabelas criadas com sucesso!");
    }
  });

  db.run(
    `INSERT INTO users (email, senha) VALUES (?, ?)`,
    ["admin@devicebook.com", "SenhaSegura123"],
    (err) => {
      if (err) {
        console.error("Erro ao inserir usuário admin:", err);
      } else {
        console.log("Usuário admin criado com sucesso!");
      }
    }
  );
}

export default makeConnection;