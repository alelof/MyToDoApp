# MyToDoApp

This is the final project of the *Ironhack's FrontEnd bootcamp*.

![AppLogo](https://github.com/alelof/MyToDoApp/blob/main/src/assets/logo.png)

## Brief

This project is a To-do app created with **Vue.js** that allows users to create an account, record tasks, edit them and mark them as complete (CRUD operations). The app is linked to a database, where all the user and task data are stored. The database that used for this project is **Supabase**.

## Technical specifications

### Tech Stack
- Client: [Vue.js](https://vuejs.org/), [Vite](https://vitejs.dev/) (dev server)
- Router: [Vue Router](https://router.vuejs.org/)
- Store: [Pinia](https://pinia.vuejs.org/) for persistent login
- Database as a service: [Supabase](https://supabase.com/)

## App Functionalities

- Authentication (sign up, sign in, sign out)
- (Create) An ability to **add** new tasks
- (Read) A front-end that **displays** the user's personal to-do list
- (Update) An ability to **edit** existing tasks
- (Update) An ability to **mark** tasks as complete/incomplete
- (Delet) An ability to **delete** existing tasks


## Live demo
### [Try the live demo](https://silly-duckanoo-ed3c16.netlify.app/)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
