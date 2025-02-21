/* 
NOTE: flask server api deprecated due to web serial API
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "../types";

// WEB SOCKET CONNECTION Boilerplate
const URL =
  process.env.NODE_ENV === "production" ? undefined : BASE_URL;


export const socket: Socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"], 
});
 */