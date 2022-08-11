import Redis from 'ioredis'
import { DateTime } from "luxon";

let redis = new Redis(process.env.REDIS_URL)

export default async function handler(req, res) {
  if(req.method==="GET"){
      // get schedules
    const date=DateTime.fromFormat(req.query.date,"yyyyMMdd")
    const result=await getData(date)
    res.status(200).json(result)
  }else if(req.method==="PUT"){
    // edit/add schedules
    const date=DateTime.fromFormat(req.query.date,"yyyyMMdd")
    const result=await getData(date)
    res.status(200).json(result)
  }

}

async function getData(date){
  const year = date.year;
  const mon = date.month
  const dates = getDates(date);
  const week = dates.map((item, i) => {
    let tmp = item.split(".");
    return tmp[0];
  });

  const data = [];
  for (const item of week) {
    let tmp = await redis.call(
      "JSON.GET",
      "schedules_user1",
      "$.."+year+"." + mon + "." + item
    );
    let tmp2 = JSON.parse(tmp);
    if (tmp2.length !== 0) data.push(JSON.parse(tmp));
    else data.push(null);
  }
  return data
}

function getDates(value) {
  let week = value.weekNumber;
  let year = value.year;
  let month = value.month;
  let newdates = [...Array(7)].map((x, i) => {
    let day = DateTime.fromObject({
      weekYear: year,
      weekNumber: week,
      weekday: i + 1,
    }).day;
    return day + "." + month;
  });
  return newdates;
}