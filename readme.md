# Getting started

Website at: [Protege](https://protege.dev)

Here at Protegé, we use Next.js on the front-end, Tailwind CSS for styling, and Google Firebase for the back-end.
Follow the steps below to set up your local environment.

## Setting up locally

1. Fork the latest commit of the `Develop` branch
2. Run `yarn` to install peer dependencies

### Setting up Firebase Emulator

1. Install JDK from [Oracle](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html)

### Running locally

Complete steps in _Setting up locally_ and _Setting up firebase emulator_ first

1. Run `yarn emulators` and `yarn dev` in separate terminals
2. In a third terminal, seed the Firebase emulator database by running `node dbseed.js` in the root directory of the folder

## Submitting a PR

Before we get too far, we'd like to say thank you for considering contributing to Protegé.dev!

We use [Atlassian's Git Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows) model for version control on Protegé.

What that means is that we have a Main branch, a Develop branch, and then feature/feature-name or hotfix/hotfix-name branches for development of the platform.

To keep in line with this workflow, your process for submitting a PR should follow the steps below.

1. Fork the repo to your local dev environment
2. Create a new branch under the `feature/` flag
3. Name the branch in a concise way that eludes to what it does (ex: `feature/add-active-nav-state`)
4. Create your PR into the _Develop_ branch
5. Leave a short message in the PR explaining in slightly more detail what the PR accomplishes.

6. If your PR touches multiple parts, consider adding a bullet list of accomplishments, example below

   ```
   * adds new component x for data handling
   * updates component y to use component x
   * refactors component y for code reusability
   ```
