interface ValidationResult {
   valid: boolean
   cleanedMessage?: string
}

function validateMessage(message: string): ValidationResult {
   const cleanedMessage: string = message
      .split('\n')
      .filter((line: string, index: number, arr: string[]) => {
         if (index === 0 || index === arr.length - 1) {
            return line.trim() !== ''
         }
         return true
      })
      .join('\n')
      .trim() // Loại bỏ khoảng trắng thừa cuối cùng

   // 2. Kiểm tra rỗng
   if (!cleanedMessage) {
      // toaster.create({
      //    type: 'error',
      //    title: 'Message cannot be empty.',
      // })
      return { valid: false }
   }

   // 3. Giới hạn độ dài
   const MAX_LENGTH: number = 1000
   if (cleanedMessage.length > MAX_LENGTH) {
      // toaster.create({
      //    type: 'error',
      //    title: `Message is too long (max ${MAX_LENGTH} characters).`,
      // })
      return { valid: false }
   }

   // 4. Kiểm tra nội dung nguy hiểm (tuỳ chọn)
   const blockedPatterns: RegExp = /<script.*?>|<\/script>|javascript:/gi
   if (blockedPatterns.test(cleanedMessage)) {
      // toaster.create({
      //    type: 'error',
      //    title: 'Message contains invalid or potentially dangerous content.',
      // })
      return { valid: false }
   }
   // 4. (Tuỳ chọn) Cấm toàn emoji, spam,...
   // if (/^[\p{Emoji} ]+$/u.test(trimmedMessage)) {
   //   return { valid: false, error: 'Message cannot contain only emoji.' };
   // }

   return { valid: true, cleanedMessage }
}

export default validateMessage
