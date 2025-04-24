import { LINKEDIN_PASSWORD, LINKEDIN_USERNAME } from '@/configs'
import puppeteer from 'puppeteer'

/**
 * LinkedIn Skills Scraper Module
 * Functions to scrape skills from LinkedIn profiles
 */

// Session management object with synchronized access methods
const LinkedInSessionManager = {
    // Private session state
    _session: null,
    _initializationPromise: null,

    // Get current session if exists
    getSession() {
        return this._session
    },

    // Check if initialization is in progress
    isInitializing() {
        return this._initializationPromise !== null
    },

    // Get the current initialization promise
    getInitPromise() {
        return this._initializationPromise
    },

    // Start a new initialization process
    startInitialization() {
    // Only set if not already initializing
        if (this._initializationPromise === null) {
            this._initializationPromise = this._createSession()
        }
        return this._initializationPromise
    },

    // Set session to a new value
    setSession(session) {
        this._session = session
    },

    // Clear initialization promise
    clearInitPromise() {
        this._initializationPromise = null
    },

    // Reset the session
    resetSession() {
        this._session = null
    },

    // Create a new LinkedIn session
    async _createSession() {
        try {
            console.log('Creating new LinkedIn session...')
            const session = await initializeLinkedInSession(LINKEDIN_USERNAME, LINKEDIN_PASSWORD)
            this._session = session
            return session
        } catch (error) {
            this._session = null
            throw error
        } finally {
            this._initializationPromise = null
        }
    },

    // Cleanup session
    async cleanup() {
    // Wait for any ongoing initialization to complete before cleanup
        if (this._initializationPromise) {
            try {
                await this._initializationPromise
            } catch (error) {
                console.error('Error during session initialization that was in progress during cleanup:', error)
            }
            this._initializationPromise = null
        }

        if (this._session && this._session.browser) {
            console.log('Closing LinkedIn session...')
            await closeSession(this._session.browser)
            this._session = null
        }
    }
}

/**
 * Initialize a LinkedIn scraper session
 * @param {string} username - LinkedIn username/email
 * @param {string} password - LinkedIn password
 * @returns {Promise<Object>} - Browser session object
 */
async function initializeLinkedInSession(username, password) {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-notifications'],
    })
    const page = await browser.newPage()

    try {
        // Login to LinkedIn
        await page.goto('https://www.linkedin.com/login')
        await page.waitForSelector('#username')
        await page.type('#username', username)
        await page.type('#password', password)
        await page.click('.btn__primary--large.from__button--floating')
        await page.waitForNavigation()
        console.log('LinkedIn session initialized successfully')

        return { browser, page }
    } catch (error) {
        await browser.close()
        throw new Error(`LinkedIn login failed: ${error.message}`)
    }
}

/**
 * Get the LinkedIn session, creating a new one if it doesn't exist
 * @returns {Promise<Object>} - Browser session object
 */
async function getLinkedInSession() {
    // If there's already a valid session, return it immediately
    const existingSession = LinkedInSessionManager.getSession()
    if (existingSession) {
        return existingSession
    }

    // If a session initialization is already in progress, wait for it to complete
    if (LinkedInSessionManager.isInitializing()) {
        try {
            await LinkedInSessionManager.getInitPromise()
            return LinkedInSessionManager.getSession() // Return the session created by another request
        } catch (error) {
            // If the other initialization failed, continue to create a new one
        }
    }

    // Start a new initialization process
    return await LinkedInSessionManager.startInitialization()
}

/**
 * Scrape skills from a LinkedIn profile
 * @param {Object} page - Puppeteer page object
 * @param {string} profileId - LinkedIn profile ID
 * @returns {Promise<Array>} - Array of skills
 */
async function scrapeSkills(page, profileId) {
    const url = `https://www.linkedin.com/in/${profileId}/details/skills/`

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
        await page.waitForSelector("span[aria-hidden='true']", {
            timeout: 15000,
        })

        const skills = await page.evaluate(() => {
            const spans = Array.from(
                // eslint-disable-next-line no-undef
                document.querySelectorAll("span[aria-hidden='true']:not(.notification-badge__count)")
            )

            const rawTexts = spans.map((span) => span.textContent.trim()).filter((text) => text && !/^\d+$/.test(text))

            // Blacklist keywords (UI elements, actions)
            const blacklistKeywords = [
                'Send profile',
                'Save to PDF',
                'Follow',
                'Report',
                'Block',
                'About this profile',
                'Messaging',
            ]

            // Check if text contains blacklisted keywords
            const isBlacklisted = (text) => {
                return blacklistKeywords.some((keyword) => text.toLowerCase().includes(keyword.toLowerCase()))
            }

            // Filter real skills and remove duplicates
            return [...new Set(rawTexts.filter((text) => !isBlacklisted(text)))]
        })

        return skills
    } catch (error) {
        throw new Error(`Failed to scrape skills: ${error.message}`)
    }
}

/**
 * Close the browser session
 * @param {Object} browser - Puppeteer browser object
 */
async function closeSession(browser) {
    if (browser) {
        await browser.close()
    }
}

/**
 * Clean up LinkedIn session - should be called when app terminates
 */
export async function cleanupLinkedInSession() {
    await LinkedInSessionManager.cleanup()
}

async function getSkillsForProfile(username) {
    try {
        // Get or initialize LinkedIn session
        const session = await getLinkedInSession()

        // Scrape skills using existing session
        const skills = await scrapeSkills(session.page, username)
        return skills || [] // Return empty array if no skills found
    } catch (error) {
        console.error('LinkedIn scraper error:', error.message)
        
        // If there was a session error, reset the session so it will be recreated next time
        if (error.message.includes('session') || error.message.includes('navigation')) {
            console.log('Session appears to be invalid. Will create a new session on next request.')
            await LinkedInSessionManager.cleanup()
            return []
        }
        return []
    }
}

export default getSkillsForProfile
