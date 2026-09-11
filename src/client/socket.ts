"use client";
import{io,type Socket}from"socket.io-client";let socket:Socket|undefined;export function getSocket(){if(!socket)socket=io({autoConnect:true});return socket;}
