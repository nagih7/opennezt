import React, { useCallback, useRef, useState } from 'react'
import { sendMessage } from '~/api/chat'
import { MessageProps } from '~/types'
import validateMessage from '~/utils/validateMessage'

interface UseChatActionProps {
   currentChatId: string
   onSendMessage: (message: MessageProps) => void
}

interface UseChatActionReturn {
   loading: boolean
   textareaRef: React.RefObject<HTMLTextAreaElement | null>
   message: string
   isMultiLine: boolean
   handleChangeMessage: (value: string) => void
   handleSendMessage: () => void
   handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

const useChatAction = ({ currentChatId, onSendMessage }: UseChatActionProps): UseChatActionReturn => {
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
      if (!currentChatId || loading) return
      const { valid, cleanedMessage } = validateMessage(message)
      if (valid) {
         setLoading(true)
         try {
            const res = await sendMessage(currentChatId, cleanedMessage)
            console.log('Message sent:', res)
            if (res.success) {
               const newMessage: MessageProps = {
                  _id: res.data._id,
                  conversation_id: currentChatId,
                  content: cleanedMessage || '',
                  user: res.data.user,
                  timestamp: res.data.timestamp,
               }
               onSendMessage(newMessage)
            } else {
               console.error('Failed to send message:', res.message)
            }
         } catch (error) {
            console.error('Error sending message:', error)
         } finally {
            setLoading(false)
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
      loading,
      textareaRef,
      message,
      isMultiLine,
      handleChangeMessage,
      handleSendMessage,
      handleKeyDown,
   }
}

export default useChatAction
