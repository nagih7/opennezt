import React, { useRef, forwardRef, useEffect, useState } from 'react'

interface CaptionInputProps {
   handleTextChange?: (event: { target: { value: string } }) => void
   onChange?: (value: string) => void
   placeholder?: string
   value?: string
}

const CaptionInput = forwardRef<HTMLDivElement, CaptionInputProps>(
   ({ handleTextChange, onChange, placeholder, value }, ref) => {
      const editorRef = useRef<HTMLDivElement>(null)
      const [initialRender, setInitialRender] = useState(true)
      const prevValueRef = useRef<string | undefined>(value)
      
      // Hàm lưu vị trí con trỏ hiện tại
      const saveCaretPosition = () => {
         if (!editorRef.current) return null
         
         const selection = window.getSelection()
         if (!selection || selection.rangeCount === 0) return null
         
         const range = selection.getRangeAt(0)
         const preCaretRange = range.cloneRange()
         preCaretRange.selectNodeContents(editorRef.current)
         preCaretRange.setEnd(range.endContainer, range.endOffset)
         
         return {
            offset: preCaretRange.toString().length,
            node: range.startContainer,
            nodeOffset: range.startOffset
         }
      }
      
      // Hàm khôi phục vị trí con trỏ
      const restoreCaretPosition = (position: any) => {
         if (!position || !editorRef.current) return
         
         const charIndex = position.offset
         const selection = window.getSelection()
         if (!selection) return
         
         const range = document.createRange()
         range.setStart(editorRef.current, 0)
         range.collapse(true)
         
         const nodeStack: Node[] = [editorRef.current]
         let foundStart = false
         let charCount = 0
         let node: Node | null = null
         
         while (!foundStart && nodeStack.length > 0) {
            node = nodeStack.pop() as Node
            
            if (node.nodeType === Node.TEXT_NODE) {
               const nodeLength = node.textContent?.length || 0
               
               if (charCount + nodeLength >= charIndex) {
                  range.setStart(node, charIndex - charCount)
                  foundStart = true
               } else {
                  charCount += nodeLength
               }
            } else {
               for (let i = node.childNodes.length - 1; i >= 0; i--) {
                  nodeStack.push(node.childNodes[i])
               }
            }
         }
         
         if (foundStart) {
            range.collapse(true)
            selection.removeAllRanges()
            selection.addRange(range)
         }
      }
      
      // Xử lý giá trị khởi tạo
      useEffect(() => {
         if (editorRef.current && value !== undefined && initialRender) {
            // Tự động convert links thành HTML anchors khi khởi tạo
            const linkedHTML = value.replace(/(https?:\/\/[^\s]+)/g, (url: string) => {
               try {
                  // Hiển thị đường dẫn đầy đủ thay vì chỉ domain
                  return `<a href="${url}" target="_blank" rel="noreferrer noopener" style="color: blue; text-decoration: underline;">${url}</a>`
               } catch {
                  return url
               }
            })
            
            editorRef.current.innerHTML = linkedHTML
            setInitialRender(false)
         }
      }, [value, initialRender])
      
      // Theo dõi các thay đổi của value từ bên ngoài
      useEffect(() => {
         if (!initialRender && value !== prevValueRef.current && editorRef.current) {
            // Lưu vị trí con trỏ hiện tại
            const caretPosition = saveCaretPosition()
            
            // Cập nhật nội dung
            const linkedHTML = value?.replace(/(https?:\/\/[^\s]+)/g, (url: string) => {
               try {
                  // Hiển thị đường dẫn đầy đủ thay vì chỉ domain
                  return `<a href="${url}" target="_blank" rel="noreferrer noopener" style="color: blue; text-decoration: underline;">${url}</a>`
               } catch {
                  return url
               }
            }) || ''
            
            if (editorRef.current.innerHTML !== linkedHTML) {
               editorRef.current.innerHTML = linkedHTML
            }
            
            // Khôi phục vị trí con trỏ
            if (caretPosition) {
               restoreCaretPosition(caretPosition)
            }
            
            // Cập nhật ref để theo dõi thay đổi
            prevValueRef.current = value
         }
      }, [value, initialRender])

      const handleInput = (_e: React.FormEvent<HTMLDivElement>): void => {
         const el = editorRef.current
         if (!el) return

         const text = el.innerText
         prevValueRef.current = text

         // Lưu vị trí con trỏ hiện tại
         const caretPosition = saveCaretPosition()

         // Tự động detect link và thay thế bằng thẻ <a>
         const linkedHTML = text.replace(/(https?:\/\/[^\s]+)/g, (url: string) => {
            try {
               // Hiển thị đường dẫn đầy đủ thay vì chỉ domain
               return `<a href="${url}" target="_blank" rel="noreferrer noopener" style="color: blue; text-decoration: underline;">${url}</a>`
            } catch {
               return url
            }
         })

         // Gán lại nội dung HTML nếu có thay đổi
         if (el.innerHTML !== linkedHTML) {
            el.innerHTML = linkedHTML

            // Khôi phục vị trí con trỏ
            if (caretPosition) {
               restoreCaretPosition(caretPosition)
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
               className="w-full outline-none min-h-[60px] max-h-[300px] overflow-auto"
               placeholder={placeholder}
               style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#CBD5E1 #F1F5F9',
               }}
               suppressContentEditableWarning
            />
         </div>
      )
   }
)

CaptionInput.displayName = 'CaptionInput'
export default CaptionInput
