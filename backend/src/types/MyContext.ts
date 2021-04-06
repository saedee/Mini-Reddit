import { Request, Response } from "express";
import { Redis } from "ioredis";
import { Session } from "express-session";
import { createUserLoader } from "../utils/createUserLoader";
import { createUpdootLoader } from "../utils/createUpdootLoader";

export type MyContext = {
  req: Request & { session?: Session & { userId?: number } };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  updootLoader: ReturnType<typeof createUpdootLoader>;
};
