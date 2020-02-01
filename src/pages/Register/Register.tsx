import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import classNames from 'classnames'
import { REGISTER } from './typeDefs'
import styles from '../Login/Login.module.scss'

const Register: FC = () => {
  const history = useHistory()

  const [register] = useMutation(REGISTER, {
    errorPolicy: 'all',
    onCompleted(data) {
      window.localStorage.setItem('token', data.register.authorization)
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
    email: Yup.string()
      .email()
      .required('This field is required.'),
    username: Yup.string().required('This field is required.'),
    password: Yup.string().required('This field is required.'),
  })

  const { handleSubmit, getFieldProps, resetForm, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      register({ variables: { input: values } })
      resetForm()
    },
  })

  return (
    <main className={styles.loginWrapper}>
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
          Register
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
