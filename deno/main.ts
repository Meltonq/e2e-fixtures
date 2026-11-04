import { bold } from "@std/fmt/colors";

const port = Number(Deno.env.get("PORT") ?? 8000);

console.log(bold(`listening on ${port}`));
Deno.serve({ port, hostname: "0.0.0.0" }, () => new Response("e2e:deno:v2", { headers: { "content-type": "text/plain" } }));
