import { FC, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { CircularProgress } from '@material-ui/core'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import classNames from 'classnames'
import { GOOGLE_RECAPTCHA_URL } from 'src/shared/constants'
import { useScriptUrl } from 'src/hooks/useScript'
import { LOGIN } from './typeDefs'
import { getBackgroundUrl } from './utils'
import styles from './Auth.module.scss'

const Login: FC = () => {
  const history = useHistory()
  const [isRecaptchaLoading, setIsRecaptchaLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  useScriptUrl(GOOGLE_RECAPTCHA_URL)

  const toRegister = () => {
    // history.push('/register')
    enqueueSnackbar('暂不开放注册功能, 敬请谅解! (权限管理还没写呢)', {
      variant: 'error',
    })
  }

  const initialValues = {
    email: '',
    password: '',
  }

  const [login, { called, loading }] = useLazyQuery(LOGIN, {
    notifyOnNetworkStatusChange: true,

    onCompleted(data) {
      window.localStorage.setItem('token', data.login.authorization)
      window.localStorage.setItem('userId', data.login._id)
      history.push('/')
    },
  })

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('This field is required.'),
    password: Yup.string().required('This field is required.'),
  })

  const { handleSubmit, getFieldProps, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(async () => {
          try {
            setIsRecaptchaLoading(true)
            const token = await window.grecaptcha.execute(
              process.env.REACT_APP_RECAPTCHA_KEY,
              { action: 'submit' },
            )

            login({
              variables: { input: { ...values, token } },
            })
          } catch (e) {
            enqueueSnackbar(
              'Google reCAPTCHA is not effective. Please refresh the page.',
              {
                variant: 'error',
              },
            )
          } finally {
            setIsRecaptchaLoading(false)
          }
        })
      } else {
        enqueueSnackbar(
          'Please make sure your network environment supports Google reCAPTCHA',
          {
            variant: 'error',
          },
        )
      }
    },
  })

  return (
    <main
      className={styles.loginWrapper}
      style={{ backgroundImage: `url(${getBackgroundUrl()})` }}
    >
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.header}>Welcome back!</div>
        <div className={styles.headerExtra}>
          We're so excited to see you again!
        </div>
        <label htmlFor="email" className={styles.label}>
          {errors.email ? (
            <span className={styles.error}>
              Email - <span className={styles.errorMsg}>{errors.email}</span>
            </span>
          ) : (
            'Email'
          )}
          <input
            id="email"
            type="text"
            className={classNames(
              { [styles.errorInputTxt]: errors.email },
              styles.inputTxt,
            )}
            {...getFieldProps('email')}
          />
        </label>

        <label htmlFor="password" className={styles.label}>
          {errors.password ? (
            <span className={styles.error}>
              Password -
              <span className={styles.errorMsg}>{errors.password}</span>
            </span>
          ) : (
            'Password'
          )}
          <input
            id="password"
            type="password"
            className={classNames(
              { [styles.errorInputTxt]: errors.password },
              styles.inputTxt,
            )}
            {...getFieldProps('password')}
          />
        </label>

        <p className={styles.link}>Forgot your password?</p>

        <button
          className={styles.submitBtn}
          type="submit"
          disabled={(called && loading) || isRecaptchaLoading}
        >
          {(called && loading) || isRecaptchaLoading ? (
            <CircularProgress size={30} />
          ) : (
            'Login'
          )}
        </button>

        <>
          <span className={styles.registerTip}>Need an account?</span>
          <span className={styles.link} onClick={toRegister}>
            {' '}
            Register
          </span>
        </>
      </form>

      <p className={styles.copyright}>
        Copyright &copy; {new Date().getFullYear()} Yancey Inc. and its
        affiliates.
      </p>
    </main>
  )
}

export default Login
