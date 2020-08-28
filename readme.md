## Website at: https://protege.dev

# Getting started

Here at Protegé, we use create-react-app on the front-end, Tailwind CSS for styling, and Google Firebase for the back-end.
Getting a local environment set up is fairly simple.

1. Pull down the repo
2. Run `npm i` to install peer deps (if you're using VScode then it may be beneficial to add the eslint and prettier extensions)
3. Contact [Drew](mailto:drewclementsdesign@gmail.com) to get dev env variables

And you're good to go!

# Submitting a PR

Before we get too far, we'd like to say thank you for considering contributing to Protegé.dev!

We use [Atlassian's Git Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows) model for version control on Protegé.

What that means is that we have a Master branch, a Develop branch, and then feature/feature-name or hotfix/hotfix-name branches for development of the platform.

To keep in line with this workflow, your process for submitting a PR should follow the steps below.

1. Fork the repo to your local dev environment
2. Create a new branch under the `feature/` flag
3. Name the branch in a concise way that eludes to what it does (ex: `feature/add-active-nav-state`)
4. Create your PR into the _Develop_ branch
5. Leave a short message in the PR explaining in slightly more detail what the PR accomplishes.

6. If your PR touches multiple parts, consider adding a bullet list of accomplishments, example below
    ~~~
    * adds new component x for data handling
    * updates component y to use component x
    * refactors component y for code reusability
    ~~~
