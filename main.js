const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    win.loadFile('index.html');
}

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open Camera',
                click: () => {
                    const cameraWindow = new BrowserWindow({
                        width: 400,
                        height: 300,
                        webPreferences: {
                            contextIsolation: false,
                            nodeIntegration: true
                        }
                    });
                    cameraWindow.loadFile('camera.html');
                }
            },
            { role: 'quit' }
        ]
    }
];

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
