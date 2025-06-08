import React, { memo, useMemo, useCallback } from 'react'
import { useRenderTracker } from '~/hooks/useOptimizedPerformance'

/**
 * Optimized list item component with memoization
 */
interface OptimizedListItemProps {
   id: string | number
   title: string
   subtitle?: string
   avatar?: string
   onClick?: (id: string | number) => void
   onDelete?: (id: string | number) => void
   isSelected?: boolean
   className?: string
}

export const OptimizedListItem = memo<OptimizedListItemProps>(
   ({ id, title, subtitle, avatar, onClick, onDelete, isSelected = false, className = '' }) => {
      useRenderTracker(`OptimizedListItem-${id}`)

      const handleClick = useCallback(() => {
         onClick?.(id)
      }, [onClick, id])

      const handleDelete = useCallback(
         (e: React.MouseEvent) => {
            e.stopPropagation()
            onDelete?.(id)
         },
         [onDelete, id]
      )

      const itemClasses = useMemo(() => {
         return `
         flex items-center p-4 cursor-pointer transition-colors duration-200
         ${isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'}
         ${className}
      `.trim()
      }, [isSelected, className])

      return (
         <div className={itemClasses} onClick={handleClick}>
            {avatar && (
               <img src={avatar} alt={title} className="object-cover w-10 h-10 mr-3 rounded-full" loading="lazy" />
            )}
            <div className="flex-1 min-w-0">
               <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
               {subtitle && <p className="text-sm text-gray-500 truncate">{subtitle}</p>}
            </div>
            {onDelete && (
               <button
                  onClick={handleDelete}
                  className="p-1 ml-2 text-gray-400 transition-colors hover:text-red-500"
                  aria-label="Delete"
               >
                  ×
               </button>
            )}
         </div>
      )
   },
   (prevProps, nextProps) => {
      // Custom comparison function for better memoization
      return (
         prevProps.id === nextProps.id &&
         prevProps.title === nextProps.title &&
         prevProps.subtitle === nextProps.subtitle &&
         prevProps.avatar === nextProps.avatar &&
         prevProps.isSelected === nextProps.isSelected &&
         prevProps.className === nextProps.className
      )
   }
)

OptimizedListItem.displayName = 'OptimizedListItem'

/**
 * Optimized form field component
 */
interface OptimizedFormFieldProps {
   label: string
   name: string
   type?: string
   value: string
   onChange: (name: string, value: string) => void
   error?: string
   placeholder?: string
   required?: boolean
   disabled?: boolean
   className?: string
}

export const OptimizedFormField = memo<OptimizedFormFieldProps>(
   ({
      label,
      name,
      type = 'text',
      value,
      onChange,
      error,
      placeholder,
      required = false,
      disabled = false,
      className = '',
   }) => {
      const handleChange = useCallback(
         (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(name, e.target.value)
         },
         [onChange, name]
      )

      const inputClasses = useMemo(() => {
         return `
         w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
         ${error ? 'border-red-500' : 'border-gray-300'}
         ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
         ${className}
      `.trim()
      }, [error, disabled, className])

      return (
         <div className="mb-4">
            <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">
               {label}
               {required && <span className="ml-1 text-red-500">*</span>}
            </label>
            <input
               id={name}
               name={name}
               type={type}
               value={value}
               onChange={handleChange}
               placeholder={placeholder}
               required={required}
               disabled={disabled}
               className={inputClasses}
               aria-invalid={!!error}
               aria-describedby={error ? `${name}-error` : undefined}
            />
            {error && (
               <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
                  {error}
               </p>
            )}
         </div>
      )
   }
)

OptimizedFormField.displayName = 'OptimizedFormField'

/**
 * Optimized modal component with portal and focus management
 */
interface OptimizedModalProps {
   isOpen: boolean
   onClose: () => void
   title: string
   children: React.ReactNode
   size?: 'sm' | 'md' | 'lg' | 'xl'
   className?: string
}

