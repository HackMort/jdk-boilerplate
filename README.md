# Clone Repository

```
git clone https://github.com/HackMort/jdk-boilerplate.git
```

## Install

```
npm install
```

## Run the project

```
npm run dev
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                                                         |
| :--------------------- | :----------------------------------------------------------------------------- |
| `npm install`          | Installs dependencies                                                          |
| `npm run dev`          | Starts local dev server at `localhost:3000`                                    |
| `npm run build`        | Build your production site to `./dist/`                                        |
| `npm run css:build`    | Build the final style.css & style.css.map for production site to `./dist/css/` |
| `npm run preview`      | Preview your build locally, before deploying                                   |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check`                               |
| `npm run astro --help` | Get help using the Astro CLI                                                   |

<!-- Note -->

## 📝 Notes:

1. You need to have `Nodejs` installed on your machine. You can follow our guide [here](https://tech.dev-jdoutstanding.com/en/install-nodejs-windows-11/) to install along with other tools we use in our projects.
2. You only need to run `npm run css:build` before you commit your changes to the repository. In Development, you can use `npm run dev` and let Astro translate the SCSS to CSS on the fly.

## Astro Extenstion

Install VSCode Extenstion Astro [here](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) to get syntax highlighting and other features.

## Astro Snippets

Install VSCode Extenstion Astro Snippets [here](https://marketplace.visualstudio.com/items?itemName=SheltonLouis.astro-snippets) to easily create Astro components. Example:

```
a-base-cmp
```

This will create a base component with the following code:

```

---

type Props = {

}



const {} = Astro.props

---

<div>



</div>


<style></style>
```

## VS Code Configuration for ESLINT, Prettier and Stylelint

To ensure a successful installation process and configuration of VS Code Extensions, please follow the instructions provided in the [shared document](https://netorgft9311378-my.sharepoint.com/:w:/g/personal/christian_contreras_jdoutstanding_com/EVhQFZIqY69IvXPflmBl94UBBgEzxn4zpuL7TxosTNrWoA?e=Rj4smm). It is important to note that NPM packages, and its configuration files, have already been added.

## Resources

If you need to learn more about configurations of the installed packages, please refer to the following resources:

[Prettier documentation](https://prettier.io/docs/en/index.html)  
[ESLint documentation](https://eslint.org/docs/latest/)  
[Stylelint documentation](https://stylelint.io/)  
[Stylelint rules](https://stylelint.io/user-guide/rules/)  
[stylelint-scss rules](https://github.com/stylelint-scss/stylelint-scss#list-of-rules)  
[stylelint-order](https://www.npmjs.com/package/stylelint-order)  
[lint-staged](https://www.npmjs.com/package/lint-staged)

## Stylelint Info

If in the future you want to change the way SCSS files are imported and modify Stylelint, you can refer to these properties:

[scss/at-import-no-partial-leading-underscore](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-import-no-partial-leading-underscore/README.md)  
[scss/at-import-partial-extension](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-import-partial-extension-blacklist/README.md)

<!-- Screenshot here when its ready -->

## 🚀 Project Structure

```

├── public
│   ├── favicon.svg
│   ├── js
│   │   └── scripts.js
│   └── assets
│      ├── fonts
│      ├── icons
│      ├──  pdf
│      └── images
│           └──images-per-page
├── src
│   ├── components
│   ├── layouts
│   ├── pages
│   └── styles
│       ├── components
│       ├──── _component-name.scss
│       ├── settings
│       └── style.scss
├── tsconfig.json
├── README.md
└── package.json
```

Astro looks for `.astro` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro Components.

Any static assets, like images, can be placed in the `public/` directory.
|

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build)
