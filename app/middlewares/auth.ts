import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest } from "next/server";
import { checkPathStartsWith } from "./_utils";
import { MiddlewareFactory } from "./interface";

const publicPathStarts = [
  "/enter",
  "/join",
  "/blueprints",
  "/craft",
  "/explore",
  "lost-in-time",
  "/treasure",
  "/contact",
];
const adminPathStarts = ["/admin"];

const authMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    if (checkPathStartsWith(request.nextUrl.pathname, publicPathStarts)) {
      return next(request, _next);
    }

    const isAdminSection = checkPathStartsWith(
      request.nextUrl.pathname,
      adminPathStarts
    );

    return withAuth({
      callbacks: {
        authorized: ({ token }) => {
          if (!isAdminSection) {
            return !!token;
          }

          return token?.isAdmin === true;
        },
      },
      pages: {
        signIn: "/enter",
        error: "/error",
      },
    })(request as NextRequestWithAuth, _next);
  };
};

export default authMiddleware;
