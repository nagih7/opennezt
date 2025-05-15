# ESLint PropTypes Validation Guide

## Common PropTypes Errors

### 1. Using `prototype` instead of `propTypes`

The most common error in this codebase is using `Component.prototype` instead of `Component.propTypes`. This is a typo that causes ESLint to warn about "prop X is missing in props validation".

#### Incorrect:

```jsx
MyComponent.prototype = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
}
```

#### Correct:

```jsx
MyComponent.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
}
```

### 2. Incorrect PropTypes validation types

PropTypes should match the actual types of the props.

#### Common errors:

-   Using `PropTypes.string` for boolean values
-   Using `PropTypes.string` for function values
-   Using `PropTypes.string` for object or array values

#### Correct definitions:

```jsx
MyComponent.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    data: PropTypes.object,
    items: PropTypes.array,
    // or better, be more specific:
    items: PropTypes.arrayOf(PropTypes.string),
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }),
}
```

## PropTypes for Functional Components

For functional components, define propTypes after the component:

```jsx
const MyComponent = ({ name, age }) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>Age: {age}</p>
        </div>
    )
}

MyComponent.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
}

export default MyComponent
```

## PropTypes for Class Components

For class components, define propTypes as a static property:

```jsx
class MyComponent extends React.Component {
    render() {
        const { name, age } = this.props
        return (
            <div>
                <h1>{name}</h1>
                <p>Age: {age}</p>
            </div>
        )
    }
}

MyComponent.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
}

export default MyComponent
```

## Common PropTypes Validations

```jsx
import PropTypes from 'prop-types'

MyComponent.propTypes = {
    // Basic types
    string: PropTypes.string,
    number: PropTypes.number,
    boolean: PropTypes.bool,
    function: PropTypes.func,
    object: PropTypes.object,
    array: PropTypes.array,
    symbol: PropTypes.symbol,
    node: PropTypes.node, // Anything renderable (numbers, strings, elements, arrays)
    element: PropTypes.element, // React element

    // Required props
    requiredString: PropTypes.string.isRequired,

    // Specific shape for objects
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        age: PropTypes.number,
    }),

    // Arrays of specific type
    names: PropTypes.arrayOf(PropTypes.string),
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),

    // One of specific values
    status: PropTypes.oneOf(['loading', 'success', 'error']),

    // One of specific types
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    // Object with specific properties
    styles: PropTypes.objectOf(PropTypes.string),

    // Custom validator
    customProp: function (props, propName, componentName) {
        if (!/^[A-Z]/.test(props[propName])) {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Validation failed.'
            )
        }
    },
}
```

## Default Props

Remember to set default props when appropriate:

```jsx
MyComponent.defaultProps = {
    age: 30,
    isActive: false,
}
```

## TypeScript Alternative

For TypeScript components, you can use interfaces/types instead of PropTypes:

```tsx
interface MyComponentProps {
    name: string
    age?: number
    isActive?: boolean
    onClick: () => void
}

const MyComponent: React.FC<MyComponentProps> = ({ name, age = 30, isActive = false, onClick }) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>Age: {age}</p>
            <button onClick={onClick}>Click me</button>
        </div>
    )
}

export default MyComponent
```

## ESLint Configuration

Your project's ESLint configuration has been updated to warn about missing prop types validation. Make sure to fix these warnings to improve code quality and documentation.
