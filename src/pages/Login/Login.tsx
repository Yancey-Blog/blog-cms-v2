import React, { FC } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import classNames from 'classnames'
import styles from './Login.module.scss'

const Login: FC = () => {
  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required('This field is required.'),
    password: Yup.string().required('This field is required.'),
  })

  const {
    handleSubmit,
    getFieldProps,
    resetForm,
    isSubmitting,
    errors,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      // TODO:
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
          Username
          <input
            id="username"
            type="text"
            className={styles.inputTxt}
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

        <button
          className={styles.submitBtn}
          type="submit"
          disabled={isSubmitting}
        >
          Continue
        </button>

        <p className={styles.toLogin}>Already have an account?</p>
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

export default Login
