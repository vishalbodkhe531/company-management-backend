import express, { NextFunction, Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("hello");
});

app.listen(4000, () => {
  console.log(`Server is working on http://localhost:4000`);
});
