import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {
  async createTicket(eventId) {
    const res = await api.post(`api/tickets/`, {eventId})
    logger.log('CREATING TICKET', res.data)
    AppState.tickets.push(new Ticket(res.data))
    AppState.activeEvent.capacity--
  }

  async getMyTickets() {
    const res = await api.get('account/tickets')
    logger.log('GETTING ACCOUNT TICKETS', res.data)
    AppState.myTickets = res.data.map(t => new Ticket(t))
    logger.log(AppState.myTickets)
  }

  async deleteTicket(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`)
    logger.log('DELETING TICKET', res.data)
    if(AppState.myTickets) {
      AppState.myTickets = AppState.myTickets.filter(t => t.id != ticketId)
    }
    AppState.tickets = AppState.tickets.filter(t => t.id != ticketId)
    AppState.activeEvent.capacity++
  }

}

export const ticketsService = new TicketsService()