import express, { NextFunction, Request, Response } from "express";

import imageRouter from "./routes/images";

const app = express();

// Add in logging to record when images are processed or accessed.
app.use((req: Request, _: Response, next: NextFunction) => {
    console.log(
        `${req.method} ${req.path} filename:${req.query.filename} width:${req.query.width} height:${req.query.height}`
    );
    next();
});

app.use("/api/images", imageRouter);

app.use("*", (_: Request, res: Response) => {
    res.status(404).send(`
    <p>try of the following endpoints:</p>
    <ol>
      <li><a href="/api/images?filename=louise&width=200&height=200">/api/images?filename=louise&width=200&height=200</a></li>
      <li><a href="/api/images?filename=tina&width=200&height=200">/api/images?filename=tina&width=200&height=200</a></li>
      <li><a href="/api/images?filename=garden&width=200&height=200">/api/images?filename=garden&width=200&height=200</a></li>
      <li><a href="/api/images?filename=palmtunnel&width=200&height=200">/api/images?filename=palmtunnel&width=200&height=200</a></li>
      <li><a href="/api/images?filename=santamonica&width=200&height=200">/api/images?filename=santamonica&width=200&height=200</a></li>
    </ol>
  `);
});

export default app;