export const OptimizedModal = memo<OptimizedModalProps>(
   ({ isOpen, onClose, title, children, size = 'md', className = '' }) => {
      const modalRef = React.useRef<HTMLDivElement>(null)

      // Handle escape key
      React.useEffect(() => {
         const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
               onClose()
            }
         }

         if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
         }

         return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
         }
      }, [isOpen, onClose])

      // Focus management
      React.useEffect(() => {
         if (isOpen && modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
               'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
            const firstElement = focusableElements[0] as HTMLElement
            firstElement?.focus()
         }
      }, [isOpen])

      const sizeClasses = useMemo(() => {
         const sizes = {
            sm: 'max-w-sm',
            md: 'max-w-md',
            lg: 'max-w-lg',
            xl: 'max-w-xl',
         }
         return sizes[size]
      }, [size])

      if (!isOpen) return null

      return (
         <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
               <div
                  className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                  onClick={onClose}
                  aria-hidden="true"
               />

               <div
                  ref={modalRef}
                  className={`
                  inline-block w-full p-6 my-8 overflow-hidden text-left align-middle transition-all
                  transform bg-white shadow-xl rounded-lg ${sizeClasses} ${className}
               `}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-title"
               >
                  <div className="flex items-center justify-between mb-4">
                     <h3 id="modal-title" className="text-lg font-medium text-gray-900">
                        {title}
                     </h3>
                     <button
                        onClick={onClose}
                        className="text-gray-400 transition-colors hover:text-gray-600"
                        aria-label="Close modal"
                     >
                        ×
                     </button>
                  </div>
                  {children}
               </div>
            </div>
         </div>
      )
   }
)

OptimizedModal.displayName = 'OptimizedModal'

/**
 * Optimized data table component
 */
interface Column<T> {
   key: keyof T
   label: string
   render?: (value: any, item: T) => React.ReactNode
   sortable?: boolean
   width?: string
}

interface OptimizedDataTableProps<T> {
   data: T[]
   columns: Column<T>[]
   keyField: keyof T
   onSort?: (key: keyof T, direction: 'asc' | 'desc') => void
   sortKey?: keyof T
   sortDirection?: 'asc' | 'desc'
   loading?: boolean
   emptyMessage?: string
   className?: string
}

export function OptimizedDataTable<T>({
   data,
   columns,
   keyField,
   onSort,
   sortKey,
   sortDirection,
   loading = false,
   emptyMessage = 'No data available',
   className = '',
}: OptimizedDataTableProps<T>) {
   const handleSort = useCallback(
      (key: keyof T) => {
         if (!onSort) return

         const newDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc'
         onSort(key, newDirection)
      },
      [onSort, sortKey, sortDirection]
   )

   const tableRows = useMemo(() => {
      return data.map((item) => (
         <tr key={String(item[keyField])} className="hover:bg-gray-50">
            {columns.map((column) => (
               <td key={String(column.key)} className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {column.render ? column.render(item[column.key], item) : String(item[column.key])}
               </td>
            ))}
         </tr>
      ))
   }, [data, columns, keyField])

   if (loading) {
      return (
         <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading...</div>
         </div>
      )
   }

   if (data.length === 0) {
      return (
         <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">{emptyMessage}</div>
         </div>
      )
   }

   return (
      <div className={`overflow-x-auto ${className}`}>
         <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
               <tr>
                  {columns.map((column) => (
                     <th
                        key={String(column.key)}
                        className={`
                           px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                           ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                        `}
                        style={{ width: column.width }}
                        onClick={column.sortable ? () => handleSort(column.key) : undefined}
                     >
                        <div className="flex items-center">
                           {column.label}
                           {column.sortable && sortKey === column.key && (
                              <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                           )}
                        </div>
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">{tableRows}</tbody>
         </table>
      </div>
   )
}

export default {
   OptimizedListItem,
   OptimizedFormField,
   OptimizedModal,
   OptimizedDataTable,
}
