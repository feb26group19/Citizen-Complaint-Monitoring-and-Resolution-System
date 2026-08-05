import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AddNotice() {

  const [locations, setLocations] = useState([]);

  const [lid, setLid] = useState("");
  const [areaName, setAreaName] = useState("");
  const [noticeText, setNoticeText] = useState("");
  const [date, setDate] = useState("");

  const user = useSelector(
    (state) => state.auth.user
  );

  useEffect(() => {

    fetch("http://localhost:8082/location/all")
      .then((res) => {

        if (!res.ok) {
          throw new Error("Failed to fetch locations");
        }

        return res.json();
      })
      .then((data) => {

        console.log("Locations received:", data);

        setLocations(data);

      })
      .catch((err) => {

        console.error("Location Fetch Error:", err);

      });

  }, []);

  const addNotice = async () => {

    if (!lid || !areaName || !noticeText || !date) {
      alert("Please fill all fields");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:8082/notice/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({

            deptId: user?.deptId,

            lid: parseInt(lid),

            areaName: areaName,

            noticeText: noticeText,

            date: date

          })
        }
      );

      const msg = await response.text();

      alert(msg);

      setLid("");
      setAreaName("");
      setNoticeText("");
      setDate("");

    }
    catch (error) {

      console.error(error);
      alert("Error while adding notice");

    }
  };

  return (

    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Add Notice</h4>
        </div>

        <div className="card-body">

          {/* Location */}

          <label className="form-label fw-bold">
            Select Location
          </label>

          <select
            className="form-select mb-3"
            value={lid}
            onChange={(e) => setLid(e.target.value)}
          >

            <option value="">
              Select Location
            </option>

            {locations.map((loc) => (

              <option
                key={loc.lid}
                value={loc.lid}
              >
                {loc.name}
              </option>

            ))}

          </select>

          {/* Area Name */}

          <label className="form-label fw-bold">
            Area Name
          </label>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter Area Name"
            value={areaName}
            onChange={(e) =>
              setAreaName(e.target.value)
            }
          />

          {/* Notice */}

          <label className="form-label fw-bold">
            Notice Description
          </label>

          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Enter Notice Description"
            value={noticeText}
            onChange={(e) =>
              setNoticeText(e.target.value)
            }
          />

          {/* Date */}

          <label className="form-label fw-bold">
            Notice Date
          </label>

          <input
            type="date"
            className="form-control mb-4"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />

          <button
            className="btn btn-primary"
            onClick={addNotice}
          >
            Submit Notice
          </button>

        </div>

      </div>

    </div>
  );
}