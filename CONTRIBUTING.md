# Contributing to Zion

VAIMEE believes in the community of talented open source developers. Any contribution is welcomed, whether it be a bug fix, a new feature, a new tool, or a new way of thinking. This document provides a short how-to and a set of guidelines to follow when contributing to Zion.

## How to contribute with code
We use github to host code, track issues, feature requests, and accept pull requests. When we reach the `1.0.0` all code changes must happen using [Github Flow](https://guides.github.com/introduction/flow/index.html), so **all** code changes happen through pull requests. 
We actively welcome your pull requests:

1. Fork the repo and create your branch from `master`.
2. If you've added code, add tests to validate it.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

If your PR fixes a bug or an issue, make sure to mention the issue number in the PR title, PR body, or commit message. If the issue does not exist, please take some time to create it.

### Commit messages

We use [Conventional Commit Messages](https://www.conventionalcommits.org/en/v1.0.0/#specification) to ensure that all commits are well-formed. Additionally to the standard commit types, we use the following custom commit types:
- `docs`: for commits that update the documentation.
- `test`: for commits that update the test suite.
- `style`: for commits that update the style.
- `refactor`: for commits meant to be refactoring.
- `chore`: for commits that modify external scripts or `packages.json` dependencies.

Examples:
```
docs: define a new readme structure
```
```
fix: add the local identifier to anonymous td during retrieve and list operations
    
Fixes #3
```

## How to contribute with issues
**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can. [My stackoverflow question](http://stackoverflow.com/q/12488905/180626) includes sample code that *anyone* with a base R setup can run to reproduce what I was seeing
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening or stuff you tried that didn't work)

## Code guidelines and patterns

Through Zion's development, we took some design decision that encourage future developers to follow to maintain a consistent code style. If you want to change this list or provide feedback, feel free to open an issue and talk about it! 

### File names
File names follow the NestJS convention: `${name}.${scope}.${extension}`.
- `name` is the *kebab-case* name of the file. Example `my-component`.
- `scope` is the *kebab-case* name of the scope. Example `controller`. 
- `extension` The extension of the file. Example `ts`.

### Controller and Services Single Responsibility
Controllers MUST only contain logic that is related to the HTTP request. They can manipulate the request or response, but they MUST NOT contain any application logic. For example, a controller MUST NOT validate the payload of a request or perform database requests directly. On the other hand, services MUST NOT process requests or responses. Moreover, direct database queries MUST NOT be performed in a service.


