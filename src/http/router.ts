import Router from 'koa-router'
import login from './middleware/user/login'
import register from "./middleware/user/register";
import getAllUsers from "./middleware/user/all";
import deleteUser from "./middleware/user/del";
import { parseBody } from "./middleware/body";
import { checkAT } from "./middleware/user/checkAT";
import {setDefHeaders, setStaticHeaders, isHeadersWithToken} from "./middleware/headers";
import {getPublicKey} from "../core/rsa";


const router = new Router

router.get('/pub',
  async (context, next) => {
    context.body = getPublicKey()
    await next()
  },
  setStaticHeaders('text')
)
router.post('/login', parseBody, login, setDefHeaders)
router.post('/register', parseBody, register, setDefHeaders)
router.get('/check', isHeadersWithToken, checkAT, setDefHeaders)
router.get('/users', isHeadersWithToken, getAllUsers, setDefHeaders)
router.post('/users', isHeadersWithToken, parseBody, deleteUser, setDefHeaders)

export default router
