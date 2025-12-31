import './Tags.scss'
import React, { useEffect, useState } from 'react'
import { useTheme } from '/src/providers/ThemeProvider.jsx'
import { useSanitizer } from '/src/hooks/sanitizer.js'

function Tags({ children, className = '' }) {
    return <ul className={`tags ${className}`}>{children}</ul>
}

function Tag({ text, variant = 'tag-default', className = '' }) {
    const theme = useTheme()
    const sanitizer = useSanitizer()
    const [transitionClass, setTransitionClass] = useState(``)

    useEffect(() => {
        setTransitionClass(`tag-no-transition`)
        setTimeout(() => {
            setTransitionClass(``)
        }, 1000 / 30)
    }, [theme.getSelectedTheme()])

    return (
        <li
            className={`tag ${className} ${variant} ${transitionClass}`}
            dangerouslySetInnerHTML={sanitizer.sanitizeForReact(text)}
        />
    )
}

Tag.Variants = {
    DEFAULT: 'tag-default',
    DARK: 'tag-dark',
}

export { Tags, Tag }
