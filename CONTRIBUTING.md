# Contributing to Zion

Please follow the generic instructions you can find in our organization [CONTRIBUTING.md](https://github.com/vaimee/.github/blob/main/CONTRIBUTING.md) file.

## Project specific remarks

### Code guidelines and patterns

Throughout Zion's development, we made some design decisions that we are documenting here. We encourage future developers to follow these rules to maintain a consistent code style. If you want to change this list or provide feedback, feel free to open an issue and talk about it! 

#### File names
File names follow the NestJS convention: `${name}.${scope}.${extension}`.
- `name` is the *kebab-case* name of the file. Example `my-component`.
- `scope` is the *kebab-case* name of the scope. Example `controller`. 
- `extension` The extension of the file. Example `ts`.

#### Function naming
Functions that validate input MUST be prefixed with `assert`. For instance, `assertUniqueThingDescriptionId` is a function that validates if the `id` of a thing description is unique. 

#### Controller and Services Single Responsibility
Controllers MUST only contain logic that is related to the HTTP request. They can manipulate the request or response, but they MUST NOT contain any application logic. For example, a controller MUST NOT validate the payload of a request or perform database requests directly. On the other hand, services MUST NOT process requests or responses. Moreover, direct database queries MUST NOT be performed in a service.


