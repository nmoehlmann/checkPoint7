import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { Event } from "../models/Event.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class EventsService {
  async getAllEvents() {
    const res = await api.get('api/events')
    logger.log('GETTING EVENTS', res.data)
    AppState.events = res.data.map(e => new Event(e))
    logger.log('appState', AppState.events)
  }

  async getEventById(eventId) {
    const res = await api.get(`api/events/${eventId}`)
    AppState.activeEvent = new Event(res.data)
    logger.log(AppState.activeEvent)
  }

  async createEvent(formData) {
    const res = await api.post('api/events', formData)
    logger.log('CREATING EVENT', res.data)
    return res.data
  }

  async getEventTickets(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log(res.data)
    AppState.tickets = res.data.map(t => new Ticket(t))
    logger.log(AppState.tickets, 'appstate tickets')
  }

  async getEventComments(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log(res.data, 'res.data for COMMENTS') 
    AppState.comments = res.data.map(c => new Comment(c))
    logger.log(AppState.comments, 'AppState COMMENTS')
  }

  async cancelEvent(eventId) {
    const event = AppState.events.find(e => e.id == eventId)
    logger.log(event)
    event.isCanceled != event.isCanceled

    const res = await api.delete(`api/events/${eventId}`, event)
    logger.log(res.data, 'did the bool flip?')
    AppState.activeEvent = new Event(res.data)
  }
}

export const eventsService = new EventsService()