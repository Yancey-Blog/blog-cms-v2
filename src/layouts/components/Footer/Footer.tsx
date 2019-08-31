import React, { FC } from 'react'
import styles from './Footer.module.scss'

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      Copyright © {new Date().getFullYear()} Yancey Inc. All rights reserved.
    </footer>
  )
}

export default Footer
