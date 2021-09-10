import Link from 'next/link'
import React from 'react'
import Button from '../../ui/buttons/Button'
import styles from './Navbar.module.scss'

const Navbar = () => {
  return (
    <div className={['container', styles.navbar].join(' ')}>
      <div className={styles.navbar__logo}>Philz Blog</div>

      <ul className={styles.nav}>
        <li className={styles.nav__item}>
          <a className={styles.nav__link} href="/about">
            About us
          </a>
        </li>
        <li className={styles.nav__item}>
          <Link href="/portfolio">
            <a className={styles.nav__link}>Portfolio</a>
          </Link>
        </li>
        <li className={styles.nav__item}>
          <a className={styles.nav__link} href="/services">
            Our Services
          </a>
        </li>
        <li className={styles.nav__item}>
          <a className={styles.nav__link} href="/blogs">
            Blog
          </a>
        </li>
        <li className={styles.nav__item}>
          <a className={styles.nav__link} href="/pricing">
            Pricing
          </a>
        </li>
        <li className={styles.nav__item}>
          <Button>Join now</Button>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
