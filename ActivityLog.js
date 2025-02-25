import React from 'react';
import { useSelector } from 'react-redux';

const ActivityLog = () => {
    const activityLog = useSelector(state => state.auth.activityLog);

    return (
        <div className="activity-log">
            <h3>📜 Activity Log📜</h3>
            <ul>
                {activityLog.length > 0 ? (
                    activityLog.map((entry, index) => (
                        <li key={index}>📌 {entry}</li>
                    ))
                ) : (
                    <li>No recent activities</li>
                )}
            </ul>
        </div>
    );
};

export default ActivityLog;