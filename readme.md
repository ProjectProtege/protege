# Getting started

Here at Protegé, we use create-react-app on the front-end, Tailwind CSS for styling, and Google Firebase for the back-end.
Getting a local environment set up is fairly simple. If something isn't clear, create an issue and let us know how we can improve this document.

## Testing Locally

### Pre-Requisites
1. Fork this repo 
    - use the `Develop` branch as your base for changes
2. Install JDK from [Oracle](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html)
3. Install [Node](https://nodejs.org/en/download/)
4. Install [firebase-cli](https://firebase.google.com/docs/cli)
5. Run `yarn` to install peer dependencies

### Firebase Emulator
1. Create a firebase project - You must create a firebase project to be able to access the site locally. This is because the project relies on firebase to be emulated for storage and other functions. You can read more about firebase [here](https://firebase.google.com/)
    - Create a firebase project
    - Access the project settings via the cogwheel from the firebase project console. You will add firebase to your web app by selecting `Add app` and the web app icon `</>`. 
    - Name your app and select `Register app`. 
    - Copy your web app's Firebase configuration to the relevant items in the `.env.local.template` file included in this repository.
    - Rename `.env.local.template` to `.env.local`

### Building the Site
1. Run in separate terminals
    - `yarn emulators` - launches the firebase emulator
        - [http://localhost:4000](http://localhost:4000) for the emulator suite dashboard UI. Authentication and Firestore should both have "On" status
        - [http://localhost:4000/firestore](http://localhost:4000/firestore) for database UI
    - `yarn dev` - builds the site
2. Seed the Firebase emulator database by running `dbseed.js` in the root directory of this repo from another terminal session. You can do this by running `node dbseed.js`. This will populate the data with some test data.
    - [http://localhost:3000/](http://localhost:3000/) to confirm jobs data on home, all jobs types, and individual jobs

### Notes
- Not all of our APIs are currently configured for local use. At this time you will not be able to use stripe, newsletter, or file upload features. This readme will be updated to reflect the setup of these features if they become available for local testing.

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
