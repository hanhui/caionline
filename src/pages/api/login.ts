
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../lib/session'

import serviceKit from '../../services/serviceKit'

export default withIronSessionApiRoute(loginRoute, ironOptions)

async function loginRoute(req, res) {
  const { username, email, password } = await req.body;
  try {
    let data = await serviceKit.UsersService(username);
    const user = { isLoggedIn: true, login: username ? username : email, email: email, avatarUrl: '/static/images/avatars/avatar_7.png' }
    console.log(user);
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
