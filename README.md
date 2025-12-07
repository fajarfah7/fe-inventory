# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
src/
│
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   └── providers.tsx
│
├── layouts/
│   ├── MainLayout/
│   │   ├── index.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   │
│   ├── AuthLayout/
│   │   └── index.tsx
│   │
│   └── DashboardLayout/
│       ├── index.tsx
│       └── Sidebar.tsx
│
├── pages/
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   │
│   └── error/
│       ├── NotFound.tsx      // 404
│       ├── Forbidden.tsx     // 403 (optional)
│       ├── Unauthorized.tsx  // 401 (optional)
│       └── ServerError.tsx   // 500 (optional)
│
├── features/
│   ├── auth/
│   │   ├── api/
│   │   │   └── auth.api.ts
│   │   ├── components/
│   │   │   └── LoginForm.tsx
│   │   ├── hooks/
│   │   │   └── useLogin.ts
│   │   ├── pages/
│   │   │   └── LoginPage.tsx
│   │   └── types/
│   │       └── auth.ts
│   │
│   ├── inventory/
│   │   ├── api/
│   │   │   └── inventory.api.ts
│   │   ├── components/
│   │   │   ├── InventoryTable.tsx
│   │   │   └── InventoryForm.tsx
│   │   ├── hooks/
│   │   │   ├── useInventoryList.ts
│   │   │   └── useCreateInventory.ts
│   │   ├── pages/
│   │   │   ├── InventoryListPage.tsx
│   │   │   └── InventoryCreatePage.tsx
│   │   └── types/
│   │       └── inventory.ts
│   │
│   └── ... (other features)
│
├── api/
│   ├── http.ts              // axios instance
│   ├── user.api.ts
│   └── product.api.ts
│
├── components/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Radio.tsx
│   ├── Modal.tsx
│   └── Table.tsx
│
├── hooks/
│   ├── useDebounce.ts
│   ├── usePagination.ts
│   └── useLocalStorage.ts
│
├── store/
│   ├── auth.store.ts        // Zustand or Redux
│   └── theme.store.ts
│
├── types/
│   ├── common.ts
│   └── form.ts
│
├── utils/
│   ├── formatter.ts
│   ├── validator.ts
│   ├── mapper.ts
│   └── constants.ts
│
├── lib/
│   ├── axios.ts             // axios config
│   ├── queryClient.ts       // react-query setup
│   └── form.ts              // RHF + zod helpers
│
├── index.css
└── main.tsx