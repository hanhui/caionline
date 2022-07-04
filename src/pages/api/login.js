import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../lib/session'
import * as serviceKit from '../../services/'
import * as awServiceKit from '../../services/awServices'
import {v4 as uuid} from 'uuid'
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

   // let rtn = await serviceKit.signServices.login({ email, password })
   // console.log('rtn',rtn)
    //let resp = await awServiceKit.account.create(uuid(),email, password, name);
   // console.log('resp',resp)
   
   let s = await awServiceKit.account.createAnonymousSession();   
  // awServiceKit.client.
   console.log('s',s)
  //  let c = await awServiceKit.account.getSession('current')
  //  console.log('c',c)
    const logs = await awServiceKit.account.getLogs();
    console.log(logs)
    
    const data = await awServiceKit.account.get();
    console.log('data',data)
    // console.log('resp', resp);
    if (rtn.data?.token) {
      //window.localStorage.setItem("token",rtn.data?.token);
      const user = { token: rtn.data?.token, isLoggedIn: true, login: `${rtn.data.sign?.lastName} ${rtn.data.sign?.firstName} `, email: email, avatarUrl: '/static/images/avatars/avatar_7.png' }
      req.session.user = user
      await req.session.save()
      res.json(user)
    } else {
      const user = { token: '', isLoggedIn: false, login: '', email: email, avatarUrl: '/static/images/avatars/avatar_7.png' }
      res.json(user)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}
