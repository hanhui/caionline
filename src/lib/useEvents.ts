import useSWR from 'swr'
import type { User } from '../pages/api/user'

export default function useEvents(user: User | undefined) {
  // We do a request to /api/events only if the user is logged in
  const { data: events } = useSWR(
    user?.isLoggedIn ? `../pages/api/events` : null
  )

  return { events }
}
