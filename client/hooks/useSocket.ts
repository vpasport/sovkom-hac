import { Socket } from 'socket.io-client';

import { useCallback, useEffect } from 'react';

import { io } from 'socket.io-client';

let socket: Socket | null = null;

const useSocket = () => {
  const initSocket = useCallback(
    (handlers: [{ event: string; handler: (message: any) => void }]) => {
      if (socket === null || socket.disconnected) {
        let _socket: Socket | null = io(
          process.env.NEXT_PUBLIC_API_WS as string,
          {
            reconnectionDelay: 3000,
            transports: ['websocket', 'pooling', 'flashsocket'],
          },
        );

        _socket.on('connect', () => console.info('Socket connected'));
        _socket.on('disconnect', () => {
          console.info('Socket disconnected');
        });

        for (const handler of handlers) {
          _socket.on(handler.event, handler.handler);
        }

        socket = _socket;
      }
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (socket !== null) {
        socket.disconnect();
      }
    };
  }, []);

  return { socket, initSocket };
};

export { useSocket };
