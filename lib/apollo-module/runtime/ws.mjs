import { createClient } from "graphql-ws";
export default function createRestartableClient(options) {
  let restartRequested = false;
  let restart = () => {
    restartRequested = true;
  };
  const client = createClient({
    ...options,
    on: {
      ...options.on,
      opened: (socket) => {
        options.on?.opened?.(socket);
        restart = () => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.close(4205, "Client Restart");
          } else {
            restartRequested = true;
          }
        };
        if (restartRequested) {
          restartRequested = false;
          restart();
        }
      }
    }
  });
  return {
    ...client,
    restart: () => restart()
  };
}
