/**
 * Formats text content to improve text-to-speech quality
 * @param {string} content - The text content to be formatted
 * @returns {string} - The formatted content ready for text-to-speech conversion
 */
const formatContentForSpeech = (content) => {
    if (!content || typeof content !== 'string') {
        return ''
    }

    let formattedContent = content

    // Replace common abbreviations
    formattedContent = formattedContent.replace(/(\b)Dr\.(\s)/g, '$1Doctor$2')
    formattedContent = formattedContent.replace(/(\b)Mr\.(\s)/g, '$1Mister$2')
    formattedContent = formattedContent.replace(/(\b)Mrs\.(\s)/g, '$1Misses$2')
    formattedContent = formattedContent.replace(/(\b)Ms\.(\s)/g, '$1Miss$2')

    // Add pauses (using commas) around certain punctuation to improve pacing
    formattedContent = formattedContent.replace(/(\w)([.!?])(\s+\w)/g, '$1$2,$3')

    // Normalize spacing
    formattedContent = formattedContent.replace(/\s+/g, ' ').trim()

    // Convert numbers to words when appropriate (for Vietnamese, we might keep numbers as is)
    // For advanced number formatting specific to Vietnamese, additional logic would be needed

    // Handle special Vietnamese characters and diacritics properly
    // (Vietnamese-specific handling if needed)

    return formattedContent
}

export default formatContentForSpeech
