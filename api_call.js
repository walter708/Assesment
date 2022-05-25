const axios = require('axios')

const BASE_URL = "http://localhost:3000/api"

const ping_api = async () =>{
  try {
    
    return await axios.get(`${BASE_URL}/ping`)
     
  }catch(e){
    return e
  }
}
module.exports = {BASE_URL ,ping_api}