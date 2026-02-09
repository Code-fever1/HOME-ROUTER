const { app, BrowserWindow, session, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // ============================================
  // PHASE 1: CRITICAL SECURITY BYPASS
  // Strip X-Frame-Options headers from ALL routers
  // ============================================
  session.defaultSession.webRequest.onHeadersReceived(
    {
      urls: [
        '*://100.10.10.1/*', 'http://100.10.10.1/*',   // HUAWEI
        '*://10.1.10.1/*', 'http://10.1.10.1/*',       // D-Link
        'http://100.10.10.3:8080/*',   // Tenda 1
        'http://100.10.10.4:8080/*',   // Tenda 2
        '*://100.10.10.2/*', 'http://100.10.10.2/*'    // Camera
      ]
    },
    (details, callback) => {
      const responseHeaders = { ...details.responseHeaders };

      // Delete X-Frame-Options header (case variations)
      delete responseHeaders['x-frame-options'];
      delete responseHeaders['X-Frame-Options'];
      delete responseHeaders['X-FRAME-OPTIONS'];

      // Also remove Content-Security-Policy frame-ancestors if present
      delete responseHeaders['content-security-policy'];
      delete responseHeaders['Content-Security-Policy'];

      console.log('[Router Kawaii] Headers stripped for:', details.url);

      callback({ responseHeaders });
    }
  );

  mainWindow.loadFile('src/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ============================================
// IPC Handlers for Window Controls
// ============================================
ipcMain.on('window-minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window-maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('window-close', () => {
  if (mainWindow) mainWindow.close();
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
