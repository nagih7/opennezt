import React from 'react'
import styles from './styles.module.scss'
import PropTypes from 'prop-types'

const NotFound = ({ content, size }) => {
    return (
        <div className={styles.notFoundWrap} style={{ margin: 'auto' }}>
            <div className={styles.notFoundImg}>
                <img
                    src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/not-found.svg"
                    alt="Not found"
                    style={{ width: size, height: size }}
                />
            </div>
            <div className={styles.notFoundContent}>
                <h4>{content}</h4>
            </div>
        </div>
    )
}

NotFound.propTypes = {
    content: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default NotFound
