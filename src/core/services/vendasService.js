import axios from 'axios'

const API_URL_INVOICE = 'https://sheet2api.com/v1/ByR2h1huRjyQ/fiap/invoice'

const getData = async () => {
  const response = await axios.get(API_URL_INVOICE)
  return response.data
}

export default { getData }