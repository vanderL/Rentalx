import { ResetPasswordUserController } from '@modules/accounts/UseCases/resetPasswordUser/ResetPasswordUserController'
import { SendForgotPasswordMailController } from '@modules/accounts/UseCases/sendForgotPasswordMail/SendForgotPasswordMailController'
import { Router } from 'express'


const passwordRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordUserController = new ResetPasswordUserController()

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle)
passwordRoutes.post("/reset", resetPasswordUserController.handle)

export { passwordRoutes }
