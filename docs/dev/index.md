# DeveloperGuide

## General Information
- Use yarn as package management tool.
- Routes should be kabab-case.
- Use a [keystone](https://martinfowler.com/bliki/KeystoneInterface.html) or a [feature toggle](https://github.com/PatternAtlas/pattern-atlas-ui/blob/a0d23ef7aab2c670e37218a3f9a493722af71348/src/app/globals.ts#L21) while a feature is in development. This enables CI and a clean UI at the same time.

## Project Setup
- Clone the repository
- Install the dependencies using `yarn` or `yarn install`
- Start the project with `yarn start`. The application should run on http://localhost:1978

### Linting
Use `yarn lint` to run the linter.
This will check the TypeScript and SCSS files for a consistent style and enforces for example correct indentation, a max line length, the absence of some bad code constructs, etc.

### Testing
Unit tests can be executed with `yarn test`.
If you run yarn within a Docker container, use `yarn test-docker` as this requires the sandbox to be turned off (or customized privileges for Docker).

## Other Projects
- [Backend](https://github.com/PatternPedia/pattern-pedia-views-backend) for this project.
- Optional an [Authentication Server](https://github.com/PatternPedia/pattern-pedia-auth).
- PatternAtlas supports inline latex code rendering for patterns. This requires the setup of the [latex-renderer](https://github.com/PlanQK/latex-renderer).
