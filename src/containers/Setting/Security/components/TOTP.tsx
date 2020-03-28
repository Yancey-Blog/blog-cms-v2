import React, { FC, useState } from 'react'
import { Button, Card, Typography } from '@material-ui/core'
import CopyToClipboard from 'react-copy-to-clipboard'
import { generateFile } from 'src/shared/utils'
import { recoveryCodesFileName } from 'src/shared/constants'
import styles from './TOTP.module.scss'

interface Props {
  createTOTP: Function
  createRecoveryCodes: Function
}

const TOTP: FC<Props> = ({ createTOTP, createRecoveryCodes }) => {
  const [qrcode, setQRCode] = useState('')
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([])

  const fetchTOTPAndRecoveryCodes = async () => {
    const userId = window.localStorage.getItem('userId')

    const TOTPRes = await createTOTP({
      variables: { userId },
    })

    const recoveryCodesRequest = await createRecoveryCodes({
      variables: { userId },
    })

    setQRCode(TOTPRes.data.createTOTP.qrcode)
    setRecoveryCodes(
      recoveryCodesRequest.data.createRecoveryCodes.recoveryCodes,
    )
  }

  const [copyTxt, setCopyTxt] = useState('Copy')

  return (
    <section>
      {qrcode && <img src={qrcode} alt="qrcode" />}

      {recoveryCodes.length !== 0 && (
        <Card className={styles.totpWrapper}>
          <Typography variant="h4" gutterBottom>
            Recovery codes
          </Typography>
          <p className={styles.tips1}>
            Recovery codes are used to access your account in the event you
            cannot receive two-factor authentication codes.
          </p>
          <p className={styles.tips2}>
            Download, print, or copy your recovery codes before continuing
            two-factor authentication setup below.
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
              className={styles.btn}
              variant="outlined"
              color="primary"
              href={generateFile(recoveryCodes.join('\n'))}
              download={recoveryCodesFileName}
            >
              Download
            </Button>

            <CopyToClipboard
              text={recoveryCodes.join(' ')}
              onCopy={() => setCopyTxt('Copied!')}
            >
              <Button variant="outlined" color="primary" className={styles.btn}>
                {copyTxt}
              </Button>
            </CopyToClipboard>
          </div>
        </Card>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={fetchTOTPAndRecoveryCodes}
      >
        click me
      </Button>
    </section>
  )
}

export default TOTP
