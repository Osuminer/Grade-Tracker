const { app, BrowserWindow } = require("electron");

function createWindow() {
  // Create the main browser window
  const mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
  });

  // mainWindow.removeMenu()

  // Load the main HTML file (index.html)
  mainWindow.loadFile("src/index/index.html");

  // Open the DevTools for debugging
//   mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
