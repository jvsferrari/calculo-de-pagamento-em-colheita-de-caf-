const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 350,            // Tamanho inicial
    height: 700,           // Altura inicial

    // LIMITES DE FLEXIBILIDADE
    minWidth: 300,         // Não deixa encolher mais que isso
    maxWidth: 500,         // Não deixa esticar mais que isso (evita botões gigantes)
  minHeight: 500,        // Altura mínima
  icon: path.join(__dirname, 'assets/icon.png'),
  resizable: true,       // AGORA ESTÁ FLEXÍVEL! O usuário pode puxar as bordas
  autoHideMenuBar: true,
  webPreferences: {
    nodeIntegration: true
  }
  });

  win.loadFile('index.html');
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
