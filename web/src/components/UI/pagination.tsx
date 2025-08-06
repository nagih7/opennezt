interface PaginationProps {
   page: number
   pageCount: number
   onPageChange: (page: number) => void
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
   if (pageCount <= 1) return null

   const handlePrev = () => {
      if (page > 1) onPageChange(page - 1)
   }
   const handleNext = () => {
      if (page < pageCount) onPageChange(page + 1)
   }

   return (
      <div className="flex items-center gap-2">
         <button
            className="px-3 py-1 rounded border bg-white disabled:opacity-50"
            onClick={handlePrev}
            disabled={page === 1}
         >
            Prev
         </button>
         <span className="px-2">
            Page {page} of {pageCount}
         </span>
         <button
            className="px-3 py-1 rounded border bg-white disabled:opacity-50"
            onClick={handleNext}
            disabled={page === pageCount}
         >
            Next
         </button>
      </div>
   )
}
