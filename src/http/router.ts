import Router from 'koa-router'
import login from './middleware/user/login'
import register from "./middleware/user/register";
import checkAT from "./middleware/user/checkAT";
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

router.post('/login', login, setDefHeaders)
router.post('/register', register, setDefHeaders)
router.post('/check', isHeadersWithToken, checkAT, setDefHeaders)

export default router
