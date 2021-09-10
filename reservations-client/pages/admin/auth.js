import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { getSession, signIn } from 'next-auth/client'

import CustomInput from './../../components/ui/form/CustomInput/CustomInput'
import IconButton from '../../components/ui/buttons/IconButton'

const Auth = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/admin/dashboard')
      } else {
        setIsLoading(false)
      }
    })
  }, [router])

  const handleSubmit = async (event) => {
    console.log(event)
    event.preventDefault()

    setIsSubmitting(true)

    const email = emailInputRef.current.value
    const password = passwordInputRef.current.value

    try {
      const loginResponse = await signIn('credentials', {
        // Resppnse will always return an object, however if thereis an error,
        // there will be an error property in the object
        redirect: false, // by default, when we encounter an error during signin, next-auth will redirect
        // Here we do not want to redirect from the login page, thus we set this to false.
        email,
        password
      })

      console.log(loginResponse)

      if (loginResponse.error) {
        console.log(loginResponse.error)
      } else {
        const devdezynLocalData = localStorage.getItem('devdezynData')
        if (devdezynLocalData) {
          const parsedDevdezynData = JSON.parse(devdezynLocalData)
          parsedDevdezynData.selectedMenuItem = 'a'
          localStorage.setItem('devdezynData', JSON.stringify(parsedDevdezynData))
        }
        router.replace('/admin/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="Auth">
      <div className="Auth__form-wrapper">
        <h2>Devdezyn CMS</h2>
        <form onSubmit={handleSubmit}>
          <CustomInput
            type="email"
            ref={emailInputRef}
            icon="las la-envelope"
            placeholder="Email/Username"
          />
          <CustomInput
            type="password"
            ref={passwordInputRef}
            icon="las la-lock"
            placeholder="Password"
          />
          <IconButton label="login" expand isLoading={isSubmitting} />
        </form>
      </div>

      <style jsx>{`
        .Auth {
          background: #1a202e;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          text-align: center;
        }

        .Auth__form-wrapper {
          transform: translateY(-40%);
          border-radius: 5px;
          background: #fff;
          padding: 2.6rem 2rem;
          width: 38rem;
        }

        .Auth__form-wrapper h2 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 2rem;
        }

        .Auth__form-wrapper p {
          font-size: 1.6rem;
          margin-bottom: 2rem;
          letter-spacing: 0.05rem;
          color: #7d7c83;
        }

        // .Auth__image {
        //   background: url(/images/auth-image.jpg);
        //   background-repeat: no-repeat;
        //   background-size: cover;
        //   position: relative;
        //   padding: 2rem;
        //   flex: 1;
        // }

        // .Auth__form {
        //   flex: 0 0 60%;
        // }

        // .Auth__cta {
        //   position: absolute;
        //   top: 50%;
        //   left: 50%;
        //   transform: translate(-50%, -60%);
        //   color: #fff;
        // }

        // .Auth__cta h2 {
        //   font-size: 3.2rem;
        //   font-weight: 500;
        //   line-height: 1.5;
        //   margin-bottom: 1.5rem;
        // }

        // .Auth__cta p {
        //   font-size: 1.6rem;
        //   line-height: 1.6;
        //   font-weight: 300;
        //   opacity: 0.7;
        // }
      `}</style>
    </div>
  )
}

export default Auth
