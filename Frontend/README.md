# OpenNezt Frontend

## Environment Configuration

This project uses environment variables to configure different deployment environments. The configuration is split into multiple files:

### Environment Files

- `.env`: Contains the primary environment selector (`NODE_ENV=development` or `NODE_ENV=production`)
- `.env.development`: Development environment variables
- `.env.production`: Production environment variables

### Available Environment Variables

| Variable                | Description                      | Example                                               |
| ----------------------- | -------------------------------- | ----------------------------------------------------- |
| `NODE_ENV`              | Current environment              | `development` or `production`                         |
| `VITE_ENV`              | Environment for client-side      | `development` or `production`                         |
| `VITE_API_URL`          | API endpoint                     | `http://localhost:3456` or `https://api.opennezt.com` |
| `VITE_VAPID_PUBLIC_KEY` | Web Push notification public key | [Base64 encoded key]                                  |
| `PORT`                  | Development server port          | `3000`                                                |
| `SASS_PATH`             | SASS include paths               | `./node_modules;./src`                                |

### Accessing Environment Variables

Environment variables are available in your application through the environment utility:

```typescript
import { ENV, API_URL, VAPID_PUBLIC_KEY, IS_PRODUCTION } from '~/config/constants/env'
```

### Running the Application

- **Development mode**: `npm run dev` or `npm start`
- **Production build**: `npm run build`
- **Development build**: `npm run build:dev`
