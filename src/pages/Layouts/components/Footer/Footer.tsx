import React, { FC } from 'react'
import styles from './Footer.module.scss'

const Footer: FC = () => (
  <footer className={styles.footer}>
    <ul className={styles.footerList}>
      <li>HOME</li>
      <li>BLOG</li>
      <li>GITHUB</li>
    </ul>
    <p className={styles.copyright}>
      {`Copyright © ${new Date().getFullYear()} Yancey Inc. and its affiliates.`}
    </p>
  </footer>
)

export default Footer
