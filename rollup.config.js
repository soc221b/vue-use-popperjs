const path = require("path");
const rm = require("rimraf");
const ts = require("rollup-plugin-typescript2");
const { terser } = require("rollup-plugin-terser");
const resolve = require("@rollup/plugin-node-resolve").default;
const babel = require("@rollup/plugin-babel");
const replace = require("rollup-plugin-replace");
const { pascalCase } = require("change-case");

rm.sync(resolvePackage("dist/**/*"));

const packageJson = require(resolvePackage("package.json"));
const packageName = packageJson.name;
const mainFilePath = "src/index.ts";
const pascalCasePackageName = pascalCase(packageName);
const input = resolvePackage(mainFilePath);
const output = "index";
const productionSuffix = "prod";
const formats = ["es", "iife", "cjs"];
if (process.env.DEVELOPMENT) formats.splice(2);

const configs = [];
formats.forEach((format) => {
  const isIifeOrCjs = format === "iife" || format === "cjs";

  const config = {
    input,
    external: ["vue-demi"],
    plugins: [
      ts(),
      resolve(),
      babel({
        babelHelpers: "bundled",
        extensions: [".js", ".ts"],
      }),
    ],
    output: {
      globals: {
        "vue-demi": "VueDemi",
      },
      format,
      name: pascalCasePackageName,
      extend: true,
      exports: "auto",
    },
  };

  configs.push({
    ...config,
    plugins: [
      ...config.plugins,
      ...(isIifeOrCjs
        ? [
            replace({
              "process.env.NODE_ENV": "'development'",
            }),
          ]
        : []),
    ],
    output: {
      ...config.output,
      file: resolvePackage(`dist/${output}.${format}.js`),
    },
  });

  configs.push({
    ...config,
    plugins: [
      ...config.plugins,
      ...(isIifeOrCjs
        ? [
            replace({
              "process.env.NODE_ENV": "'production'",
            }),
          ]
        : []),
      terser(),
    ],
    output: {
      ...config.output,
      file: resolvePackage(`dist/${output}.${format}.${productionSuffix}.js`),
    },
  });
});

module.exports = configs;

function resolvePackage(...paths) {
  return path.resolve(__dirname, process.cwd(), ...paths);
}
