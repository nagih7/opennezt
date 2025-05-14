import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'antd'
import styles from './styles.module.scss'

TableCustom.propTypes = {
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    rowKey: PropTypes.string,
    onChangeCurrentPage: PropTypes.func,
    pagination: PropTypes.object,
    handleUpdate: PropTypes.func,
    handleShowConfirmDelete: PropTypes.func,
    onRow: PropTypes.func,
}

TableCustom.defaultProps = {
    columns: [],
    dataSource: [],
    loading: false,
    rowKey: 'id',
    onChangeCurrentPage: () => {
        /* noop */
    },
    pagination: {
        currentPage: 1,
        perPage: 10,
        totalRecord: 0,
    },
    handleUpdate: () => {
        /* noop */
    },
    handleShowConfirmDelete: () => {
        /* noop */
    },
    onRow: () => {
        /* noop */
    },
}

function TableCustom({
    columns,
    dataSource,
    rowKey,
    onRow, // Make sure this prop is received
    pagination,
    onChangeCurrentPage,
    handleUpdate,
    handleShowConfirmDelete,
}) {
    return (
        <div className="p-8">
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-[#fafafa] border-[2px] border-gray-200">
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className={`p-3 ${
                                    col.align === 'center' ? 'text-center' : 'text-left'
                                } border-r-[2px] border-gray-200`}
                            >
                                {col.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataSource.map((item, index) => (
                        <tr
                            key={item[rowKey]}
                            className="border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                            onClick={() => onRow(item)} // Direct call to onRow
                        >
                            {columns.map((col, i) => (
                                <td
                                    key={i}
                                    className={`p-3 ${col.align === 'center' ? 'text-center' : 'text-left'}`}
                                    onClick={(e) => {
                                        // Ngăn chặn bubble up nếu click vào nút action
                                        if (col.key === 'action') {
                                            e.stopPropagation()
                                        }
                                    }}
                                >
                                    {col.render ? col.render(item[col.dataIndex], item, index) : item[col.dataIndex]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Giữ nguyên phân trang Ant Design */}
            <div className="flex items-center justify-between mt-8">
                <span className={styles.textPagination}>
                    <span>Showing {pagination.perPage * (pagination.currentPage - 1) + 1} to </span>
                    <span>{Math.min(pagination.totalRecord, pagination.perPage * pagination.currentPage)}</span>
                    <span> of {pagination.totalRecord} entries</span>
                </span>

                <Pagination
                    current={pagination.currentPage}
                    total={pagination.totalRecord}
                    pageSize={pagination.perPage}
                    onChange={onChangeCurrentPage}
                />
            </div>
        </div>
    )
}

export default TableCustom
