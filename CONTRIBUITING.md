# Contributing to Scribly

First and foremost, thank you! We appreciate that you want to contribute to Scribly, and we value your time and effort. Here are some guidelines to help ensure a smooth contribution process.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](https://github.com/romen2232/scribly/blob/main/CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

-   Before submitting a bug report, please check the [issues](https://github.com/romen2232/scribly/issues) to see if the problem has already been reported. If it has, add a comment to the existing issue instead of opening a new one.
-   When you are creating a bug report, please include as many details as possible. Use the [bug report template](https://github.com/romen2232/scribly/issues/new?template=bug.yaml) to guide you.

### Suggesting Enhancements

-   When you are creating an enhancement suggestion, please include as many details as possible. Use the [feature request template](https://github.com/romen2232/scribly/issues/new?template=feature.yaml&labels=feature) to guide you.

### Pull Requests

1. Fork the repository and create your branch from `main`.
2. Ensure that your code follows the style guidelines of the project.
3. Write clear, descriptive commit messages.
4. Include relevant issue number(s) in your pull request.
5. Run any tests to ensure your changes do not introduce new errors.
6. Submit your pull request!

## Style Guidelines

### Git Commit Messages (Conventional Commits)

-   Structure your commit message like this:

    ```
    <type>[optional scope]: <description>

    [optional body]

    [optional footer(s)]
    ```

-   The commit contains the following structural elements, to communicate intent to the consumers of your library:
    -   **fix**: a commit of the type `fix` patches a bug in your codebase (this correlates with `PATCH` in semantic versioning).
    -   **feat**: a commit of the type `feat` introduces a new feature to the codebase (this correlates with `MINOR` in semantic versioning).
    -   **BREAKING CHANGE**: a commit that has a footer `BREAKING CHANGE:`, or appends a `!` after the type/scope, introduces a breaking API change (correlating with `MAJOR` in semantic versioning). A BREAKING CHANGE can be part of commits of any type.
-   Other types beyond `fix:` and `feat:` are allowed, for example:
    -   `chore:`
    -   `docs:`
    -   `style:`
    -   `refactor:`
    -   `perf:`
    -   `test:`

### Code Style

-   Ensure any install or build dependencies are removed before the end of the layer when doing a build.
-   Add comments to your code where necessary.
-   Follow the conventions and patterns present in the existing code.

## Additional Notes

Remember, contributions to an open-source project should be made with care. It's a collaborative effort, and as such, requires a level of respect for the efforts of others.
