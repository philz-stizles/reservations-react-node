import React from 'react'
import { signOut } from 'next-auth/client'

const LogoutButton = () => {
  return (
    <button onClick={() => signOut()} className="LogoutLink" aria-hidden="true">
      <i className="las la-sign-out-alt" /> Logout
      <style jsx>{`
        .LogoutButton {
          display: inline-flex;
          margin-top: 2rem;
          color: crimson;
        }

        .LogoutButton i {
          font-size: 2.4rem;
          margin-right: 1rem;
        }
      `}</style>
    </button>
  )
}

export default LogoutButton
