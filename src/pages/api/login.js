import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../lib/session'
import * as serviceKit from '../../services/'

export default withIronSessionApiRoute(loginRoute, ironOptions)

async function loginRoute(req, res) {
  const { email, password } = await req.body;
  try {
    //下面代码也是可以的
    // serviceKit.signServices.login({ email, password }).then( async (rtn) => {      
    //   const user = { isLoggedIn: true, login: rtn.data.username ? rtn.data.username : email, email: email, avatarUrl: '/static/images/avatars/avatar_7.png' }
    //   req.session.user = user
    //   await req.session.save()
    //   res.json(user)
    // });
    let rtn = await serviceKit.signServices.login({ email, password })
    const user = { isLoggedIn: true, login: rtn.data.username ? rtn.data.username : email, email: email, avatarUrl: '/static/images/avatars/avatar_7.png' }
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}
