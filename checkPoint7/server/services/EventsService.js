import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
  async cancelEvent(eventId, userId) {
    const foundEvent = await this.findEventById(eventId)

    foundEvent.isCanceled = true

    if (foundEvent.creatorId != userId) {
      throw new Forbidden("Hey!, Thats not yours to cancel")
    }
    foundEvent.isCanceled = true
    await foundEvent.save()
    return foundEvent
  }
  async editEvent(eventData, eventId, userId) {
    const originalEvent = await this.findEventById(eventId)

    if (originalEvent.creatorId != userId) {
      throw new Forbidden("Hey! Thats not yours to edit")
    }

    if (originalEvent.isCanceled == true) {
      throw new BadRequest("You cannot edit a canceled event")
    } else {

      originalEvent.name = eventData.name || originalEvent.name
      originalEvent.description = eventData.description || originalEvent.description
      originalEvent.coverImg = eventData.coverImg || originalEvent.coverImg
      originalEvent.location = eventData.location || originalEvent.location
      originalEvent.capacity = eventData.capacity || originalEvent.capacity
      originalEvent.startDate = eventData.startDate || originalEvent.startDate
      originalEvent.type = eventData.type || originalEvent.type

      await originalEvent.save()
      return originalEvent
    }

  }
  async findEventById(eventId) {
    const event = await dbContext.Events.findById(eventId).populate('creator ticketCount')
    if (!event) throw new BadRequest(`Event at id: ${eventId} could not be found`)
    return event
  }
  async createEvent(eventData) {
    const newEvent = await dbContext.Events.create(eventData)
    await newEvent.populate('creator ticketCount')
    return newEvent
  }
  async findAllEvents() {
    const events = await dbContext.Events.find().populate('creator ticketCount')
    return events
  }

}

export const eventsService = new EventsService()