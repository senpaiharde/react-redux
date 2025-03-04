import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearActivitys } from "../actions/authActions";

const ActivityLog = () => {
    const dispatch = useDispatch();
    const activityLog = useSelector((state) => state.auth.activityLog);
    const theme = useSelector((state) => state?.theme?.theme || "light");

    const [filterDate, setFilterDate] = useState("");
    const [isOpen, setIsOpen] = useState(true); // State for collapsible log


    useEffect(() => {
        console.log("🚀 Debug: Activity Log Updated", activityLog);
    }, [activityLog]);  // ✅ Runs only when activityLog changes




    // Function to clear activity log
    const handleClearLog = () => {
        if (window.confirm("Are you sure you want to clear the activity log?")) {
            dispatch(clearActivitys());
        }
    };
    // every enttry render
    const formattedLog = activityLog.map(entry => {
        if (typeof entry === "string") {
            return { date: "Unknown Date", action: entry, name: "Unknown Task" }; // Handle old string logs
        }
        return {
            date: entry?.date || "No Date",
            action: entry?.action || "No Action",
            name: entry?.name || "No Name",
        };
    });
    
    // Function to filter activities by date
    const filteredLog = filterDate
        ? activityLog.filter((entry) =>
              entry.date.startsWith(filterDate)
          )
        : activityLog;

    return (
        <div className={`activity-log ${theme}`}>
            <div className="activity-header">
                <h3>📜 Activity Log</h3>
                <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "▲ Hide" : "▼ Show"}
                </button>
            </div>

            {isOpen && (
                <div className="log-container">
                    {/* Filter by Date */}
                    <div className="filters">
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                        />
                        <button className="clear-log-button" onClick={handleClearLog}>
                            🗑️ Clear
                        </button>
                    </div>

                    {/* Activity List */}
                    <ul>
                        {formattedLog.length > 0 ? (
                            formattedLog.map((entry, index) => (
                                <li key={index} className="fade-in">
                                       📅 {entry.date} - 🏷 {entry.action} - 👤 {entry.name}
                                </li>
                            ))
                        ) : (
                            <li className="empty-log">No recent activities</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ActivityLog;
