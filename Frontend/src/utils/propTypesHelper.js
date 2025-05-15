// This file contains a helper to check for common PropTypes issues
import React from 'react'

/**
 * Use this function to check if a component has PropTypes defined correctly
 *
 * Common issues this helps detect:
 * 1. Using `Component.prototype` instead of `Component.propTypes`
 * 2. Missing PropTypes validation for props
 *
 * @param {React.ComponentType} Component - The component to check
 * @returns {boolean} True if the component has correctly defined propTypes
 */
export const checkPropTypes = (Component) => {
    if (!Component) return false

    // Check if propTypes is defined (correct)
    if (Component.propTypes) {
        return true
    }

    // Check if prototype contains propTypes-like definitions (common mistake)
    if (
        Component.prototype &&
        Object.keys(Component.prototype).some(
            (key) =>
                key.includes('isRequired') ||
                key === 'bool' ||
                key === 'string' ||
                key === 'func' ||
                key === 'object' ||
                key === 'array'
        )
    ) {
        console.warn(`Warning: ${Component.name} seems to have defined propTypes on prototype instead of propTypes`)
        return false
    }

    return false
}

/**
 * Instructions to fix PropTypes validation warnings:
 *
 * 1. Change `Component.prototype = {...}` to `Component.propTypes = {...}`
 * 2. Ensure your defaultProps are defined correctly as `Component.defaultProps = {...}`
 *
 * Example:
 *
 * // INCORRECT:
 * InputMASQ.prototype = {
 *   onChange: PropTypes.func.isRequired,
 *   // ...other props
 * }
 *
 * // CORRECT:
 * InputMASQ.propTypes = {
 *   onChange: PropTypes.func.isRequired,
 *   // ...other props
 * }
 */
