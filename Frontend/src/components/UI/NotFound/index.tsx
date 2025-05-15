import React from 'react'
// import styles from './styles.module.scss'

interface NotFoundProps {
    content: string
    size?: string | number
}

const NotFound: React.FC<NotFoundProps> = ({ content, size }) => {
    return (
        <></>
        // <div className={styles.notFoundWrap} style={{ margin: 'auto' }}>
        //     <div className={styles.notFoundImg}>
        //         <img
        //             src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/not-found.svg"
        //             alt="Not found"
        //             style={{ width: size, height: size }}
        //         />
        //     </div>
        //     <div className={styles.notFoundContent}>
        //         <h4>{content}</h4>
        //     </div>
        // </div>
    )
}

export default NotFound
