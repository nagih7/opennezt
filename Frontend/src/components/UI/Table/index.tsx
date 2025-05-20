import React from 'react'
import { Pagination } from 'antd'
import styles from './styles.module.scss'

interface TableCustomProps {
    columns: any[];
    dataSource: any[];
    loading?: boolean;
    rowKey: string;
    onChangeCurrentPage?: (page: number) => void;
    pagination: {
        currentPage: number;
        perPage: number;
        totalRecord: number;
    };
    handleUpdate?: () => void;
    handleShowConfirmDelete?: () => void;
    onRow?: (record: any) => void;
    onChange?: (pagination: any, filters: any, sorter: any) => void;
}

const TableCustom: React.FC<TableCustomProps> = ({
    columns,
    dataSource,
    rowKey,
    onRow = () => {},
    pagination,
    onChangeCurrentPage = () => {},
    handleUpdate = () => {},
    handleShowConfirmDelete = () => {},
    onChange = () => {},
}) => {
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
                            className="border-b border-gray-200 hover:bg-gray-50"
                        >
                            {columns.map((col, i) => (
                                <td
                                    key={i}
                                    className={`p-3 ${col.align === 'center' ? 'text-center' : 'text-left'} ${col.key !== 'action' ? 'cursor-pointer' : ''}`}
                                    onClick={(e) => {
                                        if (col.key === 'action') {
                                            e.stopPropagation();
                                        } else {
                                            onRow(item);
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