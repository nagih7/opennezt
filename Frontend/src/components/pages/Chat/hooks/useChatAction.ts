import React, { useCallback, useRef, useState } from 'react'
import { sendMessage } from '~/api/chat'
import validateMessage from '~/utils/validateMessage'

interface UseChatActionProps {
   currentChatId: string
   onSendMessage?: (message: string) => void
}

interface UseChatActionReturn {
   textareaRef: React.RefObject<HTMLTextAreaElement | null>
   message: string
   isMultiLine: boolean
   handleChangeMessage: (value: string) => void
   handleSendMessage: () => void
   handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

const useChatAction = ({ currentChatId }: UseChatActionProps): UseChatActionReturn => {
   const textareaRef = useRef<HTMLTextAreaElement>(null)
   // State
   const [loading, setLoading] = useState<boolean>(false)
   const [message, setMessage] = useState<string>('')
   const [isMultiLine, setIsMultiLine] = useState<boolean>(false)

   // Adjust textarea height
   const adjustTextareaHeight = useCallback(() => {
      const textarea: HTMLTextAreaElement | null = textareaRef.current
      if (textarea) {
         //
         textarea.style.height = 'auto'
         // Tính toán chiều cao mới
         const newHeight = Math.min(textarea.scrollHeight, 120)
         textarea.style.height = `${newHeight}px`

         // ✅ Detect multi-line state
         const singleLineHeight = 56 // Base height from your className
         const currentIsMultiLine = newHeight > singleLineHeight

         // Update multi-line state nếu thay đổi
         setIsMultiLine(currentIsMultiLine)
      }
   }, [isMultiLine])

   const onchange = useCallback(
      (value: string) => {
         setMessage(value)
         adjustTextareaHeight()
      },
      [adjustTextareaHeight]
   )

   const handleChangeMessage = useCallback((value: string) => {
      const sanitizedValue = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
      // Cập nhật giá trị message
      onchange(sanitizedValue)
   }, [])

   const handleSendMessage = useCallback(async () => {
      if (!currentChatId) return
      const { valid, cleanedMessage } = validateMessage(message)
      if (valid) {
         setLoading(true)
         try {
            console.log('Sending message:', cleanedMessage)
            const res = await sendMessage(currentChatId, cleanedMessage)
         } catch (error) {
            console.error('Error sending message:', error)
         }

         setMessage('')

         // Reset textarea height
         if (textareaRef.current) {
            textareaRef.current.style.height = '40px'
         }
      }
   }, [message])

   const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
         if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
            e.preventDefault()
            handleSendMessage()
         }
      },
      [handleSendMessage]
   )

   return {
      textareaRef,
      message,
      isMultiLine,
      handleChangeMessage,
      handleSendMessage,
      handleKeyDown,
   }
}

export default useChatAction
