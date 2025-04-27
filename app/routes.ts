import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home1.tsx"),
  route("/barcelona-getafe", "routes/barcelona.tsx"),
  route("/sverige-england", "routes/sverige.tsx"),
] satisfies RouteConfig;
