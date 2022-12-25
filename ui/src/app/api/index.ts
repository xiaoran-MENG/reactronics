import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"

axios.defaults.baseURL = 'http://localhost:5000/api/'
axios.interceptors.response.use(r => r, (e: AxiosError) => {

    const { status } = e.response!

    switch (status) {
        case 400:
            toast.error('400')
            break
        case 401:
            toast.error('401')
            break
        case 404:
            toast.error('404')
            break
        case 500:
            toast.error('500')
            break
        default:
            break
    }

    return Promise.reject(e.response)
})

const REST = {
    data: (r: AxiosResponse) => r.data,
    get: (url: string) => axios.get(url).then(REST.data),
    post: (url: string, body: {}) => axios.post(url, body).then(REST.data),
    put: (url: string, body: {}) => axios.put(url, body).then(REST.data),
    delete: (url: string) => axios.delete(url).then(REST.data)
}

const api = {
    catalog: {
        all: () => REST.get('products'),
        one: (id: number) => REST.get(`products/${id}`)
    },
    errors: {
        badRequest: () => REST.get('test/bad-request'),
        unauthorized: () => REST.get('test/unauthorized'),
        notFound: () => REST.get('test/not-found'),
        serverError: () => REST.get('test/server-error'),
        invalid: () => REST.get('test/invalid'),
    }
}

export default api