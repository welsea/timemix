import Redis from 'ioredis'

let redis = new Redis(process.env.REDIS_URL)

export default async function handler(req, res) {
  if(req.method==="GET"){
    const date=req.query
    const result=await test(date)
    res.status(200).json({content:result})
  }else if(req.method==="PUT"){
    const date=req.query
    const result=await test(date)
    res.status(200).json({content:result})
  }

}

async function test(date){
  const tmp = await redis.call("JSON.GET", "schedules_user1", "$..2022.8.8");
  return tmp
}
