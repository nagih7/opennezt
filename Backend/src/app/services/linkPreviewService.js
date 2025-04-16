import { timeout } from 'cron'
import axios from 'axios'
import * as cheerio from 'cheerio' // Fix import syntax

export const getLinkPreview = async (url) => {
    try {
        if (!url) {
            return {
                success: false,
                message: 'URL is required',
            }
        }

        const response = await axios.get(url, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
            },
            timeout: 10000,
            maxRedirects: 5,
            validateStatus: (status) => status < 400,
        })
        const html = response.data
        const $ = cheerio.load(html)

        const preview = {
            title: $('meta[property="og:title"]').attr('content') || $('title').text() || '',
            description:
                $('meta[property="og:description"]').attr('content') ||
                $('meta[name="description"]').attr('content') ||
                '',
            image:
                $('meta[property="og:image"]').attr('content') ||
                $('meta[property="twitter:image"]').attr('content') ||
                '',
            url: url,
        }

        Object.keys(preview).forEach((key) => {
            preview[key] = preview[key]?.trim() || ''
        })

        return {
            success: true,
            data: preview,
        }
    } catch (error) {
        console.error('Error fetching link preview:', error)
        return {
            success: false,
            message: 'Failed to fetch link preview. Please check the URL.',
            error: error.message,
        }
    }
}
