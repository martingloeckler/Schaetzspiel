import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { registerSocketHandlers } from "./src/server/socket.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.APP_HOST ?? "0.0.0.0";
const port = Number(process.env.PORT ?? 3000);
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
await app.prepare();
const httpServer = createServer((req, res) => {
  if (req.url === "/healthz") { res.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}); res.end(JSON.stringify({status:"ok"})); return; }
  void handle(req,res);
});
const io = new Server(httpServer,{cors:dev?{origin:true,credentials:true}:undefined,transports:["websocket","polling"]});
registerSocketHandlers(io);
const shutdown=(signal:string)=>{ console.log(`${signal} empfangen – Server wird beendet.`); io.close(()=>{httpServer.close(()=>process.exit(0));}); setTimeout(()=>process.exit(1),10_000).unref(); };
process.once("SIGTERM",()=>shutdown("SIGTERM"));
process.once("SIGINT",()=>shutdown("SIGINT"));
httpServer.listen(port,hostname,()=>console.log(`Schätzspiel läuft auf http://${hostname}:${port}`));
