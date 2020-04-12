import React, { FC, ChangeEvent } from 'react'
import { FormControlLabel, Switch } from '@material-ui/core'
import SettingItemWrapper from '../../components/SettingItemWrapper/SettingItemWrapper'

interface Props {
  id: string
  isSubmitting: boolean
  isGrayTheme: boolean
  updateGlobalSettingById: Function
}

const GrayTheme: FC<Props> = ({
  id,
  isGrayTheme,
  isSubmitting,
  updateGlobalSettingById,
}) => {
  const handleSwitchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    await updateGlobalSettingById({
      variables: { input: { isGrayTheme: e.target.checked, id } },
      optimisticResponse: {
        __typename: 'Mutation',
        updateGlobalSettingById: {
          id,
          __typename: 'GlobalSettingModel',
          isGrayTheme: e.target.checked,
        },
      },
    })
  }

  return (
    <SettingItemWrapper title="Gray Theme">
      <FormControlLabel
        control={
          <Switch
            checked={isGrayTheme}
            onChange={handleSwitchChange}
            color="primary"
            disabled={isSubmitting}
          />
        }
        label="Is Gray Theme?"
        labelPlacement="start"
      />
    </SettingItemWrapper>
  )
}

export default GrayTheme
