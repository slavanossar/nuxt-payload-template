import type { Client, ClientOptions } from 'graphql-ws';
export interface RestartableClient extends Client {
    restart(): void;
}
export default function createRestartableClient(options: ClientOptions): RestartableClient;
