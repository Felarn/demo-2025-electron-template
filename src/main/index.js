import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/logo.png?asset';

import connectDB from './db';
import { console } from 'inspector';
import { text } from 'stream/consumers';


async function sendParthners(e) {
  try {
    const partners = await global.dbclient.query(
      `SELECT 
        partn.id, partn.name, partn.type, partn.director, partn.email, partn.phone, partn.address, partn.tin, partn.rating, 
        coalesce(sum(prod.product_quantity),0) AS total_sold 
      FROM 
        partners as partn 
      LEFT OUTER JOIN 
        partner_products AS prod 
      ON 
        partn.id=prod.partner_id 
      GROUP BY partn.id 
      ORDER BY partn.id;`
    );

    const partnersWithDiscount = partners.rows.map((partner) => {
      if (partner.total_sold > 3e5) {
        partner.discount = 15;
      } else if (partner.total_sold > 5e4) {
        partner.discount = 10;
      } else if (partner.total_sold > 1e4) {
        partner.discount = 5;
      } else {
        partner.discount = 0;
      }
      return partner;
    });
    return partnersWithDiscount;
  } catch (e) {
    dialog.showErrorBox(
      'Ошибка при попытке получить список партнеров: ',
      e.stack
    );
  }
}
async function editPartner(e, partner) {
  const { id, name, type, director, email, phone, address, tin, rating } =
    partner;
  try {
    const partners = await global.dbclient.query(
      `UPDATE partners 
        SET 
          name=$1, type=$2, director=$3, email=$4, 
          phone=$5, address=$6, tin=$7, rating=$8
        WHERE id=$9;`,
      [name, type, director, email, phone, address, tin, rating, id]
    );
    dialog.showMessageBox({
      message: `Информация о партнере "${partner.name}" успешно изменена`,
    });
  } catch (e) {
    dialog.showErrorBox(
      'Ошибка при попытке изменить информацию о партнере: ',
      e.stack
    );
  }
}
async function addPartner(e, partner) {
  const { id, name, type, director, email, phone, address, tin, rating } =
    partner;
  try {
    const partners = await global.dbclient.query(
      `INSERT INTO 
      partners (name, type, director, email, phone, address, tin, rating)  
        VALUES ($1, $2,  $3,  $4,  $5,  $6,  $7,  $8);`,
      [name, type, director, email, phone, address, tin, rating]
    );
    dialog.showMessageBox({
      message: `Партнер "${partner.name}" успешно добавлен`,
    });
  } catch (e) {
    dialog.showErrorBox(
      'Ошибка при попытке добавить нового партнера: ',
      e.stack
    );
  }
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 900,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : { icon }),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });
  console.log('=== STARTED ===');
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron');

  global.dbclient = await connectDB();
  ipcMain.handle('getAllPartners', sendParthners);
  ipcMain.handle('addPartner', addPartner);
  ipcMain.handle('editPartner', editPartner);

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    console.log('=== STOPPED ===');
  }
});
