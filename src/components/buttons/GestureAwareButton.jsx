import './GestureAwareButton.scss'
import React, { useEffect, useState } from 'react'

function GestureAwareButton({
    children,
    className = '',
    onClick = null,
    tooltip = '',
    disabled = false,
    href = null,
    hrefToolTip = null,
}) {
    const [isTouched, setIsTouched] = useState(false)
    const [dispatchClickAt, setDispatchClickAt] = useState(0)

    // Prefer explicit href; keep hrefToolTip as a backward-compatible alias
    const resolvedHref = href || hrefToolTip || undefined

    useEffect(() => {
        if (!dispatchClickAt) return
        onClick && onClick()
    }, [dispatchClickAt])

    const _onTouchStart = (e) => {
        setIsTouched(true)
    }

    const _onTouchMove = (e) => {
        setIsTouched(false)
    }

    const _onTouchEnd = (e) => {
        if (isTouched) _dispatchClick()
        setIsTouched(false)
    }

    const _onClick = (e) => {
        // Keep SPA navigation, but leave href in the DOM for crawlers
        if (resolvedHref) {
            e.preventDefault()
        }
        e.stopPropagation()
        _dispatchClick()
    }

    const _dispatchClick = () => {
        const now = new Date().getTime()
        const timespan = now - dispatchClickAt
        if (timespan > 150) {
            setDispatchClickAt(now)
        }
    }

    return (
        <a
            className={`gesture-aware-button ${className}`}
            data-tooltip={tooltip}
            href={resolvedHref}
            onTouchStart={_onTouchStart}
            onTouchMove={_onTouchMove}
            onTouchEnd={_onTouchEnd}
            onClick={_onClick}
            draggable={false}
            aria-disabled={disabled || undefined}
        >
            {children}
        </a>
    )
}

export default GestureAwareButton
