import React, { FC } from 'react'
import { Button, TextField } from '@material-ui/core'
import SettingsHeader from '../components/SettingsHeader/SettingsHeader'
import SettingItemWrapper from '../components/SettingItemWrapper/SettingItemWrapper'

const GlobalConfig: FC = () => {
  return (
    <>
      <SettingsHeader
        title="Global Config"
        subTitle="Basic info, like your name and photo, that you use on Yancey Blog CMS services"
      />

      <SettingItemWrapper title="Version Release Post">
        <Button
          color="primary"
          variant="contained"
          type="submit"
          // disabled={isSubmitting}
        >
          Submit
        </Button>
      </SettingItemWrapper>

      <SettingItemWrapper title="Self Introduction Post">
        <Button
          color="primary"
          variant="contained"
          type="submit"
          // disabled={isSubmitting}
        >
          Submit
        </Button>
      </SettingItemWrapper>
    </>
  )
}

export default GlobalConfig
