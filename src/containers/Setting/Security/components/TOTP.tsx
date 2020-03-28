import React, { FC, useState } from 'react'
import { Button } from '@material-ui/core'
import { generateFile } from 'src/shared/utils'
import { recoveryCodesFileName } from 'src/shared/constants'

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

          <Button
            variant="contained"
            color="primary"
            href={generateFile(recoveryCodes.join('\n'))}
            download={recoveryCodesFileName}
          >
            Download
          </Button>

          <Button variant="contained" color="primary">
            Copy
          </Button>
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
