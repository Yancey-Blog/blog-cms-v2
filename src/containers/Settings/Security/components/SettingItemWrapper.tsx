import React, { FC } from 'react'
import styles from './changePassword.module.scss'

interface Props {
  title: string
  imageUrl: string
}

const SettingItemWrapper: FC<Props> = ({ children, title, imageUrl }) => {
  return (
    <article className={styles.paper}>
      <header className={styles.header}>
        <h2>{title}</h2>
        <figure className={styles.img}>
          <img src={imageUrl} alt={title} />
        </figure>
      </header>

      {children}
    </article>
  )
}

export default SettingItemWrapper
