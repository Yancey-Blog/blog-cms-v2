import React, { FC, useState } from 'react'

import SettingItemWrapper from '../../components/SettingItemWrapper/SettingItemWrapper'
import { Button, Checkbox, FormControlLabel } from '@material-ui/core'
import useStyles from '../styles'

interface Props {
  isDeletingAccount: boolean
  deleteAccount: Function
}

const DeleteAccount: FC<Props> = ({ isDeletingAccount, deleteAccount }) => {
  const classes = useStyles()

  const [checked, setChecked] = useState(false)

  return (
    <SettingItemWrapper
      title="Delete Account"
      imageUrl="https://www.gstatic.com/identity/boq/accountsettingsmobile/activitycontrols_scene_1264x448_6a8a39b472ed14fb4daae2d20a9c735d.png"
    >
      <p className={classes.tip}>
        You’re trying to delete your Account, which provides access to various
        Yancey Blog services. You’ll no longer be able to use any of those
        services, and your account and data will be lost.
      </p>

      <FormControlLabel
        className={classes.sureToDeleteAccount}
        value={checked}
        control={
          <Checkbox
            color="primary"
            onChange={(e) => setChecked(e.target.checked)}
          />
        }
        label={
          <b className={classes.checkboxLabel}>
            Yes, I want to permanently delete this Yancey Blog CMS Account and
            all its data.
          </b>
        }
        labelPlacement="end"
      />

      <Button
        color="primary"
        variant="contained"
        disabled={!checked || isDeletingAccount}
        onClick={() => deleteAccount()}
      >
        Delete account
      </Button>
    </SettingItemWrapper>
  )
}

export default DeleteAccount
