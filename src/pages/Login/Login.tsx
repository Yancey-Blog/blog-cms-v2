import React, { FC } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import styles from './Login.module.scss'

const Login: FC = () => {
  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required.'),
    password: Yup.string().required('Password is required.'),
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
          Email
          <input
            id="email"
            type="text"
            className={styles.inputTxt}
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
          Password
          <input
            id="password"
            type="password"
            className={styles.inputTxt}
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
            Privacy and Policy
          </a>
          .
        </p>
      </form>
    </main>
  )
}

export default Login
