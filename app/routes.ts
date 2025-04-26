import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home1.tsx"),
  route("/hjelp", "routes/help.tsx"),
] satisfies RouteConfig;
