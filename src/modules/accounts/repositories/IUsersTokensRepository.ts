import { UserTokens } from "../infra/typeorm/entities/UserTokens"
import { ICreateUserTokenDTO } from "./dtos/ICreateUserTokenDTO"

interface IUsersTokensRepository {
  create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens>
}

export { IUsersTokensRepository }
