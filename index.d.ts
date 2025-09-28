export interface LoggerOptions {
  time?: boolean;
  emoji?: boolean;
  level?: 'debug' | 'info' | 'success' | 'warn' | 'error';
  file?: boolean;
  customLevels?: Record<string, { color: string; emoji: string }>;
}

export interface Logger {
  log: Record<string, Record<string, (message: string) => void>>;
  bigLog: (level: string, color: string, message: string) => void;
}

export function createLogger(options?: LoggerOptions): Logger;
