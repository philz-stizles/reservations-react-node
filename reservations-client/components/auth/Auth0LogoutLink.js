import Link from 'next/link'
import React from 'react'

const Auth0LogoutLink = () => {
  return (
    <Link href="/api/auth/logout?returnTo=http://localhost:3000/admin/auth">
      <a className="Auth0LogoutLink">
        <i className="las la-sign-out-alt" /> Logout
        <style jsx>{`
          .Auth0LogoutLink {
            display: inline-flex;
            margin-top: 2rem;
            color: crimson;
          }

          .Auth0LogoutLink i {
            font-size: 2.4rem;
            margin-right: 1rem;
          }
        `}</style>
      </a>
    </Link>
  )
}

export default Auth0LogoutLink
