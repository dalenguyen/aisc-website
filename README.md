# tdls-website
Source code for TDLS website.

[![Release](https://img.shields.io/badge/release-v.0.1.0-yellow.svg)](https://github.com/TDLS/tdls.github.io/releases/tag/v.0.1.0)

Note: this repository contains multiple websites.

## Instructions

First, install Node version > 10.0.0.

nvm is highly recommended.


```bash
npm run tdls
```

And then navigate to `http://localhost:3000`

Note: only `3000` may work due to domain restrictions on Google Key. Similarly, only `localhost` may work, instead of `127.0.0.1` or `0.0.0.0`.

(Troubleshooting note: If the events schedule does not load, this is likely the step that you are missing!)

## Contribution Guideline

*TL;DR: Make a pull request.*

### If you do not have write permission to this repository

1. Fork this repository.
2. `git clone https://github.com/<YOUR-USERNAME>/tdls-website`
3. make changes, commit & push to your own fork
4. Go to the webpage of your own fork (`https://github.com/<YOUR-USERNAME>/tdls-website`) and make a pull request to `https://github.com/tdls/tdls-website`.
5. We will be notified of your PR and review as soon as we can.

### If you have write permission to this repository

In addition to the forking method, you can make a branch in git, commit and push to that branch. This can be achieved via the following commands:

```bash
# assuming you are on the latest master

git checkout -b <BRANCH_NAME>

# make some changes, then commit your changes

git add -A .
git commit -m "<DESCRIPTIVE COMMIT MESSAGE!>"


git push --set-upstream origin <BRANCH_NAME>

```

And make a pull request from your branch.

## Assumptions

To simplify & modernize JS code, a lot of ES2017 gimmicks are being applied directly without a transpiler, so this website does not work on old or esoteric browsers such as IE 11 or Opera Mini. The underlying assumption is that the vast majority of visitors interested in our events use modern mainstream browsers such as Chrome, Safari or Edge.

## Suggestions

To recommend changes to the website by the public it is advisable to create a fork and then making changes to the version of the website in that fork.
