import React from 'react'

// Type definitions
interface FormatOptions {
   allowLinks?: boolean
   allowLineBreaks?: boolean
   allowMarkdown?: boolean
}

interface ListItem {
   type: 'ul' | 'ol'
   indent: number
   items: React.ReactElement[]
   id: string
}

interface CodeBlockResult {
   element: React.ReactElement
   endLine: number
}



/**
 * Formats a message string with markdown-like syntax into React elements
 * Supported formatting:
 * - Headers (# Header, ## Header, etc.)
 * - Bold (**text**)
 * - Italic (*text*)
 * - Code blocks (```code```)
 * - Inline code (`code`)
 * - Unordered lists (* Item or - Item)
 * - Ordered lists (1. Item)
 * - Links [text](url)
 * - Automatic URL detection
 * - Nested lists with proper indentation
 */
function formatMessage(message: string, options: FormatOptions = {}): React.ReactNode {
   // Default options
   const { allowLinks = true, allowLineBreaks = true, allowMarkdown = true } = options

   if (!message) return null

   // If we're not processing any formatting, just return the plain text
   if (!allowMarkdown && !allowLinks && !allowLineBreaks) {
      return message
   }

   // Simple escape for HTML to prevent XSS
   const escapeHTML = (str: string): string => {
      return str
         .replace(/&/g, '&amp;')
         .replace(/</g, '&lt;')
         .replace(/>/g, '&gt;')
         .replace(/"/g, '&quot;')
         .replace(/'/g, '&#39;')
   }

   if (!allowMarkdown) {
      // If we're only handling links and/or line breaks
      const escaped = escapeHTML(message)
      if (allowLinks) {
         const linkedText = processLinks(escaped)
         if (allowLineBreaks) {
            if (typeof linkedText === 'string') {
               return convertLineBreaks(linkedText)
            }
            return linkedText
         }
         return linkedText
      }

      if (allowLineBreaks) {
         return convertLineBreaks(escaped)
      }

      return escaped
   }   // Full markdown processing
   const escaped = escapeHTML(message)
   const lines = escaped.split('\n')
   const formattedElements: React.ReactNode[] = []

   // State tracking for lists
   let listStack: ListItem[] = [] // Stack to track nested lists
   let currentList: ListItem | null = null // Current list being built

   for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trimEnd()

      // Check for headers (# Header)
      if (line.match(/^#{1,6}\s+.+/)) {
         // Close any open lists
         closeAllLists(listStack, formattedElements)

         const levelMatch = line.match(/^(#{1,6})/)
         const level = levelMatch ? levelMatch[0].length : 1
         const headerText = line.replace(/^#{1,6}\s+/, '')
         formattedElements.push(
            <React.Fragment key={`h-line-${i}`}>
               {React.createElement(
                  `h${level}`,
                  {
                     className: `text-${7 - level}xl font-bold my-2`,
                     key: `h-${i}`,
                  },
                  processInlineFormatting(headerText, allowLinks)
               )}
            </React.Fragment>
         )
         continue
      }

      // Check for code blocks
      if (line.startsWith('```') && !currentList) {
         const codeBlockResult = processCodeBlock(lines, i)
         if (codeBlockResult) {
            formattedElements.push(codeBlockResult.element)
            i = codeBlockResult.endLine // Skip to the end of the code block
            continue
         }
      }

      // Check for unordered list items with indentation level
      const unorderedMatch = line.match(/^(\s*)[*-]\s+(.+)$/)
      if (unorderedMatch) {
         const [_, indent, content] = unorderedMatch
         const indentLevel = indent.length

         // Process the list item
         processListItem('ul', indentLevel, content, i, listStack, currentList, formattedElements, allowLinks)
         continue
      }

      // Check for ordered list items with indentation level
      const orderedMatch = line.match(/^(\s*)(\d+)\.?\s+(.+)$/)
      if (orderedMatch) {
         const [_, indent, _number, content] = orderedMatch
         const indentLevel = indent.length

         // Process the list item
         processListItem('ol', indentLevel, content, i, listStack, currentList, formattedElements, allowLinks)
         continue
      }

      // If we reach a blank line or non-list line, close all lists
      if (line.trim() === '' || (!unorderedMatch && !orderedMatch)) {
         closeAllLists(listStack, formattedElements)

         // Regular text lines
         if (line.trim() !== '') {
            formattedElements.push(
               <React.Fragment key={`line-${i}`}>{processInlineFormatting(line, allowLinks)}</React.Fragment>
            )
         } else if (i < lines.length - 1) {
            // Don't add trailing empty lines
            formattedElements.push(<br key={`br-${i}`} />)
         }
      }
   }

   // Close any open lists at the end
   closeAllLists(listStack, formattedElements)

   // Combine adjacent text elements to improve rendering performance
   return optimizeElements(formattedElements)
}

/**
 * Process a list item and update the list stack accordingly
 */
function processListItem(
   listType: 'ul' | 'ol',
   indentLevel: number,
   content: string,
   index: number,
   listStack: ListItem[],
   currentList: ListItem | null,
   formattedElements: React.ReactNode[],
   allowLinks: boolean
): void {
   // Handle list nesting based on indent level
   while (listStack.length > 0 && listStack[listStack.length - 1].indent > indentLevel) {      const completedList = listStack.pop()
      
      if (!completedList) continue

      if (listStack.length === 0) {
         // This is a top-level list, add it to formatted elements
         formattedElements.push(createList(completedList.items, completedList.type, `list-${completedList.id}`))
      } else {         // This is a nested list, add it as a child to parent list item
         const parentList = listStack[listStack.length - 1]
         const lastItem = parentList.items[parentList.items.length - 1] as React.ReactElement<any>

         // If the last item already has children, add to them
         if (Array.isArray(lastItem.props.children)) {
            const updatedChildren = [...lastItem.props.children]
            updatedChildren.push(createList(completedList.items, completedList.type, `nested-${completedList.id}`))

            parentList.items[parentList.items.length - 1] = <li key={lastItem.key}>{updatedChildren}</li>
         } else {
            // Start a new children array with the content and the nested list
            const originalContent = lastItem.props.children
            parentList.items[parentList.items.length - 1] = (
               <li key={lastItem.key}>
                  {[originalContent, createList(completedList.items, completedList.type, `nested-${completedList.id}`)]}
               </li>
            )
         }
      }
   }

   // If no matching list for this indent level, start a new one
   if (listStack.length === 0 || listStack[listStack.length - 1].indent !== indentLevel) {
      const newListId = `${listType}-${indentLevel}-${Date.now()}-${index}`
      const newList = {
         type: listType,
         indent: indentLevel,
         items: [],
         id: newListId,
      }
      listStack.push(newList)
   }

   // Get the current list from the stack
   currentList = listStack[listStack.length - 1]

   // Add item to the current list
   currentList.items.push(<li key={`li-${index}`}>{processInlineFormatting(content, allowLinks)}</li>)
}

/**
 * Close all open lists in the stack and add them to formatted elements
 */
function closeAllLists(listStack: ListItem[], formattedElements: React.ReactNode[]): void {
   while (listStack.length > 0) {
      const list = listStack.pop()
      
      if (!list) continue

      if (listStack.length === 0) {
         formattedElements.push(createList(list.items, list.type, `list-${list.id}`))
      } else {
         const parentList = listStack[listStack.length - 1]
         const lastItem = parentList.items[parentList.items.length - 1] as React.ReactElement<any>

         if (Array.isArray(lastItem.props.children)) {
            // If children already exist, append to them
            const updatedChildren = [...lastItem.props.children]
            updatedChildren.push(createList(list.items, list.type, `nested-${list.id}`))

            parentList.items[parentList.items.length - 1] = <li key={lastItem.key}>{updatedChildren}</li>
         } else {
            // Create new children array
            const originalContent = lastItem.props.children
            parentList.items[parentList.items.length - 1] = (
               <li key={lastItem.key}>{[originalContent, createList(list.items, list.type, `nested-${list.id}`)]}</li>
            )
         }
      }
   }
}

/**
 * Create a list React element
 */
function createList(items: React.ReactElement[], type: 'ul' | 'ol', key: string): React.ReactElement {
   if (type === 'ul') {
      return (
         <ul className="my-2 ml-5 list-disc" key={key}>
            {items}
         </ul>
      )
   } else {
      return (
         <ol className="my-2 ml-5 list-decimal" key={key}>
            {items}
         </ol>
      )
   }
}

/**
 * Process a code block
 */
function processCodeBlock(lines: string[], startLineIndex: number): CodeBlockResult | null {
   const startLine = lines[startLineIndex]
   const languageMatch = startLine.match(/^```(\w*)/)
   const language = languageMatch ? languageMatch[1] : ''

   // Find the closing code fence
   let endLineIndex = startLineIndex
   for (let j = startLineIndex + 1; j < lines.length; j++) {
      if (lines[j].trim() === '```') {
         endLineIndex = j
         break
      }
   }

   if (endLineIndex > startLineIndex) {
      // Extract the code content
      const codeContent = lines.slice(startLineIndex + 1, endLineIndex).join('\n')

      // Create the code block element
      const element = (
         <pre key={`code-${startLineIndex}`} className="p-4 my-4 overflow-x-auto bg-gray-100 rounded">
            <code className={language ? `language-${language}` : ''}>{codeContent}</code>
         </pre>
      )

      return { element, endLine: endLineIndex }
   }

   return null
}

/**
 * Process inline formatting (bold, italic, code, links)
 */
function processInlineFormatting(text: string, enableLinks: boolean = true): React.ReactNode {
   if (!text) return ''

   // First handle code spans to avoid processing markdown inside them
   const parts = []
   const codeRegex = /`([^`]+)`/g
   let lastIndex = 0
   let match

   while ((match = codeRegex.exec(text)) !== null) {
      // Add text before code span
      if (match.index > lastIndex) {
         parts.push({
            type: 'text',
            content: text.substring(lastIndex, match.index),
         })
      }

      // Add code span
      parts.push({
         type: 'code',
         content: match[1],
      })

      lastIndex = codeRegex.lastIndex
   }

   // Add remaining text
   if (lastIndex < text.length) {
      parts.push({
         type: 'text',
         content: text.substring(lastIndex),
      })
   }   // Process other formatting for text parts
   return parts.map((part, i) => {
      if (part.type === 'code') {
         return (
            <code key={`code-${i}`} className="px-1 py-0.5 bg-gray-100 text-red-600 rounded">
               {part.content}
            </code>
         )
      } else {
         let content: React.ReactNode = part.content

         // Process bold and italic
         content = processBoldAndItalic(part.content)

         // Process links if enabled
         if (enableLinks) {
            content = processLinks(content as any)
         }

         return content
      }
   })
}

/**
 * Process bold and italic formatting
 */
function processBoldAndItalic(text: string): React.ReactNode[] {
   const result = []

   // Split by bold markers
   const boldRegex = /\*\*(.*?)\*\*/g
   let lastIndex = 0
   let boldMatch

   while ((boldMatch = boldRegex.exec(text)) !== null) {
      // Process text before the bold marker
      if (boldMatch.index > lastIndex) {
         const beforeText = text.substring(lastIndex, boldMatch.index)
         result.push(...processItalic(beforeText))
      }

      // Process the bold text (which might contain italic)
      result.push(<strong key={`bold-${boldMatch.index}`}>{processItalic(boldMatch[1])}</strong>)

      lastIndex = boldRegex.lastIndex
   }

   // Process remaining text
   if (lastIndex < text.length) {
      result.push(...processItalic(text.substring(lastIndex)))
   }

   return result
}

/**
 * Process italic formatting
 */
function processItalic(text: string): React.ReactNode[] {
   const result = []

   // Split by italic markers
   const italicRegex = /\*([^*]+)\*/g
   let lastIndex = 0
   let italicMatch

   while ((italicMatch = italicRegex.exec(text)) !== null) {
      // Add text before the italic marker
      if (italicMatch.index > lastIndex) {
         result.push(text.substring(lastIndex, italicMatch.index))
      }

      // Add the italic text
      result.push(<em key={`italic-${italicMatch.index}`}>{italicMatch[1]}</em>)

      lastIndex = italicRegex.lastIndex
   }

   // Add remaining text
   if (lastIndex < text.length) {
      result.push(text.substring(lastIndex))
   }

   return result
}

/**
 * Convert URLs to clickable links
 */
function processLinks(text: string | React.ReactNode[]): React.ReactNode[] | React.ReactNode {
   // If text is already an array (from previous formatting), return it
   if (Array.isArray(text)) {
      return text
   }

   // If the text is not a string (could be React element), return it as is
   if (typeof text !== 'string') {
      return text
   }

   const result = []

   // Look for markdown style links [text](url)
   const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
   let lastIndex = 0
   let linkMatch

   while ((linkMatch = markdownLinkRegex.exec(text)) !== null) {
      // Add text before the link
      if (linkMatch.index > lastIndex) {
         result.push(text.substring(lastIndex, linkMatch.index))
      }

      // Add the link
      const [_, linkText, linkUrl] = linkMatch
      result.push(
         <a
            key={`link-${linkMatch.index}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
         >
            {linkText}
         </a>
      )

      lastIndex = markdownLinkRegex.lastIndex
   }

   // Check for plain URLs in the remaining text
   if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex)
      const urlRegex = /(https?:\/\/[^\s]+)/g

      let urlLastIndex = 0
      let urlMatch

      while ((urlMatch = urlRegex.exec(remainingText)) !== null) {
         // Add text before the URL
         if (urlMatch.index > urlLastIndex) {
            result.push(remainingText.substring(urlLastIndex, urlMatch.index))
         }

         // Add the URL as a link
         const url = urlMatch[1]
         result.push(
            <a
               key={`url-${lastIndex + urlMatch.index}`}
               href={url}
               target="_blank"
               rel="noopener noreferrer"
               className="text-blue-600 hover:underline"
            >
               {url}
            </a>
         )

         urlLastIndex = urlRegex.lastIndex
      }

      // Add remaining text
      if (urlLastIndex < remainingText.length) {
         result.push(remainingText.substring(urlLastIndex))
      }
   }

   return result.length > 0 ? result : text
}

