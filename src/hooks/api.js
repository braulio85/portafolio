import emailjs from '@emailjs/browser'
import { Constants } from '/src/hooks/constants.js'
import { Utils } from '/src/hooks/utils.js'

export const useApi = () => {
    return {
        validators,
        handlers,
        analytics,
    }
}

const validators = {
    /**
     * @param {String} name
     * @param {String} email
     * @param {String} subject
     * @param {String} message
     */
    validateEmailRequest: (name, email, subject, message) => {
        const minWordCountForMessage = 3
        const validations = [
            {
                errorCode: Constants.ErrorCodes.VALIDATION_EMPTY_FIELDS,
                errorCondition: !name || !email || !subject || !message,
            },
            {
                errorCode: Constants.ErrorCodes.VALIDATION_EMAIL,
                errorCondition: !Utils.validation.validateEmail(email),
            },
            {
                errorCode: Constants.ErrorCodes.VALIDATION_MESSAGE_LENGTH,
                errorCondition: !Utils.validation.isLongerThan(message, minWordCountForMessage),
            },
            {
                errorCode: Constants.ErrorCodes.VALIDATION_MESSAGE_SPAM,
                errorCondition: Utils.validation.isSpam(message),
            },
        ]
        const error = validations.find((validation) => validation.errorCondition)
        return {
            success: !error,
            errorCode: error?.errorCode,
            errorParameter: error?.messageParameter,
            bundle: {
                name: name,
                from_name: name,
                email: email,
                from_email: email,
                custom_subject: subject,
                message: message,
                custom_source: Utils.url.getAbsoluteLocation(),
                custom_source_name: 'React Portfolio',
            },
        }
    },
}

const handlers = {
    /**
     * @return {Promise<{success: (*|boolean)}>}
     */
    dummyRequest: async () => {
        await new Promise((resolve) => setTimeout(resolve, 700))
        window._dummyRequestSuccess = !window._dummyRequestSuccess
        return {
            success: window._dummyRequestSuccess,
        }
    },

    /**
     * @param {Object} validationBundle
     * @param {String} publicKey
     * @param {String} serviceId
     * @param {String} templateId
     * @return {Promise<{success: boolean, rateLimited?: boolean}>}
     */
    sendEmailRequest: async (validationBundle, publicKey, serviceId, templateId) => {
        // Rate limiting: 3 emails per hour
        const RATE_LIMIT_KEY = 'email_rate_limit'
        const MAX_EMAILS = 3
        const TIME_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

        const now = Date.now()
        const rateLimitData = JSON.parse(
            localStorage.getItem(RATE_LIMIT_KEY) || '{"timestamps":[]}'
        )
        const recentTimestamps = rateLimitData.timestamps.filter((ts) => now - ts < TIME_WINDOW)
        if (recentTimestamps.length >= MAX_EMAILS) {
            const oldestTimestamp = Math.min(...recentTimestamps)
            const timeUntilReset = Math.ceil((TIME_WINDOW - (now - oldestTimestamp)) / 60000) // minutes
            return {
                success: false,
                rateLimited: true,
                timeUntilReset,
            }
        }
        emailjs.init(publicKey)
        const response = { success: false }
        try {
            const result = await emailjs.send(serviceId, templateId, validationBundle)
            response.success = result.status === 200
            if (response.success) {
                recentTimestamps.push(now)
                localStorage.setItem(
                    RATE_LIMIT_KEY,
                    JSON.stringify({ timestamps: recentTimestamps })
                )
            }
        } catch (error) {
            response.success = false
        }
        return response
    },

    /**
     * Sends an automatic acknowledgment email via the secure Cloud Function (Resend).
     * Failures are swallowed so EmailJS delivery remains the source of truth for you.
     * @param {{name: string, email: string, language?: string}} payload
     * @return {Promise<{success: boolean}>}
     */
    sendContactAcknowledgment: async (payload) => {
        const endpoint =
            (typeof import.meta !== 'undefined' &&
                import.meta.env &&
                import.meta.env.VITE_CONTACT_ACK_URL) ||
            '/api/contact-ack'

        try {
            const result = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: payload.name,
                    email: payload.email,
                    language: payload.language || 'es',
                }),
            })
            if (!result.ok) return { success: false }
            const data = await result.json().catch(() => ({}))
            return { success: Boolean(data?.success) }
        } catch (error) {
            return { success: false }
        }
    },
}

const analytics = {
    /**
     * @description This method can be used to report a visit to an external analytics service.
     * Here, you can integrate Google Analytics, Mixpanel, or your own custom analytics implementation.
     * @returns {Promise<void>}
     */
    reportVisit: async () => {
        await fetch('https://admin.ryanbalieiro.com/api/analytics/mock', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                params: {
                    url: Utils.url.getRootLocation(),
                    template_id: 'react-portfolio',
                },
            }),
        })
    },
}
