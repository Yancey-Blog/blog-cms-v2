import React, { FC } from 'react'
import { useSnackbar } from 'notistack'
import { useLocation } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'
import { CircularProgress } from '@material-ui/core'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import classNames from 'classnames'
import { LOGIN } from './typeDefs'
import styles from './Login.module.scss'

const Login: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { pathname } = useLocation()

  const isLoginMode = pathname.includes('login')

  const initialValues = {
    email: '',
    password: '',
  }

  const [login, { called, loading }] = useLazyQuery(LOGIN, {
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      // 存到 localStorage
    },
    onError(error) {
      console.log(error)
      enqueueSnackbar(error.message, { variant: 'error' })
    },
  })

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required('This field is required.'),
    password: Yup.string().required('This field is required.'),
  })

  const { handleSubmit, getFieldProps, resetForm, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      login({
        variables: { input: values },
      })
      resetForm()
    },
  })

  return (
    <main className={styles.loginWrapper} id="xxxx">
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.header}>
          {isLoginMode ? 'Welcome back!' : 'Create an Account'}
        </div>
        {isLoginMode && (
          <div className={styles.headerExtra}>
            We're so excited to see you again!
          </div>
        )}
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

        {isLoginMode || (
          <label htmlFor="username" className={styles.label}>
            Username
            <input
              id="username"
              type="text"
              className={styles.inputTxt}
              {...getFieldProps('username')}
            />
          </label>
        )}

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
        {isLoginMode && <p className={styles.link}>Forgot your password?</p>}

        <button
          className={styles.submitBtn}
          type="submit"
          disabled={called && loading}
        >
          {called && loading ? <CircularProgress size={30} /> : 'Login'}
        </button>

        {isLoginMode ? (
          <>
            <span className={styles.registerTip}>Need an account?</span>
            <span className={styles.link}> Register</span>
          </>
        ) : (
          <p className={styles.link}>Already have an account?</p>
        )}

        {isLoginMode || (
          <p className={styles.license}>
            By registering, you agree to Yancey Inc.'s{' '}
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://m.yanceyleo.com/policy/service"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://m.yanceyleo.com/policy/privacy"
            >
              Privacy Policy
            </a>
            .
          </p>
        )}
      </form>
    </main>
  )
}

export default Login
