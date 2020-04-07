import React, { FC } from 'react'
import SettingsHeader from '../components/SettingsHeader/SettingsHeader'

const Profile: FC = () => {
  return (
    <section>
      <SettingsHeader
        title="Personal info"
        subTitle="Basic info, like your name and photo, that you use on Yancey Blog CMS services"
      />
    </section>
  )
}

export default Profile
