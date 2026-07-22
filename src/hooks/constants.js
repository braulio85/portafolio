/**
 * @author Braulio Echeverría
 * @date 2025-05-10
 * @description This hook provides constants that are used throughout the application.
 */

export const Constants = {
    /** @enum */
    ErrorCodes: {
        FILE_NOT_FOUND: 'error_file_not_found',
        MESSAGE_SUBMIT_FAILED: 'error_sending_message',
        VALIDATION_EMPTY_FIELDS: 'error_validation_empty_fields',
        VALIDATION_EMAIL: 'error_validation_email',
        VALIDATION_MESSAGE_LENGTH: 'error_validation_message_length',
        VALIDATION_MESSAGE_SPAM: 'error_validation_message_spam',
    },
    /** @const */
    HTML_CLASSES: {
        bodyAfterLoading: 'body-theme',
        imageView: 'image-view-img',
        scrollbarDecorator: 'scrollbar-decorator',
        textHighlight: 'text-primary',
    },
    /** @const */
    MODE: import.meta.env.MODE,
    /** @const */
    get PRODUCTION_MODE() {
        return this.MODE === 'production'
    },
    /** @const */
    SECTION_TRANSITION_TOTAL_TIME: 800,
    /** @const */
    SWIPER_BREAKPOINTS_FOR_THREE_SLIDES: {
        0: { id: 'bp-0', slidesPerView: 1 },
        650: { id: 'bp-1', slidesPerView: 2 },
        991: { id: 'bp-2', slidesPerView: 1 },
        1050: { id: 'bp-3', slidesPerView: 2 },
        1600: { id: 'bp-4', slidesPerView: 3 },
    },
    /** @const */
    SWIPER_BREAKPOINTS_FOR_FOUR_SLIDES: {
        0: { id: 'bp-0', slidesPerView: 2 },
        650: { id: 'bp-1', slidesPerView: 3 },
        767: { id: 'bp-2', slidesPerView: 2 },
        900: { id: 'bp-3', slidesPerView: 3 },
        1600: { id: 'bp-4', slidesPerView: 4 },
    },
    /** @const */
    TRACKABLE_CLASSES: [
        { name: 'scrollbar-track', faIcon: 'fa-solid fa-up-down' },
        { name: 'scrollbar-thumb', faIcon: 'fa-solid fa-up-down' },
        { name: 'swiper-pagination-bullet', icon: null },
    ],
}

// Hook para usar Constants de forma consistente con el resto del proyecto
export function useConstants() {
    return Constants
}
