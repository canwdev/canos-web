import moment from "moment";
import {useEffect, useState} from "react";

const timeFormat = 'YYYY/MM/DD ddd HH:mm:ss'
export default function () {
  const [time, setTime] = useState(moment().format(timeFormat))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format(timeFormat))
    })

    return () => clearInterval(interval)
  }, []);

  return <div className="tray-datetime">{time}</div>
}
