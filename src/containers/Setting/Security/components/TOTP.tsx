import React, { FC, useState, useRef } from 'react'
import { Button } from '@material-ui/core'

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

  const anchorEl = useRef<HTMLAnchorElement>(null)
  const downloadTxtFile = () => {
    const element = anchorEl?.current
    const file = new Blob([recoveryCodes.join('\n')], { type: 'text/plain' })
    if (element) {
      element.href = URL.createObjectURL(file)
      element.download = 'yancey-blog-cms-recovery-codes.txt'
    }
  }

  return (
    <section>
      {qrcode && <img src={qrcode} alt="qrcode" />}

      {recoveryCodes.length !== 0 && (
        <>
          <ul>
            {recoveryCodes.map(recoveryCodes => (
              <li key={recoveryCodes}>{recoveryCodes}</li>
            ))}
          </ul>

          <a ref={anchorEl} href="/" onClick={downloadTxtFile}>
            Download
          </a>
        </>
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
