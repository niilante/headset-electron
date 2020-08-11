const { Menu } = require('electron');
const logger = require('./headsetLogger');

function executeTrayCommand(win, key) {
  logger.tray(`Executing ${key} command from tray`);
  win.webContents.send('media', key);
}

module.exports = (tray, win, player) => {
  logger.tray('Setting tray');

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Minimize',
      click: () => {
        logger.tray('Minimizing to tray');
        win.isVisible() ? win.hide() : win.show();
        player.isVisible() ? player.hide() : player.show();
      },
    },
    { type: 'separator' },
    { label: 'Play/Pause', click: () => { executeTrayCommand(win, 'play-pause'); } },
    { label: 'Next', click: () => { executeTrayCommand(win, 'play-next'); } },
    { label: 'Previous', click: () => { executeTrayCommand(win, 'play-previous'); } },
    { type: 'separator' },
    { label: 'Like', click: () => { executeTrayCommand(win, 'like'); } },
    { type: 'separator' },
    { label: 'Exit', role: 'quit' },
  ]);

  tray.setToolTip('Headset');
  tray.setContextMenu(contextMenu);
};
