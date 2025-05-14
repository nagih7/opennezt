# TypeScript Conversion Guide for OpenNezt Frontend

This guide outlines the process for converting JavaScript files to TypeScript in the OpenNezt Frontend project.

## Tools Available

We've set up several tools to help with the conversion process:

1. `convert-to-ts.js` - Bulk rename JS files to TS/TSX files
2. `convert-component.js` - Interactive tool to convert a single component
3. Type definitions in `src/types/` folder

## Conversion Strategy

### Phase 1: Setup and Preparation (Complete)

-   ✅ Setup tsconfig.json
-   ✅ Install TypeScript dependencies
-   ✅ Create basic type definitions
-   ✅ Update package.json scripts

### Phase 2: Core Infrastructure (In Progress)

1. Convert core utilities and helpers
    - ✅ `utils/localStorage.ts`
    - ✅ `api/callApi.ts`
2. Convert Redux store setup
    - ✅ `states/configureStore.ts`
    - ✅ `states/rootReducer.ts`
    - ✅ Created Redux type definitions in `states/types.ts`
    - ✅ Created module type placeholders for all Redux modules
    - ✅ Converted `states/modules/app/index.ts` as example
3. Convert router configuration
    - `router/route.js`
    - `router/appRouteMap.js`
    - `router/manageRouteMap.js`

### Phase 3: Convert Redux modules and sagas (Next Focus)

1. Start with simpler modules like user, notification, etc.
2. Add proper TypeScript interfaces for actions and state
3. Type all Redux action creators and thunks

### Phase 4: Convert React components (In Progress)

1. ✅ Converted examples: `NotFound`, `Compatibility`, `WebPushContext`
2. Continue with smaller, self-contained components
3. Start with common UI components that are reused
4. Then convert layout components
5. Finally, convert page components

### Phase 5: Context providers

1. ✅ Converted `WebPushContext` to TypeScript
2. Convert remaining context providers and hooks

## Conversion Process

1. **Rename files**:

    - Change `.js` files to `.ts`
    - Change `.jsx` files to `.tsx`

2. **Add type annotations**:

    - Function parameters
    - Return types
    - Component props
    - State objects
    - Variables where TypeScript can't infer types

3. **Common Patterns**:

### React Components

```tsx
// Before (JavaScript)
import React from 'react'

function MyComponent({ title, onAction }) {
    return <div onClick={onAction}>{title}</div>
}

export default MyComponent

// After (TypeScript)
import React from 'react'

interface MyComponentProps {
    title: string
    onAction: () => void
}

function MyComponent({ title, onAction }: MyComponentProps): JSX.Element {
    return <div onClick={onAction}>{title}</div>
}

export default MyComponent
```

### Redux Actions

```tsx
// Before (JavaScript)
export const userLogin = (data) => ({
    type: USER_LOGIN,
    payload: data,
})

// After (TypeScript)
import { ReduxAction } from 'types/components'
import { UserData } from 'types/auth'

export const USER_LOGIN = 'USER_LOGIN'
export type UserLoginAction = ReduxAction<UserData>

export const userLogin = (data: UserData): UserLoginAction => ({
    type: USER_LOGIN,
    payload: data,
})
```

### Redux Reducers

```tsx
// Before (JavaScript)
const initialState = {
    loading: false,
    data: null,
    error: null,
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true }
        case USER_LOGIN_SUCCESS:
            return { ...state, loading: false, data: action.payload }
        default:
            return state
    }
}

// After (TypeScript)
import { User } from 'types/components'
import { ReduxAction } from 'types/components'
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE } from '../actions/userActions'

interface UserState {
    loading: boolean
    data: User | null
    error: string | null
}

const initialState: UserState = {
    loading: false,
    data: null,
    error: null,
}

export default function userReducer(state: UserState = initialState, action: ReduxAction): UserState {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true }
        case USER_LOGIN_SUCCESS:
            return { ...state, loading: false, data: action.payload }
        case USER_LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}
```

## Using the Component Converter

Run the component converter with:

```
node convert-component.js
```

Then follow the prompts to convert a specific component.

## Manual Testing Process

After converting a file:

1. Run `npm run type-check` to verify no TypeScript errors
2. Test the component in the browser to verify functionality
3. Fix any runtime errors that may occur

## Best Practices

1. Use interfaces for object shapes (props, state, etc.)
2. Use type for unions, intersections, and utility types
3. Export types/interfaces for reuse
4. Use generics for components and functions that work with different types
5. Break down complex types into smaller, reusable ones
6. Use the `unknown` type instead of `any` when possible
7. Use type assertions sparingly (prefer type guards)

## Incremental Migration

1. Start with isolated components/modules
2. Add `allowJs: true` in tsconfig.json to allow mixing JS and TS
3. Focus on one feature or directory at a time
4. Add tests for each converted component
