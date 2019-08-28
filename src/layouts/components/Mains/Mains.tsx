import React, { FC } from 'react'
import Tables from 'components/Tables/Tables'
import styles from './Mains.module.scss'

const Mains: FC = () => {
  return (
    <main className={styles.main}>
      <Tables loading={false} />
    </main>
  )
}

export default Mains
