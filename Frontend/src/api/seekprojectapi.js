import axios from "axios";
import { isFunction } from "lodash";
import { getAuthToken } from "../utils/localStorage";

export default async function SeekProject({
    method,
    apiPath,
    actionTypes: [requestType, successType, failureType],
    variables,
    dispatch,
    getState,
    headers,
}) {
    if (!isFunction(dispatch) || !isFunction(getState)) {
        throw new Error(
            "callGraphQLApi requires dispatch and getState functions"
        );
    }

    const baseUrlApi = process.env.REACT_APP_API_URL;
    const token = getAuthToken();
    const header = {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    };
    dispatch(requestType());
    try {
        const response = await axios({
            baseURL: baseUrlApi,
            headers: headers ? { ...headers, ...header } : header,
            method: method,
            url: apiPath,
            data: variables,
            params: method === "get" ? variables : "",
        });
        dispatch(successType(response.data));
        return response; 
    } catch (error) {
        dispatch(failureType(error.response));
        throw error.response;
    }
}