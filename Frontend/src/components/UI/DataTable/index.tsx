import React, { useState, useEffect, ReactNode } from 'react'

// Types
export interface Column<T> {
   key: keyof T | string
   header: string
   width?: string
   sortable?: boolean
   render?: (item: T, index: number) => ReactNode
}

export type SortDirection = 'asc' | 'desc' | null

interface SortState {
   column: string | null
   direction: SortDirection
}

interface DataTableProps<T> {
   data: T[]
   columns: Column<T>[]
   keyExtractor: (item: T) => string | number
   renderEmpty?: () => ReactNode
   renderLoader?: () => ReactNode
   renderHeader?: (columns: Column<T>[]) => ReactNode
   renderRow?: (item: T, index: number, columns: Column<T>[]) => ReactNode
   renderFooter?: () => ReactNode
   sortable?: boolean
   isLoading?: boolean
   onSort?: (column: string, direction: SortDirection) => void
   className?: string
}

function DataTable<T>({
   data,
   columns,
   keyExtractor,
   renderEmpty,
   renderLoader,
   renderHeader,
   renderRow,
   renderFooter,
   sortable = true,
   isLoading = false,
   onSort,
   className = '',
}: DataTableProps<T>) {
   const [sortState, setSortState] = useState<SortState>({ column: null, direction: null })
   const [sortedData, setSortedData] = useState<T[]>(data)

   // Sort data when sort state changes
   useEffect(() => {
      if (sortState.column && sortState.direction && !onSort) {
         const sorted = [...data].sort((a, b) => {
            const column = sortState.column as keyof T
            const valueA = a[column]
            const valueB = b[column]

            if (valueA === valueB) return 0

            if (sortState.direction === 'asc') {
               return valueA < valueB ? -1 : 1
            } else {
               return valueA > valueB ? -1 : 1
            }
         })

         setSortedData(sorted)
      } else {
         setSortedData(data)
      }
   }, [data, sortState, onSort])

   // Handle sort click
   const handleSort = (columnKey: string) => {
      if (!sortable) return

      let direction: SortDirection = 'asc'

      if (sortState.column === columnKey) {
         if (sortState.direction === 'asc') {
            direction = 'desc'
         } else if (sortState.direction === 'desc') {
            direction = null
         }
      }

      setSortState({
         column: direction ? columnKey : null,
         direction,
      })

      if (onSort) {
         onSort(columnKey, direction)
      }
   }

   // Default render functions
   const defaultRenderHeader = () => (
      <thead>
         <tr>
            {columns.map((column) => (
               <th
                  key={column.key.toString()}
                  className={`px-4 py-2 text-left ${column.sortable !== false && sortable ? 'cursor-pointer' : ''}`}
                  style={{ width: column.width }}
                  onClick={() =>
                     column.sortable !== false && sortable ? handleSort(column.key.toString()) : undefined
                  }
               >
                  <div className="flex items-center">
                     {column.header}
                     {sortable && column.sortable !== false && sortState.column === column.key && (
                        <span className="ml-1">
                           {sortState.direction === 'asc' ? '↑' : sortState.direction === 'desc' ? '↓' : ''}
                        </span>
                     )}
                  </div>
               </th>
            ))}
         </tr>
      </thead>
   )

   const defaultRenderRow = (item: T, index: number) => (
      <tr key={keyExtractor(item)} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
         {columns.map((column) => (
            <td key={`${keyExtractor(item)}-${column.key.toString()}`} className="px-4 py-2">
               {column.render
                  ? column.render(item, index)
                  : typeof column.key === 'string'
                    ? (item as any)[column.key]
                    : (item[column.key] as unknown as ReactNode)}
            </td>
         ))}
      </tr>
   )

   const defaultRenderEmpty = () => (
      <tr>
         <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
            No data available
         </td>
      </tr>
   )

   const defaultRenderLoader = () => (
      <tr>
         <td colSpan={columns.length} className="px-4 py-8 text-center">
            <div className="flex justify-center">Loading...</div>
         </td>
      </tr>
   )

   // Render the actual header and rows based on provided render props or defaults
   const headerContent = renderHeader ? renderHeader(columns) : defaultRenderHeader()

   const rowsContent = isLoading
      ? renderLoader
         ? renderLoader()
         : defaultRenderLoader()
      : sortedData.length === 0
        ? renderEmpty
           ? renderEmpty()
           : defaultRenderEmpty()
        : sortedData.map((item, index) => (renderRow ? renderRow(item, index, columns) : defaultRenderRow(item, index)))

   const footerContent = renderFooter ? renderFooter() : null

   return (
      <div className={`overflow-x-auto ${className}`}>
         <table className="min-w-full divide-y divide-gray-200">
            {headerContent}
            <tbody className="divide-y divide-gray-200">{rowsContent}</tbody>
            {footerContent && <tfoot>{footerContent}</tfoot>}
         </table>
      </div>
   )
}

export default DataTable
