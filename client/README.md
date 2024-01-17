# controller-chronicles

## Requirements

- **`Node`**: ^20.9.0

## Running the app

```bash
# development server
$ npm run dev

# build app for production
$ npm run build
```

## .env configuration

```
VITE_BASE_API_URL="http://${your-local-ip-address}:3000/api"
```

Create .env.local file, copy and paste line above. Add your local ip address e.g 192.168.1.X

## Project structure

```
  src/
    ├───api
    ├───assets
    ├───components
    │   ├───Bestsellers
    │   ├───Collections
    │   ├───FilterDrawer
    │   │   └───components
    │   ├───Form
    │   ├───GameCard
    │   ├───GamesDetails
    │   ├───Header
    │   ├───Nav
    │   ├───NewReleases
    │   ├───Profile
    │   └───UI
    ├───hooks
    ├───pages
    ├───store
    ├───types
    └───utils
```

### Folders descriptions

- **api:**

  - Contain modules or files related to API communication.

- **assets:**

  Folder used to store static assets such as images, fonts, or other resources used in the application.

- **components:**

  This folder holds various React components that are used across the application. Each subfolder represents a different category or feature to organize the components better.

  - **Bestsellers:**
    - Components related to displaying bestseller items.
  - **Collections:**
    - Components related to displaying collections.
  - **FilterDrawer:**
    - Components related to a filter drawer. The 'components' subfolder contain smaller, reusable components specifically for the filter drawer.
  - **Form:**
    - Components related to forms and form handling.
  - **GameCard:**
    - Component responsible for individual game card.
  - **GamesDetails:**
    - Components related to displaying detailed information about a game.
  - **Header:**
    - Components related to the header of the application.
  - **Nav:**
    - Components related to navigation.
  - **NewReleases:**
    - Components related to displaying new releases.
  - **Profile:**
    - Components related to user profiles.
  - **UI:**
    - General-purpose UI components that are not tied to specific features.

- **hooks:**

  - This folder contains custom React hooks. These hooks may be used to encapsulate logic that can be reused across components.

- **pages:**

  - This folder contains React components that represent the different pages/routes of the application. Each file corresponds to a different page or view.

- **store:**

  - Folder with a `zustand` store files

- **types:**

  - Folder with TypeScript types definitions,

- **utils:**
  - Holds utility functions or helper modules that can be used across the application. These could include functions for data manipulation, date formatting, or other common tasks.

## Dependencies Documentation

- [@mui/material](https://mui.com/material-ui/) - React component library
- [@splidejs/react-splide](https://splidejs.com/integration/react-splide/) - Carousel and slider library
- [axios](https://axios-http.com/docs/intro) - Promise-based HTTP Client for node.js and the browser
- [dayjs](https://day.js.org/) - Javascript date utility library
- [react](https://react.dev/) - Open-source JavaScript library developed by Facebook for building user interfaces or UI components
- [react-auth-kit](https://authkit.arkadip.dev/) - Authentication library for React for token based auth
- [react-hook-form](https://react-hook-form.com/) - Library for managing forms in React applications using React Hooks.
- [react-query](https://tanstack.com/query/v3/) - Library for managing and caching remote data
- [react-router-dom](https://reactrouter.com/en/main) - Library for handling routing in React applications.
- [sonner](https://sonner.emilkowal.ski/) - Toast component for React.
- [styled-components](https://styled-components.com/) - CSS components library
- [zustand](https://github.com/pmndrs/zustand) - Global state management library
- [typescript](https://www.typescriptlang.org/) - Strongly typed Javascript superset
