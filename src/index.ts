import { startHttpServer } from "./http";
import { cleanUp } from "./core/cleanUp";

async function start() {
  await startHttpServer()
}

start()
