const { app, BrowserWindow } = require('electron');
const path = require('node:path');

// Funktion, die das Anwendungsfenster erstellt und lädt.
const createWindow = () => {
  // Erstellt das Browser-Fenster.
  const win = new BrowserWindow({
    width: 820,
    height: 880,
    icon: path.join(__dirname, 'assets/icon.ico'),
    webPreferences: {
      // Diese Zeile ist wichtig, sie verweist auf unsere ECHTE preload.js
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Lädt die index.html aus Ihrem 'dist'-Ordner.
  win.loadFile(path.join(__dirname, 'dist/index.html'));

  // Sicherheitsmechanismus: Wenn das Fenster geschlossen wird, wird die App beendet.
  win.on('closed', () => {
    app.quit();
  });
};

// Diese Methode wird aufgerufen, wenn Electron mit der Initialisierung fertig ist.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // Für macOS: Erstellt ein neues Fenster, wenn keine offen sind.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Beendet die App, wenn alle Fenster geschlossen sind (außer auf macOS).
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});