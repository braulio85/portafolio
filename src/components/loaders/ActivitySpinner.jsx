import './ActivitySpinner.scss'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useSanitizer } from '/src/hooks/sanitizer.js'

function ActivitySpinner({ activities, defaultMessage }) {
    const sanitizer = useSanitizer()
    const visible = Boolean(activities.length)

    const targetActivity = activities.length ? activities[0] : null

    const message = targetActivity?.message || defaultMessage

    return (
        <>
            {visible && (
                <div id={`activity-spinner`}>
                    <div className={`activity-spinner-content`}>
                        <Spinner className={`activity-spinner`} />

                        <div
                            className={`activity-spinner-message eq-h5`}
                            dangerouslySetInnerHTML={sanitizer.sanitizeForReact(message)}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default ActivitySpinner
