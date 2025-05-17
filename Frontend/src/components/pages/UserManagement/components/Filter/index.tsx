import React from 'react'
import styles from './styles.module.scss'
import { Col, Row } from 'antd'
import SelectCustom from '../../../../../components/UI/Select/index'
import { STATUS_USER } from '../../../../../utils/constants/app'

interface FilterProps {
    onClose?: () => void;
    onChangeStatus?: (value: string) => void;
    statusUser?: string;
}

const Filter: React.FC<FilterProps> = ({ onChangeStatus = () => {}, statusUser = '' }) => {
    return (
        <div>
            <div className={styles.filterWrap}>
                <Row gutter={10}>
                    <Col span={24}>
                        <div className={styles.inputWrap}>
                            <div className={styles.label}>Filter by user status</div>
                            <SelectCustom
                                value={statusUser}
                                onChange={onChangeStatus}
                                options={[
                                    {
                                        value: '',
                                        label: 'All',
                                    },
                                    {
                                        value: STATUS_USER.ACTIVATE.toString(),
                                        label: 'Active',
                                    },
                                    {
                                        value: STATUS_USER.INACTIVATE.toString(),
                                        label: 'Inactive',
                                    },
                                ]}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Filter
