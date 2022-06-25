import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../lib/session'


export default withIronSessionApiRoute(userRoute, ironOptions)

async function userRoute(req, res) {
  console.log('req.session.user',req.session.user)
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    await res.json({
      ...req.session.user,
      isLoggedIn: true,
    })
  } else {
    await res.json({
      isLoggedIn: false,
      login: '',
      avatarUrl: '',
    })
  }
}
