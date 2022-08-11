import { DateTime } from "luxon";

export default async function handler(req, res) {
    // 20220810
    const tmp=req.query.date
    const date=DateTime.fromFormat(tmp,"yyyyMMdd") 
    const dates=getDates(date)
    res.status(200).json(dates);
}
