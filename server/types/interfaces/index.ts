export interface Article {
  id: number;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ErrorException extends Error {
  errno?: number;
  statusCode?: number;
  status?: string;
  path?: string;
  syscall?: string;
  stack?: string;
  isOperational?: boolean;
}
