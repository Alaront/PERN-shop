import axios from "axios";

const $host = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

const $authHost = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
})

const authInterceptor = (config: { headers: { authorization: string; }; }) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('pern-shop-token')}`
    //console.log(`Bearer ${localStorage.getItem('pern-shop-token')}`)
    return config
}

// @ts-ignore
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
};
