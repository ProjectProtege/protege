# Getting started

Website at: [Protege.dev](https://protege.dev)

Here at Protegé, we use Next.js on the front-end, Tailwind CSS for styling, and Google Firebase for the back-end.
Follow the steps below to set up your local environment.

## Setting up locally

1. Fork the latest commit of the `develop` branch
2. Run `yarn` to install peer dependencies
3. Install JDK from [Oracle](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html) _(required for the Firebase Local Emulator Suite)_

## Running locally

Complete steps in _Setting up locally_ first.

1. Run `yarn emulators` and `yarn dev` in separate terminal sessions
    - [http://localhost:4000](http://localhost:4000) for the emulator suite dashboard UI. Authentication and Firestore should both have "On" status
    - [http://localhost:4000/firestore](http://localhost:4000/firestore) for database UI

3. In a third terminal session, seed the database by running `node dbseed.js` in the root directory of the folder
    - [http://localhost:3000/](http://localhost:3000/) to confirm jobs data on home, all jobs types, and individual jobs

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
