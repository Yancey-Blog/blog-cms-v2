<div align="center">

# Blog CMS v2

The **CMS** for Yancey blog with React, Apollo Client, Material-UI and GraphQL.

_This library is part of the [BEG (Blog Environment Group)](https://github.com/Yancey-Blog)_ ecosystem 📖

![Build Status](https://github.com/Yancey-Blog/blog-cms-v2/actions/workflows/github-actions.yml/badge.svg)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/bfa87f1ba09849abb9c71493f9cc604c)](https://www.codacy.com/gh/Yancey-Blog/blog-cms-v2/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Yancey-Blog/blog-cms-v2&amp;utm_campaign=Badge_Grade)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
![Code Style](https://camo.githubusercontent.com/c83b8df34339bd302b7fd3fbb631f99ba25f87f8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64655f7374796c652d70726574746965722d6666363962342e737667)

[![Version](https://img.shields.io/github/package-json/v/Yancey-Blog/blog-cms-v2)](https://github.com/Yancey-Blog/blog-cms-v2)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/Yancey-Blog/blog-cms-v2/pulls)
[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/Yancey-Blog/blog-cms-v2.svg)](https://isitmaintained.com/project/Yancey-Blog/blog-cms-v2)
[![Percentage of issues still open](https://isitmaintained.com/badge/open/Yancey-Blog/blog-cms-v2.svg)](https://isitmaintained.com/project/Yancey-Blog/blog-cms-v2)
[![Node](https://img.shields.io/badge/node-%3E%3D12.22.5-orange.svg)](https://nodejs.org/en/)

[![Gitter](https://badges.gitter.im/yancey-official/community.svg)](https://gitter.im/yancey-official/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![DependaBot](https://camo.githubusercontent.com/1fe7004c016a5ab641008b9579409c784eaa1725/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446570656e6461626f742d656e61626c65642d626c75652e737667)](https://dependabot.com/)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FYancey-Blog%2Fblog-cms-v2.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FYancey-Blog%2Fblog-cms-v2?ref=badge_shield)

⭐️ _Found it cool? Want more updates?_ [**Show your support by giving a ⭐️**](https://github.com/Yancey-Blog/blog-cms-v2/stargazers)

<a href="https://www.paypal.me/yanceyleo" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
<a href="https://twitter.com/YanceyOfficial" target="_blank"><img src="https://img.shields.io/twitter/follow/YanceyOfficial.svg?style=social&label=Follow"></a>

</div>

---

![shot](https://static.yancey.app/Jietu20200103-115157@2x.jpg)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode. Open [http://localhost:3001](http://localhost:3001) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed! See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn lint`

Checks the codes by eslint, we will lint them before commit automatically.

### `yarn commit`

An optional way to use `git cz` if you don't want to install `commitizen` globally.

## Modules & Features

### Dashboard

![Dashbord](https://static.yancey.app/Jietu20200505-043334.jpg)

### Blog Statistics

![blog statistics](https://static.yancey.app/Jietu20200505-044146.jpg)

### Create or update an item

![Create or Update an item](https://static.yancey.app/Jietu20200518-225144.jpg)

### Move up / Move down / Move Top

Moves one item's order by weight.

![Move up / Move down / Move Top](https://static.yancey.app/Jietu20200505-043729.jpg)

### Post list

![Post list](https://static.yancey.app/Jietu20200518-225154.jpg)

### Post editor

![Post editor](https://static.yancey.app/Jietu20200518-225230.jpg)

### Agenda

Manages your agenda quickly.

![Agenda](https://static.yancey.app/Jietu20200505-044045.jpg)

### Profile

Changes your nikename, region, organization, website, Bio, avatar and so on. The drawer on the left will be updated in real time.

![Profile](https://static.yancey.app/Jietu20200505-044712.jpg)

### Account

The account module allows you to update **username** and **email** or delete your account.

![Account](https://static.yancey.app/Jietu20200505-044725.jpg)

### Security

The security module allows you to update **password** and supports two-factor authentication base on **TOTP** and **SMS verification code**. You can also apply and use **recovery codes** if you cannot use the above two verification methods.

![change password](https://static.yancey.app/Jietu20200505-045200.jpg)

![TOTP - choose mobile phone system](https://static.yancey.app/Jietu20200505-045213.jpg)

![TOTP - scan qrcode](https://static.yancey.app/Jietu20200505-045226.jpg)

![TOTP - input totp secret code by hand](https://static.yancey.app/Jietu20200505-045520.jpg)

![TOTP - code verification](https://static.yancey.app/Jietu20200505-045231.jpg)

![Bind phone number](https://static.yancey.app/Jietu20200505-045242.jpg)

![Recovery Codes](https://static.yancey.app/Jietu20200505-045251.jpg)

## Contributing

The main purpose of this repository is to continue to evolve BEG (Blog Environment Group), making it faster and easier to use. Development of Blog CMS v2 happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving Blog CMS v2.

### [Code of Conduct](./CODE_OF_CONDUCT.md)

[BEG](https://github.com/Yancey-Blog) has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](./CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](./CONTRIBUTING.md)

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to Blog CMS v2.

### Good Issues

Please make sure to read the [Issue Reporting Checklist](./.github/ISSUE_TEMPLATE/bug_report.md) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

### Semantic Commit

This app follows the [Angular Team's Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit), your commit will be checked by commitlint, please use `git cz` instead of `git commit`. For this reason, you should install `commitizen` globally or use `yarn commit` instead.

### Env File

Creates `.env.development.local` file or other env files to pass environment varibles.

## TODOs

- [ ] Support multi-roles management

- [ ] Support forget password

- [ ] Login with 2FA

- [ ] Support notification and full-site search

## License

Blog CMS v2 is licensed under the terms of the [MIT licensed](https://opensource.org/licenses/MIT).