/**
 * Convert line breaks to <br> tags
 */
function convertLineBreaks(text: string): React.ReactElement[] {
   return text.split('\n').map((line, i, arr) => (
      <React.Fragment key={`line-${i}`}>
         {line}
         {i < arr.length - 1 && <br />}
      </React.Fragment>
   ))
}

/**
 * Optimize React elements for better performance
 */
function optimizeElements(elements: React.ReactNode[]): React.ReactElement {
   // Combine adjacent string elements
   const optimized = []
   let currentTextBuffer = ''

   for (const element of elements) {
      if (typeof element === 'string') {
         currentTextBuffer += element
      } else {
         if (currentTextBuffer) {
            optimized.push(currentTextBuffer)
            currentTextBuffer = ''
         }
         optimized.push(element)
      }
   }

   if (currentTextBuffer) {
      optimized.push(currentTextBuffer)
   }

   return <>{optimized}</>
}

export const renderContent = (content: string): React.ReactElement[] => {
   if (!content) return []

   // Decode HTML entities
   const decodedContent = content
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x2F;/g, '/')

   // Split by line breaks and create elements
   return decodedContent.split('\n').map((line: string, index: number, array: string[]) => (
      <React.Fragment key={index}>
         {line}
         {index < array.length - 1 && <br />}
      </React.Fragment>
   ))
}

export default formatMessage
