import React, { FC, useState } from 'react'
import { Button } from '@material-ui/core'
import { GetApp, FileCopy } from '@material-ui/icons'
import CopyToClipboard from 'react-copy-to-clipboard'
import { generateFile } from 'src/shared/utils'
import { recoveryCodesFileName } from 'src/shared/constants'
import styles from '../TOTP/totp.module.scss'

interface Props {
  recoveryCodes: string[]
}

const RecoveryCodes: FC<Props> = ({ recoveryCodes }) => {
  const [copyTxt, setCopyTxt] = useState('Copy')

  return (
    <section>
      <p className={styles.tips1}>
        Recovery codes are used to access your account in the event you cannot
        receive two-factor authentication codes.
      </p>
      <p className={styles.tips2}>
        Download or copy your recovery codes before continuing two-factor
        authentication setup below.
      </p>
      <ul className={styles.recoveryCodesGroup}>
        {recoveryCodes.map(recoveryCodes => (
          <li className={styles.recoveryCodesItem} key={recoveryCodes}>
            {recoveryCodes}
          </li>
        ))}
      </ul>
      <div className={styles.buttonGroup}>
        <Button
          size="small"
          className={styles.btn}
          variant="contained"
          color="primary"
          href={generateFile(recoveryCodes.join('\n'))}
          download={recoveryCodesFileName}
          startIcon={<GetApp />}
        >
          Download
        </Button>
        <CopyToClipboard
          text={recoveryCodes.join(' ')}
          onCopy={() => setCopyTxt('Copied!')}
        >
          <Button
            size="small"
            variant="contained"
            color="primary"
            className={styles.btn}
            startIcon={<FileCopy />}
          >
            {copyTxt}
          </Button>
        </CopyToClipboard>
      </div>
      <p className={styles.tips3}>
        <span className={styles.tipsBlod}>
          Treat your recovery codes with the same level of attention as you
          would your password!{' '}
        </span>
        We recommend saving them with a password manager such as{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://lastpass.com/"
        >
          Lastpass
        </a>
        ,{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://1password.com/"
        >
          1Password
        </a>
        , or{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://keepersecurity.com/"
        >
          Keeper
        </a>
        .
      </p>
    </section>
  )
}

export default RecoveryCodes
