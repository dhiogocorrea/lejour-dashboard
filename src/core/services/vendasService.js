import axios from 'axios'

const API_URL = 'https://sheet2api.com/v1/ByR2h1huRjyQ/fiap/invoice'

const getData = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export default { getData }