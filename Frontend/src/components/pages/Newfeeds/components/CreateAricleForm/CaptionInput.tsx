import React, { useRef, forwardRef } from 'react'

interface CaptionInputProps {
   handleTextChange?: (event: { target: { value: string } }) => void
   onChange?: (value: string) => void
   placeholder?: string
   value?: string
}

const CaptionInput = forwardRef<HTMLDivElement, CaptionInputProps>(
   ({ handleTextChange, onChange, placeholder }, ref) => {
      const editorRef = useRef<HTMLDivElement>(null)

      const handleInput = (_e: React.FormEvent<HTMLDivElement>): void => {
         const el = editorRef.current
         if (!el) return

         const text = el.innerText

         // Tự động detect link và thay thế bằng thẻ <a>
         const linkedHTML = text.replace(/(https?:\/\/[^\s]+)/g, (url: string) => {
            return `<a href="${url}" target="_blank" style="color: blue; text-decoration: underline;">${url}</a>`
         })

         // Gán lại nội dung HTML nếu có thay đổi
         if (el.innerHTML !== linkedHTML) {
            const selection = window.getSelection()
            const range = selection?.getRangeAt(0)

            el.innerHTML = linkedHTML

            //Giữ lại con trỏ cuối
            if (range) {
               const newRange = document.createRange()
               newRange.selectNodeContents(el)
               newRange.collapse(false) // Cuối node
               selection?.removeAllRanges()
               selection?.addRange(newRange)
            }
         }

         // Gọi handleTextChange với event giả
         if (handleTextChange) {
            handleTextChange({
               target: {
                  value: text,
               },
            })
         }

         // Gọi onChange nếu có
         if (onChange) {
            onChange(text)
         }
      }

      return (
         <div>
            <div
               contentEditable
               ref={(node: HTMLDivElement | null) => {
                  editorRef.current = node
                  if (typeof ref === 'function') {
                     ref(node)
                  } else if (ref) {
                     ref.current = node
                  }
               }}
               onInput={handleInput}
               className="editor border rounded p-3 min-h-[100px]"
               style={{ whiteSpace: 'pre-wrap' }}
               suppressContentEditableWarning
               data-placeholder={placeholder || 'Caption for your post...'}
            />
         </div>
      )
   }
)

CaptionInput.displayName = 'CaptionInput'
export default CaptionInput
