import { DateTime } from "luxon";

export default async function handler(req, res) {
    // 20220810
    const date=DateTime.fromFormat(req.query,"yyyyMMdd") 
    // const dates=getDates(date)
    res.status(200).json({ date });
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
