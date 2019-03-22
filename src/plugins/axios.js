import axios from 'axios';
let baseURL = `https://${process.env.VUE_APP_ROOT_API}`

let axios_instance = axios.create({
    baseURL,
})
axios_instance.defaults.params = {}
axios_instance.defaults.params['api_key'] = `${process.env.VUE_APP_API_KEY}`
export default axios_instance