import './SectionHeader.scss'
import React, { useEffect, useState } from 'react'
import { useViewport } from '/src/providers/ViewportProvider.jsx'
import { useParser } from '/src/hooks/parser.js'
import { useSanitizer } from '/src/hooks/sanitizer.js'

function SectionHeader({ section }) {
    const viewport = useViewport()
    const parser = useParser()
    const sanitizer = useSanitizer()

    const isMobileLayout = viewport.isMobileLayout()
    const parsedTitle = parser.parseSectionTitle(section)

    const HeadingTag = section?.id === 'about' ? 'h1' : 'h2'
    const titleClass = !isMobileLayout ? `lead-4` : ``

    return (
        <header className={`section-header`}>
            {parsedTitle.prefix && (
                <div className={`section-header-prefix lead-2 mb-2`}>
                    <i className={`fa-solid fa-cubes`} />
                    <span dangerouslySetInnerHTML={sanitizer.sanitizeForReact(parsedTitle.prefix)} />
                </div>
            )}

            <HeadingTag
                className={`section-header-title ${titleClass} h3`}
                dangerouslySetInnerHTML={sanitizer.sanitizeForReact(parsedTitle.title)}
            />
        </header>
    )
}

export default SectionHeader
