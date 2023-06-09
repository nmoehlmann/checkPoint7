import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {
  async createTicket(eventId) {
    const res = await api.post(`api/tickets/`, {eventId})
    logger.log('CREATING TICKET', res.data)
    AppState.tickets.push(new Ticket(res.data))
  }

}

export const ticketsService = new TicketsService()