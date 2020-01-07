import React, { FC } from 'react'
import Uploader from 'src/components/Uploader/Uploader'

const Motto: FC = () => {
  const onChange = (data: any) => {
    console.log(data)
  }
  return <Uploader onChange={onChange} />
}

export default Motto
