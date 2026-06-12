import { app, BrowserWindow } from "electron";
import path from "node:path";

function createWindow(): void {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    backgroundColor: "#000000",
    webPreferences: {
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(import.meta.dirname, "index.html"));
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
