import {fetchData} from './helper.js'

export const Ping =  (req, res) => {
  res.status(200);
  res.send({"success" : true});
}
export const getData = async (req, res) => {
  const [key , data] = await fetchData(req.query)
      if(key === 400){
        res.status(400).json({ error: String(data)})
      }else if(key === 500){
        res.status(500).json({ error: String(data)})
      }else{
        res.status(200).send({"posts":data})
      }

}