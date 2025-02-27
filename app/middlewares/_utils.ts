export function checkPathStartsWith(
  pathname: string,
  allowedPathStarts: string[],
) {
  return allowedPathStarts.some((pathStart) => pathname.startsWith(pathStart));
}
