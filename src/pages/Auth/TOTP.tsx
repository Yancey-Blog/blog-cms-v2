import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { CircularProgress } from '@material-ui/core'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import classNames from 'classnames'
import { LOGIN_VERIFY_TOTP } from './typeDefs'
import { getBackgroundUrl } from './utils'
import styles from './Auth.module.scss'

const TOTP: FC = () => {
  const history = useHistory()

  const initialValues = {
    totpCode: '',
  }

  const [loginVerifyTOTP, { called, loading }] = useLazyQuery(
    LOGIN_VERIFY_TOTP,
    {
      notifyOnNetworkStatusChange: true,

      onCompleted(data) {
        if (data) {
          const {
            loginVerifyTOTP: { authorization, _id },
          } = data
          window.localStorage.setItem('token', authorization)
          window.localStorage.setItem('userId', _id)

          history.push('/')
        }
      },
    },
  )

  const validationSchema = Yup.object().shape({
    totpCode: Yup.string()
      .matches(/\d{6}/, { message: 'You must input 6 digits!' })
      .required('This field is required.'),
  })

  const { handleSubmit, getFieldProps, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      loginVerifyTOTP({
        variables: { totpCode: values.totpCode },
      })
    },
  })

  return (
    <main
      className={styles.loginWrapper}
      style={{ backgroundImage: `url(${getBackgroundUrl()})` }}
    >
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.header}>The Next Step!</div>
        <div className={styles.headerExtra}>
          Please enter your authentication token
        </div>

        <label htmlFor="totpCode" className={styles.label}>
          {errors.totpCode ? (
            <span className={styles.error}>
              TOTP Code -
              <span className={styles.errorMsg}>{errors.totpCode}</span>
            </span>
          ) : (
            'TOTP Code'
          )}
          <input
            id="totpCode"
            className={classNames(
              { [styles.errorInputTxt]: errors.totpCode },
              styles.inputTxt,
            )}
            {...getFieldProps('totpCode')}
          />
        </label>

        <button
          className={styles.submitBtn}
          type="submit"
          disabled={called && loading}
        >
          {called && loading ? <CircularProgress size={30} /> : 'Check Token'}
        </button>

        <span className={styles.registerTip}>
          Lost your device? <br /> You can use a recovery code in the form
          above.
        </span>
      </form>

      <p className={styles.copyright}>
        Copyright &copy; {new Date().getFullYear()} Yancey Inc. and its
        affiliates.
      </p>
    </main>
  )
}

export default TOTP
