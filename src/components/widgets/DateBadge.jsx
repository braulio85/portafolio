import './DateBadge.scss'
import React, { useEffect, useState } from 'react'
import InfoBadge from '/src/components/generic/InfoBadge.jsx'
import { useSanitizer } from '/src/hooks/sanitizer.js'

function DateBadge({ dateStart, dateEnd, variant = 'default', className = '' }) {
    const sanitizer = useSanitizer()

    return (
        <div className={`date-badge-wrapper date-badge-wrapper-${variant} ${className}`}>
            <InfoBadge className={`date-badge w-100`} faIcon={`fa-regular fa-calendar`}>
                {dateStart && (
                    <span
                        className={``}
                        dangerouslySetInnerHTML={sanitizer.sanitizeForReact(dateStart)}
                    />
                )}

                {dateStart && dateEnd && (
                    <i className={`fa-solid fa-arrow-right-long mx-2 opacity-75`} />
                )}

                {dateEnd && (
                    <span
                        className={``}
                        dangerouslySetInnerHTML={sanitizer.sanitizeForReact(dateEnd)}
                    />
                )}
            </InfoBadge>
        </div>
    )
}

DateBadge.Variants = {
    DEFAULT: 'default',
    TRANSPARENT: 'transparent',
}

export default DateBadge
