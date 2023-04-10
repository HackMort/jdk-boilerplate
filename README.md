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

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run css:build`    | Build the final style.css & style.css.map for production site to `./dist/css/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI       

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
