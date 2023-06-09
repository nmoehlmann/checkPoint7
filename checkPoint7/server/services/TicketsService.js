import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {
  async removeTicket(ticketId, userId) {
    const foundTicket = await dbContext.Tickets.findById(ticketId).populate('event profile')

    if (!foundTicket) throw new BadRequest(`Ticket at id: ${ticketId} does not exist`)
    if (foundTicket.accountId != userId) throw new Forbidden("that aint yours son")

    await foundTicket.remove()
    return `Ticket has been discarded`
  }
  async findEventTickets(eventId) {
    const eventTickets = await dbContext.Tickets.find({ eventId: eventId }).populate('event profile')
    return eventTickets
  }
  async findAccountTickets(accountId) {
    const accountTickets = await dbContext.Tickets.find({ accountId: accountId }).populate('event profile')
    return accountTickets
  }
  async createTicket(ticketData) {
    const newTicket = await dbContext.Tickets.create(ticketData)
    await newTicket.populate('event profile')
    return newTicket
  }

}

export const ticketsService = new TicketsService()