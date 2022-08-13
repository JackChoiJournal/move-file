import { Channels } from 'main/preload';
import {DirectoryTree, TTask} from "../@types/types";

declare global {
  interface Window {
    api: {
      getTasks(): Promise<TTask[]>;
      getDrives(): Promise<string[]>;
      getDirectories(drive: string): Promise<string[]>;
    };
  }
}

export {};
