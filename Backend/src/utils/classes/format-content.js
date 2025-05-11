/**
 * Formats text content to improve text-to-speech quality with Vietnamese optimization
 * @param {string} content - The text content to be formatted
 * @returns {string} - The formatted content ready for text-to-speech conversion
 */
const formatContentForSpeech = (content) => {
    if (!content || typeof content !== 'string') {
        return ''
    }

    let formattedContent = content

    // Define replacement patterns in a more structured way
    const replacements = [
        // Markdown formatting
        { pattern: /\*\*(.*?)\*\*/g, replacement: '$1' }, // Remove bold (**text**)
        { pattern: /\*(.*?)\*/g, replacement: '$1' }, // Remove italic (*text*)
        { pattern: /__(.*?)__/g, replacement: '$1' }, // Remove underline (__text__)
        { pattern: /~~(.*?)~~/g, replacement: '$1' }, // Remove strikethrough (~~text~~)
        { pattern: /`(.*?)`/g, replacement: '$1' }, // Remove code formatting (`text`)

        // Strip HTML tags
        { pattern: /<[^>]*>/g, replacement: ' ' },

        // Vietnamese-specific abbreviations
        { pattern: /(\b)TS\.(\s)/g, replacement: '$1Tiến sĩ$2' },
        { pattern: /(\b)ThS\.(\s)/g, replacement: '$1Thạc sĩ$2' },
        { pattern: /(\b)GS\.(\s)/g, replacement: '$1Giáo sư$2' },
        { pattern: /(\b)PGS\.(\s)/g, replacement: '$1Phó giáo sư$2' },
        { pattern: /(\b)Ths\.(\s)/g, replacement: '$1Thạc sĩ$2' },
        { pattern: /(\b)BS\.(\s)/g, replacement: '$1Bác sĩ$2' },
        { pattern: /(\b)KS\.(\s)/g, replacement: '$1Kỹ sư$2' },
        { pattern: /(\b)CN\.(\s)/g, replacement: '$1Cử nhân$2' },
        { pattern: /(\b)TNTH(\s|\.)/g, replacement: '$1Tốt nghiệp trung học$2' },
        { pattern: /(\b)THPT(\s|\.)/g, replacement: '$1Trung học phổ thông$2' },
        { pattern: /(\b)THCS(\s|\.)/g, replacement: '$1Trung học cơ sở$2' },
        { pattern: /(\b)ĐH(\s|\.)/g, replacement: '$1Đại học$2' },
        { pattern: /(\b)CĐ(\s|\.)/g, replacement: '$1Cao đẳng$2' },

        // Common Vietnamese organizations and locations
        { pattern: /(\b)TP\.(\s)HCM/g, replacement: '$1Thành phố Hồ Chí Minh' },
        { pattern: /(\b)Tp\.(\s)HCM/g, replacement: '$1Thành phố Hồ Chí Minh' },
        { pattern: /(\b)HN(\b)/g, replacement: 'Hà Nội' },
        { pattern: /(\b)TPHCM(\b)/g, replacement: 'Thành phố Hồ Chí Minh' },
        { pattern: /(\b)TP(\.)(\s)(\w+)/g, replacement: '$1Thành phố$3$4' },

        // International abbreviations in Vietnamese context
        { pattern: /(\b)Dr\.(\s)/g, replacement: '$1Tiến sĩ$2' },
        { pattern: /(\b)Mr\.(\s)/g, replacement: '$1Ông$2' },
        { pattern: /(\b)Mrs\.(\s)/g, replacement: '$1Bà$2' },
        { pattern: /(\b)Ms\.(\s)/g, replacement: '$1Cô$2' },
        { pattern: /(\b)Prof\.(\s)/g, replacement: '$1Giáo sư$2' },
        { pattern: /(\b)No\.(\s)/g, replacement: '$1Số$2' },

        // Vietnamese measurement units
        { pattern: /(\d+)(\s*)(VNĐ|đ)/gi, replacement: '$1 đồng' },
        { pattern: /(\d+)(\s*)(tr)(\s|$)/gi, replacement: '$1 triệu$4' },
        { pattern: /(\d+)(\s*)(tỷ)(\s|$)/gi, replacement: '$1 tỷ$4' },
        { pattern: /(\d+)(\s*)(k)(\s|$)/gi, replacement: '$1 nghìn$4' },
        { pattern: /(\d+)(\s*)(m2|m²)(\s|$)/gi, replacement: '$1 mét vuông$4' },
        { pattern: /(\d+)(\s*)(km)(\s|$)/gi, replacement: '$1 ki lô mét$4' },
        { pattern: /(\d+)(\s*)(cm)(\s|$)/gi, replacement: '$1 xen ti mét$4' },

        // Vietnamese date formats (all variations)
        { pattern: /(\d{1,2})\/(\d{1,2})\/(\d{4})/g, replacement: 'ngày $1 tháng $2 năm $3' },
        { pattern: /(\d{1,2})-(\d{1,2})-(\d{4})/g, replacement: 'ngày $1 tháng $2 năm $3' },
        { pattern: /(\d{1,2})\.(\d{1,2})\.(\d{4})/g, replacement: 'ngày $1 tháng $2 năm $3' },

        // Vietnamese time formats
        { pattern: /(\d{1,2}):(\d{2})(\s*)(SA|AM)/gi, replacement: '$1 giờ $2 phút sáng' },
        { pattern: /(\d{1,2}):(\d{2})(\s*)(CH|PM)/gi, replacement: '$1 giờ $2 phút chiều' },
        {
            pattern: /(\d{1,2})h(\d{2})?/gi,
            replacement: (match, hours, minutes) => {
                return minutes ? `${hours} giờ ${minutes} phút` : `${hours} giờ`
            },
        },

        // Vietnamese special characters and punctuation
        { pattern: /&/g, replacement: ' và ' },
        { pattern: /%/g, replacement: ' phần trăm ' },
        { pattern: /\$/g, replacement: ' đô la ' },
        { pattern: /€/g, replacement: ' ơ rô ' },
        { pattern: /\+/g, replacement: ' cộng ' },
        { pattern: /=/g, replacement: ' bằng ' },
        { pattern: /#/g, replacement: ' thẻ ' },
        { pattern: /@/g, replacement: ' a còng ' },

        // Handle fractions in Vietnamese
        { pattern: /(\d+)\/(\d+)/g, replacement: '$1 phần $2' },

        // Phone number formatting for better reading
        { pattern: /(\d{3})(\d{3})(\d{4})/g, replacement: '$1 $2 $3' },
        { pattern: /(\d{4})(\d{3})(\d{3})/g, replacement: '$1 $2 $3' },

        // Improve URL and email readability in Vietnamese context
        { pattern: /(https?:\/\/[^\s]+)/g, replacement: 'đường dẫn' },
        { pattern: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g, replacement: 'địa chỉ email' },

        // Add pauses (using commas) around certain punctuation to improve pacing
        { pattern: /(\w)([.!?])(\s+\w)/g, replacement: '$1$2,$3' },
        { pattern: /(\w)([:;])(\s+\w)/g, replacement: '$1$2,$3' },

        // Add pause after list markers for better rhythm
        { pattern: /(\d+\.)(\s+\w)/g, replacement: '$1,$2' },
        { pattern: /(\s[-•*])(\s+\w)/g, replacement: '$1,$2' },

        // Handle parenthetical phrases in Vietnamese
        { pattern: /\(([^)]+)\)/g, replacement: ', $1, ' },

        // Normalize spacing
        { pattern: /\s+/g, replacement: ' ' },

        // Handle ellipses by replacing with pause
        { pattern: /\.{3,}/g, replacement: ', ' },

        // Replace repeated punctuation with single instance
        { pattern: /([!?]){2,}/g, replacement: '$1' },
    ]

    // Apply all replacements
    replacements.forEach(({ pattern, replacement }) => {
        formattedContent = formattedContent.replace(pattern, replacement)
    })

    // Handle English/Vietnamese code switching (common in technical contexts)
    // We keep these terms as is because TTS systems typically handle them well in context

    return formattedContent
}

export default formatContentForSpeech
