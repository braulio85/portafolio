import './NumberAnimation.scss'
import React, { useEffect, useState } from 'react'
import { useScheduler } from '/src/hooks/scheduler.js'
import { useSanitizer } from '/src/hooks/sanitizer.js'

function NumberAnimation({
    targetValue,
    id,
    initialValue = 0,
    updateDelay = 10,
    format = `{n}`,
    className = '',
}) {
    const scheduler = useScheduler()
    const sanitizer = useSanitizer()

    const [currentValue, setCurrentValue] = useState(initialValue)
    const displayValue = format.replace(/{n}/g, currentValue.toString())

    useEffect(() => {
        scheduler.clearAllWithTag(id)

        const step = Math.floor((targetValue - currentValue) / updateDelay)

        let value = currentValue
        let lastTickTime = new Date().getTime()
        let tickInterval = 1000 / 30

        scheduler.interval(
            () => {
                const now = new Date().getTime()
                const elapsed = now - lastTickTime
                lastTickTime = now

                const dt = elapsed / tickInterval
                value += Math.round(step * dt)

                setCurrentValue(value)

                if (value >= targetValue) {
                    setCurrentValue(targetValue)
                    scheduler.clearAllWithTag(id)
                }
            },
            tickInterval,
            id
        )
    }, [targetValue])

    return (
        <span
            className={`number-animation ${className}`}
            dangerouslySetInnerHTML={sanitizer.sanitizeForReact(displayValue)}
        />
    )
}

export default NumberAnimation
