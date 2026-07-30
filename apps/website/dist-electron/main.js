import { app, BrowserWindow, shell } from 'electron';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const isDev = !app.isPackaged;
let mainWindow = null;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 900,
        minHeight: 600,
        title: 'Tesle',
        titleBarStyle: 'hiddenInset',
        trafficLightPosition: { x: 16, y: 16 },
        backgroundColor: '#ffffff',
        webPreferences: {
            preload: join(__dirname, 'preload.mjs'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true,
        },
        show: false,
        icon: join(__dirname, '../public/pwa-512.png'),
    });
    mainWindow.once('ready-to-show', () => {
        mainWindow?.show();
    });
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
    if (isDev) {
        const loadDev = () => {
            mainWindow?.loadURL('http://localhost:5173')
                .catch(() => setTimeout(loadDev, 1000));
        };
        loadDev();
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
    else {
        mainWindow.loadFile(join(__dirname, '../dist/index.html'));
    }
}
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
