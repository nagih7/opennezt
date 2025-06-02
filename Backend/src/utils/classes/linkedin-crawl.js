import { LINKEDIN_PASSWORD, LINKEDIN_USERNAME } from '@/configs'
import puppeteer from 'puppeteer'

// Đối tượng quản lý phiên
const LinkedInSessionManager = {
    // Trạng thái phiên session
    _session: null,
    _initializationPromise: null,

    // Lấy phiên hiện tại nếu tồn tại
    getSession() {
        return this._session
    },

    // Kiểm tra xem quá trình initialization có đang diễn ra không
    isInitializing() {
        return this._initializationPromise !== null
    },

    // Lấy promise initialization hiện tại
    getInitPromise() {
        return this._initializationPromise
    },

    // Bắt đầu quá trình initialization
    startInitialization() {
        // Chỉ set nếu không có quá trình initialization
        if (this._initializationPromise === null) {
            this._initializationPromise = this._createSession()
        }
        return this._initializationPromise
    },

    // Set session thành giá trị mới
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
        // Chờ bất kỳ quá trình initialization nào đang diễn ra trước khi cleanup
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
    },
}

/**
 * Khởi tạo phiên scrape LinkedIn
 * @param {string} username - LinkedIn username/email
 * @param {string} password - LinkedIn password
 * @returns {Promise<Object>} - Browser session object
 */
async function initializeLinkedInSession(username, password) {
    const browser = await puppeteer.launch({
        headless: false, // false để hiển thị trình duyệt
        args: ['--disable-notifications'], // tắt thông báo
    })
    const page = await browser.newPage()

    try {
        // Đăng nhập vào LinkedIn
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
 * Lấy phiên LinkedIn, tạo mới nếu không tồn tại
 * @returns {Promise<Object>} - Browser session object
 */
async function getLinkedInSession() {
    // Nếu đã có phiên hợp lệ, trả về ngay lập tức
    const existingSession = LinkedInSessionManager.getSession()
    if (existingSession) {
        return existingSession
    }

    // Nếu quá trình initialization đã được bắt đầu, chờ nó hoàn tất
    if (LinkedInSessionManager.isInitializing()) {
        try {
            await LinkedInSessionManager.getInitPromise()
            return LinkedInSessionManager.getSession() // Trả về phiên được tạo bởi yêu cầu khác
        } catch (error) {
            // Nếu quá trình initialization khác thất bại, tiếp tục tạo mới
        }
    }

    // Bắt đầu quá trình initialization mới
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

        page.on('console', msg => {
            const type = msg.type()
            const text = msg.text()
            console.log(`[Browser ${type.toUpperCase()}]:`, text)
        })

        page.on('pageerror', error => {
            console.log('Page error:', error.message)
        })

        const skills = await page.evaluate(() => {
            console.log('Starting skill extraction...')
            const spans = Array.from(
                // eslint-disable-next-line no-undef
                document.querySelectorAll("span[aria-hidden='true']:not(.notification-badge__count)")
            )
            const imgs = Array.from(
                // eslint-disable-next-line no-undef
                document.querySelectorAll("img[alt='Skill badge']")
            )
            const rawTexts = spans.map(span => span.textContent.trim()).filter(text => text && !/^\d+$/.test(text))
            console.log(JSON.stringify(rawTexts, null, 2))

            // Blacklist keywords (UI elements, actions)
            const blacklistKeywords = ['Send profile', 'Save to PDF', 'Follow', 'Report', 'Block', 'About this profile', 'Messaging']

            // Check if text contains blacklisted keywords
            const isBlacklisted = text => {
                return blacklistKeywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()))
            }

            // Filter real skills and remove duplicates
            return [...new Set(rawTexts.filter(text => !isBlacklisted(text)))]
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
        // Lấy hoặc khởi tạo phiên LinkedIn
        const session = await getLinkedInSession()

        // Scrape skills using existing session
        const skills = await scrapeSkills(session.page, username)
        return skills || []
    } catch (error) {
        console.error('LinkedIn scraper error:', error.message)

        // Nếu có lỗi phiên, đặt lại phiên để nó sẽ được tạo lại lần sau
        if (error.message.includes('session') || error.message.includes('navigation')) {
            console.log('Phiên hợp lệ không hợp lệ. Sẽ tạo phiên mới lần sau.')
            await LinkedInSessionManager.cleanup()
            return []
        }
        return []
    }
}

export default getSkillsForProfile
