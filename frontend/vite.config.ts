import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests starting with /api to the Spring Boot server
      "/api": {
        target: "http://localhost:8080", // Your Spring Boot API server
        changeOrigin: true, // Modify the origin of the host header to match the target URL
        secure: false, // Turn off SSL verification if you're not using HTTPS
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove /api prefix before proxying
      },
    },
    cors: {
      origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Allowed origins
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
      credentials: true, // If your requests are sending cookies or auth info
    },
  },
});
