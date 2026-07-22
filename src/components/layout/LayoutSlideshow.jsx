import './LayoutSlideshow.scss'
import React, { useEffect, useState } from 'react'
import Section from '/src/components/sections/Section.jsx'
import { useNavigation } from '/src/providers/NavigationProvider.jsx'

function LayoutSlideshow({ sections, currentSection, previousSection }) {
    const navigation = useNavigation()

    const isTransitioning = navigation.isTransitioning()
    const transitioningClass = isTransitioning ? `layout-slideshow-transitioning` : ``

    const _shouldTransition = (section) => {
        const isCurrentOrPrevious = section === currentSection || section === previousSection
        return isCurrentOrPrevious && isTransitioning
    }

    return (
        <main className={`layout-slideshow ${transitioningClass}`} role="main">
            {sections.map((section, index) => (
                <Section
                    key={section.id}
                    section={section}
                    visible={section === currentSection}
                    shouldTransition={_shouldTransition(section)}
                />
            ))}
        </main>
    )
}

export default LayoutSlideshow
