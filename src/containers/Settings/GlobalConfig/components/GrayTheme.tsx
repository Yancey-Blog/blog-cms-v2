import { FC, ChangeEvent } from 'react'
import { FormControlLabel, Switch } from '@mui/material'
import { makeStyles, ClassNameMap, createStyles } from '@mui/styles'
import SettingItemWrapper from '../../components/SettingItemWrapper/SettingItemWrapper'

interface Props {
  id: string
  isSubmitting: boolean
  isGrayTheme: boolean
  updateGlobalSettingById: Function
}

const useStyles = makeStyles(() =>
  createStyles({
    label: {
      marginLeft: 0,
    },
  }),
)

const GrayTheme: FC<Props> = ({
  id,
  isGrayTheme,
  isSubmitting,
  updateGlobalSettingById,
}) => {
  const classes: ClassNameMap = useStyles()

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
        className={classes.label}
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
