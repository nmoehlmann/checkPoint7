import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.findAllEvents)
      .get('/:eventId', this.findEventById)
      .get('/:eventId/tickets', this.findEventTickets)
      .get('/:eventId/comments', this.findEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.cancelEvent)
  }
  async findEventComments(req, res, next) {
    try {
      const eventComments = await commentsService.findEventComments(req.params.eventId)
      return res.send(eventComments)
    } catch (error) {
      next(error)
    }
  }

  async findEventTickets(req, res, next) {
    try {
      const eventId = req.params.eventId
      const eventTickets = await ticketsService.findEventTickets(eventId)
      return res.send(eventTickets)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const userId = req.userInfo.id
      const eventId = req.params.eventId
      const removedEvent = await eventsService.cancelEvent(eventId, userId)
      return res.send(removedEvent)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      const eventData = req.body
      const eventId = req.params.eventId
      const userId = req.userInfo.id
      // Checking if the users id is going to be the same as the events creatorId
      const editedEvent = await eventsService.editEvent(eventData, eventId, userId)
      return res.send(editedEvent)
    } catch (error) {
      next(error)
    }
  }

  async findEventById(req, res, next) {
    try {
      const event = await eventsService.findEventById(req.params.eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newEvent = await eventsService.createEvent(req.body)
      return res.send(newEvent)
    } catch (error) {
      next(error)
    }
  }

  async findAllEvents(req, res, next) {
    try {
      const events = await eventsService.findAllEvents()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }


}