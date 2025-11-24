/** @type {import('@commitlint/types').UserConfig} */
const Configuration = {
  extends: ["@commitlint/config-conventional"],

  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "chore",
        "docs",
        "style",
        "refactor",
        "test",
        "revert",
        "ci",
        "build",
        "perf",
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "scope-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "scope-empty": [2, "always"],
    "type-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
  },

  prompt: {
    settings: {
      enableMultipleScopes: true,
    },

    questions: {
      type: {
        description: "Select the type of change you are committing",
        enum: {
          feat: {
            description: "A new feature or functionality",
            title: "Features",
          },
          fix: {
            description: "A bug fix",
            title: "Bug Fixes",
          },
          chore: {
            description: "Other changes that do not modify src or test files",
            title: "Chores",
          },
          docs: {
            description: "Documentation updates",
            title: "Documentation",
          },
          style: {
            description:
              "Changes that do not affect code meaning (formatting, spacing, punctuation)",
            title: "Styles",
          },
          refactor: {
            description:
              "Code changes that neither fix a bug nor add a feature",
            title: "Code Refactoring",
          },
          perf: {
            description: "Performance improvements",
            title: "Performance",
          },
          test: {
            description: "Adding or updating tests",
            title: "Tests",
          },
          build: {
            description:
              "Changes that affect the build system or external dependencies",
            title: "Builds",
          },
          ci: {
            description: "Continuous Integration configuration changes",
            title: "CI",
          },
          revert: {
            description: "Reverts a previous commit",
            title: "Reverts",
          },
        },
      },

      scope: {
        description:
          "Select the scope where changes occurred (name of the module)",
      },

      subject: {
        description:
          "Write a short description of the change (must be in English)",
      },

      body: {
        description:
          "Provide a more detailed description of the change (optional)",
      },

      isBreaking: {
        description:
          "Does this commit introduce a breaking change (major version bump)?",
      },

      isIssueAffected: {
        description: "Does this change affect any open issues?",
      },
    },
  },
};

module.exports = Configuration;
