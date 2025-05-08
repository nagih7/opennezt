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

    // Remove markdown formatting (bold, italic, etc.)
    formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold (**text**)
    formattedContent = formattedContent.replace(/\*(.*?)\*/g, '$1') // Remove italic (*text*)
    formattedContent = formattedContent.replace(/__(.*?)__/g, '$1') // Remove underline (__text__)
    formattedContent = formattedContent.replace(/~~(.*?)~~/g, '$1') // Remove strikethrough (~~text~~)
    formattedContent = formattedContent.replace(/`(.*?)`/g, '$1') // Remove code formatting (`text`)

    // Strip HTML tags while preserving content
    formattedContent = formattedContent.replace(/<[^>]*>/g, ' ')

    // Vietnamese-specific abbreviations and terms
    formattedContent = formattedContent.replace(/(\b)TS\.(\s)/g, '$1Tiến sĩ$2')
    formattedContent = formattedContent.replace(/(\b)ThS\.(\s)/g, '$1Thạc sĩ$2')
    formattedContent = formattedContent.replace(/(\b)GS\.(\s)/g, '$1Giáo sư$2')
    formattedContent = formattedContent.replace(/(\b)PGS\.(\s)/g, '$1Phó giáo sư$2')
    formattedContent = formattedContent.replace(/(\b)Ths\.(\s)/g, '$1Thạc sĩ$2')
    formattedContent = formattedContent.replace(/(\b)BS\.(\s)/g, '$1Bác sĩ$2')
    formattedContent = formattedContent.replace(/(\b)KS\.(\s)/g, '$1Kỹ sư$2')
    formattedContent = formattedContent.replace(/(\b)CN\.(\s)/g, '$1Cử nhân$2')
    formattedContent = formattedContent.replace(/(\b)TNTH(\s|\.)/g, '$1Tốt nghiệp trung học$2')
    formattedContent = formattedContent.replace(/(\b)THPT(\s|\.)/g, '$1Trung học phổ thông$2')
    formattedContent = formattedContent.replace(/(\b)THCS(\s|\.)/g, '$1Trung học cơ sở$2')
    formattedContent = formattedContent.replace(/(\b)ĐH(\s|\.)/g, '$1Đại học$2')
    formattedContent = formattedContent.replace(/(\b)CĐ(\s|\.)/g, '$1Cao đẳng$2')

    // Common Vietnamese organizations and locations
    formattedContent = formattedContent.replace(/(\b)TP\.(\s)HCM/g, '$1Thành phố Hồ Chí Minh')
    formattedContent = formattedContent.replace(/(\b)Tp\.(\s)HCM/g, '$1Thành phố Hồ Chí Minh')
    formattedContent = formattedContent.replace(/(\b)HN(\b)/g, 'Hà Nội')
    formattedContent = formattedContent.replace(/(\b)TPHCM(\b)/g, 'Thành phố Hồ Chí Minh')
    formattedContent = formattedContent.replace(/(\b)TP(\.)(\s)(\w+)/g, '$1Thành phố$3$4')

    // International abbreviations in Vietnamese context
    formattedContent = formattedContent.replace(/(\b)Dr\.(\s)/g, '$1Tiến sĩ$2')
    formattedContent = formattedContent.replace(/(\b)Mr\.(\s)/g, '$1Ông$2')
    formattedContent = formattedContent.replace(/(\b)Mrs\.(\s)/g, '$1Bà$2')
    formattedContent = formattedContent.replace(/(\b)Ms\.(\s)/g, '$1Cô$2')
    formattedContent = formattedContent.replace(/(\b)Prof\.(\s)/g, '$1Giáo sư$2')
    formattedContent = formattedContent.replace(/(\b)No\.(\s)/g, '$1Số$2')

    // Vietnamese measurement units
    formattedContent = formattedContent.replace(/(\d+)(\s*)(VNĐ|đ)/gi, '$1 đồng')
    formattedContent = formattedContent.replace(/(\d+)(\s*)(tr)(\s|$)/gi, '$1 triệu$4')
    formattedContent = formattedContent.replace(/(\d+)(\s*)(tỷ)(\s|$)/gi, '$1 tỷ$4')
    formattedContent = formattedContent.replace(/(\d+)(\s*)(k)(\s|$)/gi, '$1 nghìn$4')
    formattedContent = formattedContent.replace(/(\d+)(\s*)(m2|m²)(\s|$)/gi, '$1 mét vuông$4')
    formattedContent = formattedContent.replace(/(\d+)(\s*)(km)(\s|$)/gi, '$1 ki lô mét$4')
    formattedContent = formattedContent.replace(/(\d+)(\s*)(cm)(\s|$)/gi, '$1 xen ti mét$4')

    // Vietnamese date formats (all variations)
    formattedContent = formattedContent.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/g, 'ngày $1 tháng $2 năm $3')
    formattedContent = formattedContent.replace(/(\d{1,2})-(\d{1,2})-(\d{4})/g, 'ngày $1 tháng $2 năm $3')
    formattedContent = formattedContent.replace(/(\d{1,2})\.(\d{1,2})\.(\d{4})/g, 'ngày $1 tháng $2 năm $3')

    // Vietnamese time formats
    formattedContent = formattedContent.replace(/(\d{1,2}):(\d{2})(\s*)(SA|AM)/gi, '$1 giờ $2 phút sáng')
    formattedContent = formattedContent.replace(/(\d{1,2}):(\d{2})(\s*)(CH|PM)/gi, '$1 giờ $2 phút chiều')
    formattedContent = formattedContent.replace(/(\d{1,2})h(\d{2})?/gi, (match, hours, minutes) => {
        return minutes ? `${hours} giờ ${minutes} phút` : `${hours} giờ`
    })

    // Vietnamese special characters and punctuation
    formattedContent = formattedContent.replace(/&/g, ' và ')
    formattedContent = formattedContent.replace(/%/g, ' phần trăm ')
    formattedContent = formattedContent.replace(/\$/g, ' đô la ')
    formattedContent = formattedContent.replace(/€/g, ' ơ rô ')
    formattedContent = formattedContent.replace(/\+/g, ' cộng ')
    formattedContent = formattedContent.replace(/=/g, ' bằng ')
    formattedContent = formattedContent.replace(/#/g, ' thẻ ')
    formattedContent = formattedContent.replace(/@/g, ' a còng ')

    // Handle fractions in Vietnamese
    formattedContent = formattedContent.replace(/(\d+)\/(\d+)/g, '$1 phần $2')

    // Phone number formatting for better reading
    formattedContent = formattedContent.replace(/(\d{3})(\d{3})(\d{4})/g, '$1 $2 $3')
    formattedContent = formattedContent.replace(/(\d{4})(\d{3})(\d{3})/g, '$1 $2 $3')

    // Improve URL and email readability in Vietnamese context
    formattedContent = formattedContent.replace(/(https?:\/\/[^\s]+)/g, 'đường dẫn')
    formattedContent = formattedContent.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g, 'địa chỉ email')

    // Add pauses (using commas) around certain punctuation to improve pacing
    formattedContent = formattedContent.replace(/(\w)([.!?])(\s+\w)/g, '$1$2,$3')
    formattedContent = formattedContent.replace(/(\w)([:;])(\s+\w)/g, '$1$2,$3')

    // Add pause after list markers for better rhythm
    formattedContent = formattedContent.replace(/(\d+\.)(\s+\w)/g, '$1,$2')
    formattedContent = formattedContent.replace(/(\s[-•*])(\s+\w)/g, '$1,$2')

    // Handle parenthetical phrases in Vietnamese
    formattedContent = formattedContent.replace(/\(([^)]+)\)/g, ', $1, ')

    // Normalize spacing
    formattedContent = formattedContent.replace(/\s+/g, ' ').trim()

    // Handle ellipses by replacing with pause
    formattedContent = formattedContent.replace(/\.{3,}/g, ', ')

    // Replace repeated punctuation with single instance
    formattedContent = formattedContent.replace(/([!?]){2,}/g, '$1')

    // Handle English/Vietnamese code switching (common in technical contexts)
    // We keep these terms as is because TTS systems typically handle them well in context

    return formattedContent
}

export default formatContentForSpeech
