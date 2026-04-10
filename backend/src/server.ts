import app from "./app";
import "./utils/scheduler";
import { pool } from "./utils/db";
import http from "http";
import { initSocket } from "./utils/socket"; // 👈 import socket

const PORT = process.env.BACKEND_PORT || 3000;

// ❗ create HTTP server
const server = http.createServer(app);

pool.connect()
  .then(() => {
    console.log("Connected to database");

    // ✅ initialize socket
    initSocket(server);

    // ✅ use server.listen (NOT app.listen)
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
    process.exit(1);
  });