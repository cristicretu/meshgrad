# Ultimate Front-end Template

![preview](https://cdn.discordapp.com/attachments/797485737272541250/952208625806495815/image_5.png)

> Most elements are taken from [my website](https://cretu.dev).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcristicretu%2Fts-next-tailwind-template)

## Ingredients ✨:

- NextJS 🚀
- TailwindCSS 🦄
- Typescript 🦺
- Dark Mode Support 🌓
- ESLint + Prettier Config 📂
- Husky 🐶
- Self-Hosted Inter Font ␊

Under the _components_ folder, use Container for each of your pages - as it provides a reusable starting point for every page.

```jsx
<Container>...pageElements</Container>
```

## Getting started

1. With 'use as template' repository
   ![preview](https://cdn.discordapp.com/attachments/797485737272541250/952208604386189332/Group_11.png)

2. Clone the project

```bash
# http
git clone https://github.com/cristicretu/ts-next-tailwind-template.git
```

```bash
# ssh
git clone git@github.com:cristicretu/ts-next-tailwind-template.git
```

3. With `create-next-app`

```bash
npx create-next-app -e https://github.com/cristicretu/ts-next-tailwind-template project-name
```

Install the required packages and run the template

```bash
cd project-name
yarn install
```

## Included

### Custom classNames function
> Under `/lib/classNames`

### Packages

1. Next-themes: An abstraction for themes in your Next.js app.
2. react-use: react-hooks

### Custom globals.css

1. custom underline
2. vercel navbar
3. removes firefox, edge and ie. bugs with overflows

### Absolute Imports

```tsx
import TextField from '../../../components/TextField.tsx'
```

changes to

```tsx
import TextField from 'components/TextField.tsx'
```

### SEO optimization found in `Container.tsx`

### Folder structuring & organization

> Under `/components/` & `/public/`

### Self Hosted Inter Font

> Under `/public/fonts/`

### 404 Page

### Favicons and more configs

> Under `/public/static/favicons/`

![preview](https://cdn.discordapp.com/attachments/797485737272541250/952211815046197278/Frame_7.png)
