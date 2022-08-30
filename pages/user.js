import Router from "next/router";
import React, { useState, useContext } from "react";
import Header from "../components/Header";
import TimezoneSelect from "react-timezone-select";
// import { MainContext } from ".";
import { useRouter } from "next/router";

export default function user() {
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [change, setChange] = useState(false);

//   const content = useContext(MainContext);
//   const [user, setUser] = content.user;

  const router = useRouter();
  const uid = router.query.id;

  function handleChange(e) {
    setSelectedTimezone(e.value);
    // console.log(e);
  }

  function handleClick() {
    setChange(!change);
    if (change) {
      //sent new value to database
    }
  }
  return (
    <div>
      <div className="pane">
        <div>ID</div>
        <div>
          <div>Time Zone:{selectedTimezone}</div>
          {change && (
            <div>
              <TimezoneSelect
                value={selectedTimezone}
                onChange={(e) => handleChange(e)}
              />
            </div>
          )}
        </div>
        <button onClick={handleClick}>{change ? "Save" : "Change"}</button>
      </div>
    </div>
  );
}
