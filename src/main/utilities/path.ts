import { app } from 'electron';
import path from 'path';

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../../assets');

const LOG_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'logs')
  : path.join(__dirname, '../../../logs');

export const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

export const getLogPath = (...paths: string[]): string => {
  return path.join(LOG_PATH, ...paths);
};