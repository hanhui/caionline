import axiosKit from '../helpers/axiosKit'

export const login = (params) => {
    console.log(params)
    return axiosKit("get", "api/sign/login", params);
}

export const loginUseQuery = ({ queryKey }) => {
    return axiosKit("get", "api/sign/login", queryKey[0]);
}
export const register = (params) => {
    console.log(params)
    return axiosKit("post", "api/sign/register", params);
}

export const registerUseQuery = ({ queryKey }) => {
    return axiosKit("post", "api/sign/register", queryKey[0]);
}




// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login, loginUseQuery,
    register, registerUseQuery
}