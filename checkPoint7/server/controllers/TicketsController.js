import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.removeTicket)
  }
  async removeTicket(req, res, next) {
    try {
      const userId = req.userInfo.id
      const ticketId = req.params.ticketId
      const removedTicket = await ticketsService.removeTicket(ticketId, userId)
      return res.send(removedTicket)
    } catch (error) {
      next(error)
    }
  }
  async createTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const newTicket = await ticketsService.createTicket(req.body)
      return res.send(newTicket)
    } catch (error) {
      next(error)
    }
  }

}