import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { config } from '../config/config';
import { useQueryClient } from '@tanstack/react-query';

const socket = io(config.apiUrl, {
  transports: ['websocket'],
  autoConnect: false,
  withCredentials: true,
});

export const useSockets = () => {
  const [isConnected, setIsConnected] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Conectarse al servidor de WebSockets
    if (!socket.connected) {
      socket.connect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    // BUG-03: the socket no longer carries the Sagle. We just refetch it over
    // HTTP, which returns the answer only to clients allowed to see it.
    function onVoteUpdate() {
      queryClient.invalidateQueries({ queryKey: ['sagle'] });
    }

    function onAttemptUpdate() {
      queryClient.invalidateQueries({ queryKey: ['sagle'] });
    }

    // Registrar los eventos
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('voteUpdate', onVoteUpdate);
    socket.on('attemptUpdate', onAttemptUpdate);

    // BUG-20: only remove this effect's listeners on cleanup. Disconnecting the
    // shared singleton socket here raced with the initial connection under
    // StrictMode/HMR ("WebSocket is closed before the connection is established").
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('voteUpdate', onVoteUpdate);
      socket.off('attemptUpdate', onAttemptUpdate);
    };
  }, [queryClient]);

  return { isConnected };
};