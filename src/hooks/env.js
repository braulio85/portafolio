/**
 * @author Braulio Echeverría
 * @date 2025-12-30
 * @description Helper functions to safely access environment variables
 */

/**
 * Get environment variable with fallback
 * @param {string} key - Environment variable key (without VITE_ prefix)
 * @param {string} fallback - Fallback value if not found
 * @returns {string} Environment variable value or fallback
 */
const getEnvVar = (key, fallback = '') => {
    const value = import.meta.env[`VITE_${key}`]
    if (!value && !fallback && import.meta.env.DEV) {
        // Only log in development mode
        // eslint-disable-next-line no-console
        console.warn(`⚠️ Environment variable VITE_${key} is not set`)
    }
    return value || fallback
}

/**
 * Check if environment variable is set
 * @param {string} key - Environment variable key (without VITE_ prefix)
 * @returns {boolean} True if variable is set
 */
const hasEnvVar = (key) => {
    return Boolean(import.meta.env[`VITE_${key}`])
}

/**
 * Get all environment variables
 * @returns {Object} All environment variables
 */
const getAllEnvVars = () => {
    return import.meta.env
}

/**
 * Check if running in production
 * @returns {boolean} True if production environment
 */
const isProduction = () => {
    return import.meta.env.PROD
}

/**
 * Check if running in development
 * @returns {boolean} True if development environment
 */
const isDevelopment = () => {
    return import.meta.env.DEV
}

// Named exports
export { getEnvVar, hasEnvVar, getAllEnvVars, isProduction, isDevelopment }

// Hook export
export const useEnv = () => {
    return {
        getEnvVar,
        hasEnvVar,
        getAllEnvVars,
        isProduction,
        isDevelopment,
        
        // Specific getters for commonly used variables
        getEmailJsPublicKey: () => getEnvVar('EMAILJS_PUBLIC_KEY'),
        getEmailJsServiceId: () => getEnvVar('EMAILJS_SERVICE_ID'),
        getEmailJsTemplateId: () => getEnvVar('EMAILJS_TEMPLATE_ID'),
        getTurnstileSiteKey: () => getEnvVar('TURNSTILE_SITE_KEY'),
        getRecipientEmail: () => getEnvVar('RECIPIENT_EMAIL'),
    }
}
