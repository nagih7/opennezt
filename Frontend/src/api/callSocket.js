import { isFunction } from 'lodash'

export default async function callSocket({
    event,
    actionTypes: [requestType, successType, failureType],
    payload,
    dispatch,
    getState,
    socket, // Nhận socket trực tiếp như một tham số
}) {
    if (!isFunction(dispatch) || !isFunction(getState)) {
        throw new Error('callSocket requires dispatch and getState functions')
    }

    if (!socket || !socket.connected) {
        dispatch(failureType({ message: 'Socket connection not available' }))
        return Promise.reject(new Error('Socket connection not available'))
    }

    // Dispatch request action
    dispatch(requestType())

    return new Promise((resolve, reject) => {
        // Set timeout to handle case where server doesn't respond
        const timeoutId = setTimeout(() => {
            const error = { message: 'Socket request timed out' }
            dispatch(failureType(error))
            reject(error)
        }, 10000) // 10 seconds timeout

        // Emit event to server with payload
        socket.emit(event, payload, (response) => {
            clearTimeout(timeoutId)

            if (response.error) {
                dispatch(failureType(response.error))
                reject(response.error)
            } else {
                dispatch(successType(response))
                resolve(response.data)
            }
        })
    })
}
