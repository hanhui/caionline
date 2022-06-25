import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../lib/session'

import  serviceKit from '../../services/serviceKit'

export default withIronSessionApiRoute(registerRoute, ironOptions)

async function registerRoute(req, res) {
  const { username } = await req.body
  try {
    let data =await serviceKit.UsersService(username);
    const user = { isLoggedIn: true, login:'login', avatarUrl: '/GitHub-Mark-32px.png' } 
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
