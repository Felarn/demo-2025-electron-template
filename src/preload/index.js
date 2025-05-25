import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  poke: (msg) => ipcRenderer.invoke('poke', msg),
  getAllPartners: () => ipcRenderer.invoke('getAllPartners'),
  addPartner: (partner) => ipcRenderer.invoke('addPartner', partner),
  editPartner: (partner) => ipcRenderer.invoke('editPartner', partner)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
