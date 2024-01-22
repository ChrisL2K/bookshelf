const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800, height: 600,
        minWidth: 600, minHeight: 450,
        autoHideMenuBar: true,
        webPreferences: { nodeIntegration: true }
    });

    window.loadFile(path.join(__dirname, "src/html", "index.html"));
}

app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== 'darwin') app.quit();
})