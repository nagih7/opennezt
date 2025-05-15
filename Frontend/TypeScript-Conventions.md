# TypeScript Conventions for OpenNezt Frontend

## Directory Structure

The project follows a modular structure:

```
src/
├── states/                 # Redux store
│   ├── modules/            # Redux modules (slices)
│   │   ├── [module]/
│   │   │   ├── index.ts    # Slice definition
│   │   │   ├── saga.ts     # Saga for the module
│   │   │   └── types.ts    # TypeScript interfaces
│   ├── configureStore.ts   # Store configuration
│   ├── rootReducer.ts      # Root reducer
│   ├── sagas.ts            # Root saga
│   ├── hooks.ts            # Redux hooks
│   └── store.types.ts      # Common store types
├── router/                 # Routing configuration
├── components/             # React components
├── api/                    # API clients
├── utils/                  # Utility functions
└── types/                  # Global type definitions
```

## Redux Module Structure

Each Redux module follows a consistent pattern:

### types.ts

```typescript
// State types
export interface ModuleNameState {
   // Define state structure
   data: SomeType[]
   isLoading: boolean
   error: string | null
}

// Payload types
export interface SomeActionPayload {
   // Define payload structure
   id: string
   name: string
}
```

### index.ts

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModuleNameState, SomeActionPayload } from './types'

const initialState: ModuleNameState = {
   data: [],
   isLoading: false,
   error: null,
}

const moduleNameSlice = createSlice({
   name: 'moduleName',
   initialState,
   reducers: {
      requestAction: (state) => {
         state.isLoading = true
      },
      actionSuccess: (state, action: PayloadAction<SomeActionPayload>) => {
         state.isLoading = false
         state.data = action.payload
      },
      actionFailure: (state, action: PayloadAction<string>) => {
         state.isLoading = false
         state.error = action.payload
      },
   },
})

export const { requestAction, actionSuccess, actionFailure } = moduleNameSlice.actions
export default moduleNameSlice.reducer
```

### saga.ts

```typescript
import { all, fork, put, takeLatest, call, Effect } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { requestAction, actionSuccess, actionFailure } from './index'
import { SomeActionPayload } from './types'
import { someApiCall } from 'api/someApi'

function* handleSomeAction(action: PayloadAction<SomeActionPayload>) {
   try {
      const response = yield call(someApiCall, action.payload)
      yield put(actionSuccess(response.data))
   } catch (error) {
      yield put(actionFailure(error.message))
   }
}

function* watchSomeAction() {
   yield takeLatest(requestAction.type, handleSomeAction)
}

export default function* moduleSaga(): Generator<Effect, void, any> {
   yield all([fork(watchSomeAction)])
}
```

## Usage in Components

Use the provided hooks for type-safe Redux usage:

```typescript
import React from 'react'
import { useAppSelector, useAppDispatch } from 'states/hooks'
import { requestAction } from 'states/modules/moduleName'

const MyComponent: React.FC = () => {
   const dispatch = useAppDispatch()
   const { data, isLoading } = useAppSelector((state) => state.moduleName)

   const handleButtonClick = () => {
      dispatch(requestAction({ id: '123', name: 'Example' }))
   }

   return (
      <div>
         {isLoading && <p>Loading...</p>}
         <button onClick={handleButtonClick}>Load Data</button>
         <ul>
            {data.map((item) => (
               <li key={item.id}>{item.name}</li>
            ))}
         </ul>
      </div>
   )
}

export default MyComponent
```

## Type Definition Guidelines

1. **Be Specific**: Avoid using `any` when possible
2. **Module Exports**: Export all types from the module's `types.ts` file
3. **Reuse Types**: Import and reuse common types from `states/store.types.ts`
4. **Generic Types**: Use generics for reusable components and functions
5. **Exact Types**: Use explicit property types rather than index signatures
6. **Basic Types**: Prefer interfaces for object shapes and type for unions
