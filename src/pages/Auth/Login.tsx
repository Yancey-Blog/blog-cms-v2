import React, { FC } from 'react'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { CircularProgress } from '@material-ui/core'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import classNames from 'classnames'
import { LOGIN } from './typeDefs'
import { getBackgroundUrl } from './utils'
import styles from './Auth.module.scss'

const Login: FC = () => {
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

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
      login({
        variables: { input: values },
      })
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
          disabled={called && loading}
        >
          {called && loading ? <CircularProgress size={30} /> : 'Login'}
        </button>

        <>
          <span className={styles.registerTip}>Need an account?</span>
          <span className={styles.link} onClick={toRegister}>
            Register
          </span>
        </>
      </form>
    </main>
  )
}

export default Login
