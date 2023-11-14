# Contributing in html-bundler-webpack-plugin

- [Questions and Suggestions](#question)
- [Issues and Bugs](#issue)
- [Feature Requests](#feature)
- [Pull Request Submission Guidelines](#submit-pr)
- [Commit Message Conventions](#commit)

## <a name="question"></a> Got a Question or Suggestion?

If you have questions or suggestions, please create a new [discussion](https://github.com/webdiscus/html-bundler-webpack-plugin/discussions).


## <a name="issue"></a> Found an Issue or Bug?

Before you submit an issue, please search the issue tracker, 
maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it.

Tell us versions of your environment:

- OS: macOS, Linux, Windows
- version of Node.js
- version of Webpack
- version of the Plugin
- the use-case that fails

Ideally create a small repository with a reproducible issue.


## <a name="feature"></a> Feature Requests?

You can _request_ a new feature by creating an [issue](https://github.com/webdiscus/ansis/issues).

The title must begins with `[FEATURE]`.


## <a name="submit-pr"></a> Pull Request Submission Guidelines

Before you submit your Pull Request (PR) consider the following guidelines:

- Commit your changes using a descriptive commit message that follows our [commit message conventions](#commit).
- Your PR must have only `one` commit. If you have many commits, please squash all commits into one.
- Please test your pull request:
  - new/changed code `must` be completely covered, at last `95%`
  - already existing tests must be passed: `npm test`


## <a name="commit"></a> Commit Conventions

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Examples:

```
docs(readme): unpdate usage cases
```

```
fix: error `asset not found` on Windows
```

### Type

Must be one of the following:

- **chore**: changes that fall outside of build / docs that do not effect source code (example scopes: package, defaults)
- **docs**: documentation only changes (example scopes: readme, changelog)
- **feat**: a new feature
- **fix**: a bug fix
- **perf**: a code change that improves performance
- **refactor**: a code change that neither fixes a bug nor adds a feature
- **style**: changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons)
- **test**: addition of or updates to Jest tests

### Scope

The scope is subjective & depends on the `type` see above. A good example would be a change to a particular class / module.

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the description of the change.

### Footer

The footer should contain the reference GitHub issues that this commit **Closes**.
