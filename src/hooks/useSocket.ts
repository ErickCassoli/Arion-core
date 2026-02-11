import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useToast } from '../contexts/ToastContext';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [lastEvent, setLastEvent] = useState<any>(null);
    const { addToast } = useToast();

    useEffect(() => {
        const socketInstance = io(SOCKET_URL, {
            transports: ['websocket'],
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socketInstance.on('connect', () => {
            console.log('Neural Link Established (Socket Connected)');
            setIsConnected(true);
            addToast('Neural Link Established', 'success');
        });

        socketInstance.on('disconnect', () => {
            console.log('Neural Link Lost (Socket Disconnected)');
            setIsConnected(false);
            addToast('Neural Link Severed', 'error');
        });

        socketInstance.onAny((eventName, ...args) => {
            setLastEvent({ event: eventName, data: args });
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    const subscribe = useCallback((event: string, callback: (data: any) => void) => {
        if (!socket) return;
        socket.on(event, callback);
        return () => {
            socket.off(event, callback);
        };
    }, [socket]);

    return { socket, isConnected, lastEvent, subscribe };
};
