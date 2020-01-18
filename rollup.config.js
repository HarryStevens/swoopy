import babel from "rollup-plugin-babel";

export default {
  input: "index.js",
  output: {
    file: "build/swoopy.js",
    format: "umd",
    name: "swoopy"
  },
  plugins: [
    babel({
      exclude: "node_modules/**"
    })
  ] 
};