/* eslint-disable no-undef */
const { app, BrowserWindow, Tray, Menu, session  } = require("electron");
const path = require("path");
const isDev = process.env.IS_DEV == "true" ? true : false;
const { initIPC, db } = require("./ipcHandlers.cjs");
const { dialog } = require("electron");

let mainWindow;
let tray;

function createWindow() {
  initIPC();
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 610,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, "../logo.ico"),
  });
  mainWindow.maximize();

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, "../dist/index.html")}`);
    // addInSheelApps();
  }

  mainWindow.on("close", (event) => {
    const choice = dialog.showMessageBoxSync(mainWindow, {
      type: "question",
      buttons: ["Sim", "Não"],
      defaultId: 1,
      title: "Confirmação",
      message: "Tem certeza que deseja sair?",
    });
  
    if (choice === 1) {
      event.preventDefault();
    } else {
      if (db) db.close();
      app.quit();
    }
  });
}

app.on("ready", () => {
  createWindow();

});

app.on("window-all-closed", function () {
  if (db) db.close();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});