import { FC } from 'react'
import styles from './settingItemWrapper.module.scss'

interface Props {
  title: string
  imageUrl?: string
}

const SettingItemWrapper: FC<Props> = ({ children, title, imageUrl }) => {
  return (
    <article className={styles.paper}>
      <header className={styles.header}>
        <h2 className={imageUrl || styles.subHeader}>{title}</h2>
        {imageUrl ? (
          <figure className={styles.img}>
            <img src={imageUrl} alt={title} />
          </figure>
        ) : null}
      </header>

      {children}
    </article>
  )
}

export default SettingItemWrapper
