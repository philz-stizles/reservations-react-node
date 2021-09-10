import { Provider as NextAuthProvider } from 'next-auth/client'
import { Provider } from 'react-redux'
import store from '../store/redux/store'
import '../public/icons/line-awesome/1.3.0/css/line-awesome.min.css'
import '../styles/globals.css'
import '../styles/layout.css'
import '../styles/utilities.css'
import { NotificationProvider } from '../store/context/notification-context'

function MyApp({ Component, pageProps }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Provider store={store}>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </Provider>
    </NextAuthProvider>
  )
}

export default MyApp
