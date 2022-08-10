import { Channels } from 'main/preload';
import {TTask} from "../main/watcher/types";

declare global {
  interface Window {
    api: {
      getTasks(): Promise<TTask[]>;
    };
  }
}

export {};
