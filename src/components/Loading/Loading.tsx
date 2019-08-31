import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Loading.module.scss'

const Loading: FC = () => {
  return (
    <section className={styles.mask}>
      <FontAwesomeIcon icon='spinner' className={styles.loadingIcon} />
    </section>
  )
}

export default Loading
