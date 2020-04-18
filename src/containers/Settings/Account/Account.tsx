import React, { FC } from 'react'
import { useSnackbar } from 'notistack'
import { useMutation } from '@apollo/react-hooks'
import { logout } from 'src/shared/utils'
import client from 'src/shared/apolloClient'
import { UPDATE_USERNAME, UPDATE_EMAIL, DELETE_ACCOUNT } from './typeDefs'
import SettingsHeader from '../components/SettingsHeader/SettingsHeader'
import SettingWrapper from '../components/SettingWrapper/SettingWrapper'
import UpdateUserName from './components/UpdateUserName'
import UpdateEmail from './components/UpdateEmail'
import DeleteAccount from './components/DeleteAccount'

const Account: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const {
    username,
    email,
    // @ts-ignore
  } = client.cache.data.get(
    `UserModel:${window.localStorage.getItem('userId')}`,
  )

  const [updateUserName] = useMutation(UPDATE_USERNAME, {
    onCompleted(data) {
      if (data.updateUserName) {
        enqueueSnackbar(`Your username has been updated! Please Re-Login.`, {
          variant: 'success',
        })

        logout()
      }
    },
  })

  const [updateEmail] = useMutation(UPDATE_EMAIL, {
    onCompleted(data) {
      if (data.updateEmail) {
        enqueueSnackbar(`Your email has been updated! Please Re-Login.`, {
          variant: 'success',
        })
        logout()
      }
    },
  })

  const [deleteAccount, { loading: isDeletingAccount }] = useMutation(
    DELETE_ACCOUNT,
    {
      onCompleted() {
        enqueueSnackbar(
          `Your account has been deleted successfully! Just fuck off.`,
          {
            variant: 'success',
          },
        )

        logout()
      },
    },
  )

  return (
    <SettingWrapper>
      <SettingsHeader
        title="Account"
        subTitle="Change your own username, email or delete your account"
      />

      <UpdateUserName updateUserName={updateUserName} username={username} />
      <UpdateEmail updateEmail={updateEmail} email={email} />
      <DeleteAccount
        deleteAccount={deleteAccount}
        isDeletingAccount={isDeletingAccount}
      />
    </SettingWrapper>
  )
}

export default Account
