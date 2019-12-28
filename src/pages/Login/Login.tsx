import React, { Component } from 'react'
import classNames from 'classnames'
import Recaptcha from 'react-google-recaptcha'
import { recaptchaKey } from '../../shared/constants'
import styles from './Login.module.scss'

class Login extends Component {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    // @ts-ignore
    window.recaptchaOptions = {
      lang: 'ja',
    }
    // const btnStyle = {
    //   background: '#ccc',
    //   boxShadow: '0 0 4px #ccc',
    //   cursor: 'not-allowed',
    // }
    return (
      <main className={styles.loginWrapper}>
        <figure className={styles.blurBg} />
        <section className={styles.loginContainer}>
          <h1>
            <a href="https://www.yanceyleo.com/">
              <figure className={styles.titleImg} />
            </a>
          </h1>
          <div className={styles.userInputGroup}>
            <label htmlFor="account" className={styles.itemLabel}>
              Email Address
              <input
                id="account"
                className={styles.itemInput}
                type="email"
                // onChange={e => loginStore.onEmailChange(e)}
              />
            </label>
          </div>
          <div className={styles.userInputGroup}>
            <label htmlFor="password" className={styles.itemLabel}>
              Password
              <input
                id="password"
                className={styles.itemInput}
                type="password"
                // onChange={e => loginStore.onPasswordChange(e)}
              />
            </label>
          </div>
          <div className={styles.userInputGroup}>
            <span className={classNames(styles.itemLabel, styles.itemSpan)}>Recaptcha</span>
            <Recaptcha
              sitekey={recaptchaKey}
              // onChange={value => loginStore.onCaptchaChange(value)}
            />
          </div>
          <button
            type="button"
            className={styles.loginBtn}
            // onClick={loginStore.login}
            // disabled={!loginStore.isFilled || loginStore.loginStatus}
            // style={
            //   !loginStore.isFilled || loginStore.loginStatus ? btnStyle : {}
            // }
          >
            login
          </button>
        </section>
      </main>
    )
  }
}

export default Login
