import eslintJs from "@eslint/js";
import globals from "globals";
import eslintReact from "@eslint-react/eslint-plugin";
import eslintRefresh from "eslint-plugin-react-refresh";
import eslintTs from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      eslintJs.configs.recommended,
      eslintTs.configs.recommended,
      eslintReact.configs["recommended-typescript"],
      eslintRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
