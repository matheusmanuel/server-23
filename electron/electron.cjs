/* eslint-disable no-undef */
const { app, BrowserWindow, Tray, Menu, session  } = require("electron");
const path = require("path");
const isDev = process.env.IS_DEV == "true" ? true : false;
const { initIPC, db } = require("./ipcHandlers.cjs");

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
    // icon: path.join(__dirname, "../logo.ico"),
  });
  // mainWindow.maximize();

//   mainWindow.webContents.setWindowOpenHandler((details) => {
//     shell.openExternal(details.url);
//     return { action: "deny" };
//   });

  mainWindow.loadURL("http://localhost:5173");

//   if (isDev) {
//     mainWindow.webContents.openDevTools();
//     mainWindow.loadURL("http://localhost:5173");
//   } else {
//     mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
//     addInSheelApps();
//   }

  mainWindow.on("close", (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
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