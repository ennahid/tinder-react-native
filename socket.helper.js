import { API_URL } from "./app.json";
import io from "socket.io-client";

export const socket = io(API_URL);
