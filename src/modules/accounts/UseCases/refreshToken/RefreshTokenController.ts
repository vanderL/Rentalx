import { Request, Response } from "express";

class RefreshTokenController {

  async handle(request: Request, response: Response): Promise<Response> {
    return response.send('ok')
  }
}

export { RefreshTokenController }
