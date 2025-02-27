import { NextMiddleware, NextResponse } from "next/server";
import { MiddlewareFactory } from "./interface";

export default function handleMiddlewares(
  middlewares: MiddlewareFactory[] = [],
  index = 0,
): NextMiddleware {
  const current = middlewares[index];
  if (current) {
    const next = handleMiddlewares(middlewares, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}
