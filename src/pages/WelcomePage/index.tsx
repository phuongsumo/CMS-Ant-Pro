import React from 'react'
import styles from './welcome.module.css'
import logo from './Logo.png'

const index = () => {
    return (
        <div className={styles.welcome}>
            <div className={styles.logo_img}>
                <img src={logo} alt="logo" />
            </div>
        </div>
    )
}

export default index