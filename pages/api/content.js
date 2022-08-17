import Redis from "ioredis";
import { DateTime } from "luxon";

let redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {
  let method = req.method;
  switch (method) {
    case "PUT":
      let dateP = DateTime.fromFormat(req.query.date, "yyyyMMdd");
      let result = await getData(dateP);
      res.status(200).json(result);
      break;
    case "POST":
      let p = JSON.parse(req.body);
      //edit/add schedules
      let data = p.content[0];
      let date = data[0].date.split(".");
      let is = p.isEmpty;
      if (is) {
        // add new schedule
        let tmp1 = await redis.call(
          "JSON.SET",
          "schedules_user1",
          "$." + date[2] + "." + date[1] + "." + date[0],
          JSON.stringify(data)
        );
        res.status(200).json("add");
      } else {
        // edit the exist schedule
        let tmp = await redis.call(
          "JSON.SET",
          "schedules_user1",
          "$.." + date[2] + "." + date[1] + "." + date[0],
          JSON.stringify(data)
        );
        res.status(200).json("edit");
      }
      break;
    case "DELETE":
      let pdel = JSON.parse(req.body);
      let dated = pdel.date.split(".");
      let id = pdel.id;
      let index = pdel.index;
      let cid = await redis.call(
        "JSON.GET",
        "schedules_user1",
        `$..${dated[2]}.${dated[1]}.${dated[0]}[${index}].id`
      );
      cid=JSON.parse(cid)
      if (cid[0] === id) {
        let t=await redis.call(
          "JSON.DEL",
          "schedules_user1",
          `$..${dated[2]}.${dated[1]}.${dated[0]}[${index}]`
        );
        res.status(200).json("del");
      }else{
        res.status(500).json("fail")
      }
      break;
  }
}

// get schedules
async function getData(date) {
  const dates = getDates(date);
  const week = dates.map((item, i) => {
    let tmp = item.split(".");
    return tmp;
  });

  const data = [];
  for (const item of week) {
    let tmp = await redis.call(
      "JSON.GET",
      "schedules_user1",
      "$.." + item[2] + "." + item[1] + "." + item[0]
    );
    let tmp2 = JSON.parse(tmp);
    if (tmp2.length !== 0) data.push(JSON.parse(tmp));
    else data.push(null);
  }
  return data;
}

// get dates array
function getDates(value) {
  let week = value.weekNumber;
  let year = value.year;
  let newdates = [...Array(7)].map((x, i) => {
    let newdate = DateTime.fromObject({
      weekYear: year,
      weekNumber: week,
      weekday: i + 1,
    });
    return newdate.day + "." + newdate.month + "." + newdate.year;
  });
  return newdates;
}
