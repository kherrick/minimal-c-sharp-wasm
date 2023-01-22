import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import path from "path";

const isProduction = () => process.env.NODE_ENV === "production";

export default [
  {
    output: {
      exports: "named",
      file: path.join("dist", "minimal-c-sharp-wasm", "dotnet-iife.js"),
      format: "iife",
      name: "runtime",
    },
    input: "./dist/minimal-c-sharp-wasm/dotnet.js",
    plugins: [
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": isProduction()
          ? JSON.stringify("production")
          : JSON.stringify("development"),
      }),
      resolve({
        browser: true,
        preferBuiltins: true,
      }),
      commonjs(),
      babel({ babelHelpers: "bundled" }),
      isProduction() ? terser() : undefined
    ],
  },
];
