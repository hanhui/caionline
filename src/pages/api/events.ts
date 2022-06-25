import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import  serviceKit from '../../services/serviceKit'


export default withIronSessionApiRoute(eventsRoute, sessionOptions)

async function eventsRoute(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user

  if (!user || user.isLoggedIn === false) {
    res.status(401).end()
    return
  }

  try {
    const { data: events } =
      await serviceKit.TestService({
        username: user.login,
      })

    res.json(events)
  } catch (error) {
    res.status(200).json([])
  }
}
