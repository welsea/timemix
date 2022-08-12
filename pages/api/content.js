import Redis from "ioredis";
import { DateTime } from "luxon";

let redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {
  if (req.method === "GET") {
    // get schedules
    const date = DateTime.fromFormat(req.query.date, "yyyyMMdd");
    const result = await getData(date);
    res.status(200).json(result);
  } else if (req.method === "PUT") {
    // edit/add schedules
    const date = DateTime.fromFormat(req.query.date, "yyyyMMdd");
    const result = await getData(date);
    res.status(200).json(result);
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
