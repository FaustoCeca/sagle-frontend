import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { config } from '../config/config';
import { useQueryClient } from '@tanstack/react-query';
import type { Saga } from '../types/game';

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
      console.log('WebSocket connected');
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onVoteUpdate(saga: Saga) {
      // Actualizar la caché de React Query con los nuevos datos de saga
      queryClient.setQueryData(['sagle'], saga);
    }

    function onAttemptUpdate(saga: Saga) {
      // Actualizar la caché de React Query con los nuevos datos de saga
      queryClient.invalidateQueries({ queryKey: ['sagle'] });
      queryClient.setQueryData(['sagle'], saga);
    }

    // Registrar los eventos
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('voteUpdate', onVoteUpdate);
    socket.on('attemptUpdate', onAttemptUpdate);

    // Limpiar los eventos al desmontar
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('voteUpdate', onVoteUpdate);
      socket.off('attemptUpdate', onAttemptUpdate);
      socket.disconnect();
    };
  }, [queryClient]);

  return { isConnected };
};