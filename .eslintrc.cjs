/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  env: {
    es2022: true,
  },
  plugins: ["import", "@typescript-eslint", "prettier", "simple-import-sort"],
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "prettier/prettier": "warn",
    "import/no-named-as-default-member": "off",
    "no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "max-len": ["warn", { code: 120, ignoreUrls: true }],
    "@typescript-eslint/consistent-type-imports": [
    "error",
      {
        prefer: "type-imports",
        fixStyle: "separate-type-imports",
        disallowTypeAnnotations: false,
      },
    ],
    "simple-import-sort/exports": "error",
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages. `react` related packages come first.
          ['^react', '^\\w', '^@[^//]'],
          // Public
          ['^@org\\/'],
          // 'Separate import for global styles @/styles/base.scss'
          ['@/styles/base.scss$'],
          // common types
          ['^@types'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$', '^\\./?.types$'],
          // Style imports (for named imports and for global styles a separate regexp).
          ['[A-Za-z@\\.].+\\.s?css$', '^[A-Za-z@\\.].+\\.s?css$'],
        ],
      },
    ],
  },

  settings: {
    "import/resolver": {
      // So import/no-unresolved works with TS files
      typescript: {
        // point to your TS configs used for resolution
        project: [
          "./tsconfig.base.json",
          "./client/tsconfig.json",
          "./posts/tsconfig.json",
          "./comments/tsconfig.json",
          "./query/tsconfig.json",
          "./moderation/tsconfig.json",
          "./shared/tsconfig.json"
        ],
        noWarnOnMultipleProjects: true,
      },
      // optional, but nice to keep node-style resolution too
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },

  overrides: [
    // React frontend
    {
      files: ["**/client/src/**/*.{ts,tsx,js,jsx}"],
      env: {
        browser: true,
        node: false,
      },
      plugins: ["react", "react-hooks"],
      extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:prettier/recommended",
      ],
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        "react/react-in-jsx-scope": "off",
      },
    },

    // Node backends
    {
      files: [
        "**/posts/src/**/*.ts",
        "**/comments/src/**/*.ts",
        "**/query/src/**/*.ts",
        "**/moderation/src/**/*.ts",
        "**/event-bus/src/**/*.ts"],
      env: {
        node: true,
        browser: false,
      },
    },
  ],
};
