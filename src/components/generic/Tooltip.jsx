import './Tooltip.scss'
import React, { useEffect, useState } from 'react'
import { useScheduler } from '/src/hooks/scheduler.js'
import { useSanitizer } from '/src/hooks/sanitizer.js'

function Tooltip({ id = null, className = '', label = '' }) {
    const scheduler = useScheduler()
    const sanitizer = useSanitizer()

    const [displayingLabel, setDisplayingLabel] = useState('')
    const [isShowing, setIsShowing] = useState(false)

    const visibleClass = isShowing ? `` : `custom-tooltip-hidden`

    /** @listens label **/
    useEffect(() => {
        const tag = 'tooltip-' + id || 'custom-tooltip'
        scheduler.clearAllWithTag(tag)
        setIsShowing(false)

        if (!label) {
            setDisplayingLabel('')
            return
        }

        setDisplayingLabel(label)
        scheduler.schedule(
            () => {
                setIsShowing(true)
            },
            100,
            tag
        )
    }, [label])

    return (
        <div id={id} className={`custom-tooltip ${className} ${visibleClass}`}>
            <span dangerouslySetInnerHTML={sanitizer.sanitizeForReact(displayingLabel)} />
        </div>
    )
}

export default Tooltip
