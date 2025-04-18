import { LINKEDIN_PASSWORD, LINKEDIN_USERNAME } from '@/configs'
import puppeteer from 'puppeteer'

/**
 * LinkedIn Skills Scraper Module
 * Functions to scrape skills from LinkedIn profiles
 */

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
        console.log('Login successful')

        return { browser, page }
    } catch (error) {
        await browser.close()
        throw new Error(`Login failed: ${error.message}`)
    }
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

// /**
//  * Example usage with interactive console mode
//  * @param {string} username - LinkedIn username
//  * @param {string} password - LinkedIn password
//  */
// async function runInteractiveMode(username, password) {
//     const readline = require('readline').createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     })

//     let session
//     try {
//         session = await initializeLinkedInSession(username, password)

//         const askForID = async () => {
//             readline.question("Enter LinkedIn profile ID (or 'exit' to quit): ", async (profileId) => {
//                 if (profileId.toLowerCase() === 'exit') {
//                     await closeSession(session.browser)
//                     readline.close()
//                     return
//                 }

//                 try {
//                     const skills = await scrapeSkills(session.page, profileId)

//                     console.log('\n=== SKILLS LIST ===')
//                     skills.forEach((skill, index) => {
//                         console.log(`Skill ${index + 1}: ${skill}`)
//                     })
//                     console.log(`\nTotal valid skills: ${skills.length}\n`)
//                 } catch (error) {
//                     console.error(`Error: ${error.message}`)
//                 }

//                 askForID() // Continue asking for new IDs
//             })
//         }

//         askForID()
//     } catch (error) {
//         console.error(`Session error: ${error.message}`)
//         if (session && session.browser) {
//             await closeSession(session.browser)
//         }
//         readline.close()
//     }
// }

async function getSkillsForProfile(username) {
    let session

    try {
        // Initialize LinkedIn session
        session = await initializeLinkedInSession(LINKEDIN_USERNAME, LINKEDIN_PASSWORD)

        // Scrape skills
        const skills = await scrapeSkills(session.page, username)

        // Log results
        console.log(`Skills for profile ${username}:`, skills)
        return skills
    } catch (error) {
        console.error('Error:', error.message)
    } finally {
        // Clean up
        if (session && session.browser) {
            await closeSession(session.browser)
        }
    }
}

export default getSkillsForProfile
