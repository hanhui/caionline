// import useSWR from 'swr'
import { root } from './Config'
const UsersService = (username) => {
  return fetch(root + '/api/user',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({username})
  }).then(rtn => rtn.json());
}
const TestService = (username) => {
  return fetch(root + '/api/user',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({username})
  }).then(rtn => rtn.json());
}
const serviceKit={UsersService, TestService}
export default serviceKit;
