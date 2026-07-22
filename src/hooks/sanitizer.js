/**
 * @author Braulio Echeverría
 * @date 2025-12-30
 * @description Hook for sanitizing HTML content to prevent XSS attacks
 */

import DOMPurify from 'dompurify'

/**
 * Configuration for DOMPurify
 */
const SANITIZE_CONFIG = {
    ALLOWED_TAGS: [
        'b',
        'i',
        'em',
        'strong',
        'u',
        'br',
        'p',
        'span',
        'div',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'ul',
        'ol',
        'li',
        'a',
    ],
    ALLOWED_ATTR: ['class', 'id', 'href', 'target', 'rel', 'style'],
    ALLOW_DATA_ATTR: false,
    ALLOWED_URI_REGEXP:
        /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,
}

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} html - The HTML string to sanitize
 * @param {Object} config - Optional DOMPurify configuration
 * @returns {string} Sanitized HTML
 */
export const useSanitizer = () => {
    const sanitize = (html, config = SANITIZE_CONFIG) => {
        if (!html) return ''
        return DOMPurify.sanitize(html, config)
    }

    /**
     * Sanitize and return object for dangerouslySetInnerHTML
     * @param {string} html - The HTML string to sanitize
     * @returns {Object} Object with __html property
     */
    const sanitizeForReact = (html) => {
        return { __html: sanitize(html) }
    }

    /**
     * Check if content is safe (doesn't contain potentially dangerous elements)
     * @param {string} html - The HTML string to check
     * @returns {boolean} True if content is safe
     */
    const isSafe = (html) => {
        if (!html) return true
        const sanitized = sanitize(html)
        return sanitized === html
    }

    return {
        sanitize,
        sanitizeForReact,
        isSafe,
    }
}
