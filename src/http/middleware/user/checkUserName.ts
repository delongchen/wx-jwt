import AvUser from "../../types/AvUser";
import {select} from "../../../mysql";
import { ResMsg } from "../../types/ResMsg";

const { UNKNOWN_ERR, NO_USER, USER_EXIST, EMPTY_NAME } = ResMsg

export default async function isUserNameExist(name: string | undefined): Promise<[ResMsg, AvUser?]> {
  if (!name) return [EMPTY_NAME]
  const {err, results: [user]} = await select<AvUser>({ where: {id: name}, limit: 1 })
  if (err) return [UNKNOWN_ERR(err.message)]
  if (!user) return [NO_USER]
  return [USER_EXIST, user]
}
