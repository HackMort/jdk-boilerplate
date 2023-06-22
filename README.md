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

## Components

To create an Astro component follow this steps:

1- In the src/components folder, create a new folder with the name of the component. This folder will contain the files that make up the component. There are primarily three files: .astro, .scss, and .js/.ts. For example, this is the structure for the jd-modal component:

```
src/components/Modal
├── Modal.astro
├── modal.scss
└── modal.ts
```

2- To import the styles in the component, continuing with the example of the jd-modal component, here's how you import its styles within the .astro file:

```js
---
import './modal.scss'

---
```

## How to use Modal Component

### Add HTML

The modal uses different properties to identify the parts of its content and apply certain CSS styles:

- Header: **data-modal-header**
- Title: **data-modal-title**
- Close button **data-modal-close** => very important
- Content: **data-modal-content**
- Actions container: **data-modal-actions**

```html
<Modal id="custom-modal" className="custom-modal">
  <Fragment>
    <div>
      <div data-modal-header>
        <h1 data-modal-title>Modal title</h1>
        <button data-modal-close>X</button>
      </div>
      <div data-modal-content>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
          officiis mollitia cum amet quas quisquam soluta omnis, iusto, rem
          veritatis dicta a optio aperiam vel corrupti recusandae vero harum
          nisi!
        </p>
      </div>
      <div data-modal-actions>
        <button data-modal-close>Close</button>
      </div>
    </div>
  </Fragment>
</Modal>
```

### Triggers

For a DOM element to open the modal, it must have the **data-modal-trigger** property with the modal's ID as its value.

```html
<Modal id="custom-modal"> ... </Modal>
...
<button data-modal-trigger="custom-modal">Open custom modal</button>
```

### Config modal fancybox instance

> NOTE: Currently, we can only send static properties in the configuration. Sending functions will have no effect; they simply won't work. If we send a function for any Fancybox event, it will overwrite the default function, and the modal may not work as expected.

```javascript
---
import Modal from '../components/Modal/Modal.astro'
import { OptionsType } from '@fancyapps/ui/types/Fancybox/options'

const modalOptions: Partial<OptionsType> = {
  closeButton: true
}
---

<Modal id="custom-modal" options={modalOptions}>
...
</Modal>
```

Learn more about Fancybox options <a href="https://fancyapps.com/fancybox/api/options/#available-options" target="_blank">here</a>

### How to listen modal events

###### Available events

- init
- ready
- resize
- done
- shouldClose
- close
- destroy

```javascript
document.addEventListener('modal:init', ({ detail }) => {
  const { fancybox, id, eventName } = detail
})
```

Learn more about Fancybox events <a href="https://fancyapps.com/fancybox/api/events/#available-events" target="_blank">here</a>

When using your component on multiple pages, Astro will create a separate stylesheet specifically for your component's styles. You can read more about it <a href="https://docs.astro.build/en/guides/styling/#production" target="_black">here</a>.

Also, read the documentation of <a href="https://docs.astro.build/en/guides/styling/" target="_black">Astro Framework</a> regarding how styles are handled.

To properly name those styles that Astro will compile, you should add the following comment on line 1 of the .scss file:

```scss
/* {outputFileName:modal} */
```

You should replace modal with the name your file should have upon compilation. This applies to all .scss files, for example, the one for each page.

You can find more information about this in the configuration file of this project **(astro.config.mjs)**.

3- Add the corresponding script to your component:

```js
<script src='./modal.ts'></script>
```

This is how it's done in the **`modal`** component.

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

## Swiper Slider Info

This project uses Swiper Slider Element. You can find the documentation [here](https://swiperjs.com/element).
To control the slider, you can read the API documentation [here](https://swiperjs.com/swiper-api).
To see demos of the slider, you can go [here](https://swiperjs.com/demos).

## Astro SEO

Astro SEO is a component that allows to configure tags for SEO on each page  
If you want to know more about this component, you can read the following [documentation](https://github.com/jonasmerlin/astro-seo#readme)  
In the boilerplate the Astro SEO component is implemented with a custom component that receives props data from a common file

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
