import { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useMutation } from '@apollo/client'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import classNames from 'classnames'
import { CircularProgress } from '@material-ui/core'
import { PASSWORD_REGEXP } from 'src/shared/constants'
import { getBackgroundUrl } from './utils'
import { REGISTER } from './typeDefs'
import styles from './Auth.module.scss'

const Register: FC = () => {
  const history = useHistory()

  const { enqueueSnackbar } = useSnackbar()

  const [register, { loading }] = useMutation(REGISTER, {
    onCompleted(data) {
      window.localStorage.setItem('token', data.register.authorization)
      window.localStorage.setItem('userId', data.register._id)
      history.push('/')
    },
    onError() {},
  })

  const initialValues = {
    email: '',
    username: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required.'),
    username: Yup.string().required('UserName is required.'),
    password: Yup.string()
      .matches(PASSWORD_REGEXP, 'Please enter a more complex password')
      .required('Password is required.'),
  })

  const { handleSubmit, getFieldProps, resetForm, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await register({ variables: { input: values } })
      resetForm()
    },
  })

  // TODO: support register.
  useEffect(() => {
    enqueueSnackbar('暂不开放注册, 敬请谅解!', {
      variant: 'error',
    })

    setTimeout(() => {
      history.push('/login')
    }, 500)
  }, [enqueueSnackbar, history])

  return (
    <main
      className={styles.loginWrapper}
      style={{ backgroundImage: `url(${getBackgroundUrl()})` }}
    >
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.header}>Create an Account</div>
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
        <label htmlFor="username" className={styles.label}>
          {errors.username ? (
            <span className={styles.error}>
              Username -{' '}
              <span className={styles.errorMsg}>{errors.username}</span>
            </span>
          ) : (
            'Username'
          )}
          <input
            id="username"
            type="text"
            className={classNames(
              { [styles.errorInputTxt]: errors.username },
              styles.inputTxt,
            )}
            {...getFieldProps('username')}
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
        <button className={styles.submitBtn} type="submit">
          {loading ? <CircularProgress size={30} /> : 'Register'}
        </button>

        <p className={styles.link}>
          <Link to="/login">Already have an account? </Link>
        </p>

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
      </form>
    </main>
  )
}

export default Register
