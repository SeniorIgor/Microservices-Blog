/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module"
  },
  env: {
    es2022: true
  },
  plugins: ["@typescript-eslint", "import", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended"
  ],
  rules: {
    "prettier/prettier": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { "argsIgnorePattern": "^_" }
    ]
  },

  overrides: [
    // React frontend
    {
      files: ["client/src/**/*.{ts,tsx,js,jsx}"],
      env: {
        browser: true,
        node: false
      },
      plugins: ["react", "react-hooks"],
      extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:prettier/recommended"
      ],
      settings: {
        react: {
          version: "detect"
        }
      },
      rules: {
        "react/react-in-jsx-scope": "off"
      }
    },

    // Node backends
    {
      files: ["posts/src/**/*.ts", "comments/src/**/*.ts"],
      env: {
        node: true,
        browser: false
      }
    }
  ]
};