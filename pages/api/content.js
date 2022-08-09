import Redis from 'ioredis'

let redis = new Redis(process.env.REDIS_URL)

export default async (req, res) => {
  if(req.method==="GET"){
    
    const tmp = await redis.call("JSON.GET", "schedules_user1", "$..2022.8.2");
    const content=JSON.parse(tmp)
    res.status(200).json({ "content":content})
  }else if(req.method==="PUT"){
    const tmp = await redis.call("JSON.GET", "schedules_user1", "$..2022.8.2");
    const content=JSON.parse(tmp)
    const id=req.query.week
    res.status(200).json({ "content":id })
  }

}