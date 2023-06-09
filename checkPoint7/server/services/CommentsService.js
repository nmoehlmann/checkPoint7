import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"

class CommentsService {
  async removeComment(commentId, userId) {
    const removedComment = await dbContext.Comments.findById(commentId).populate('event creator')
    if (!removedComment) throw new BadRequest(`Comment at id: ${commentId} does not exist`)
    if (removedComment.creatorId != userId) throw new Forbidden("STOP, pay your fines or your coming with us")

    // logger.log(removedComment)
    await removedComment.remove()
    return 'Comment has been deleted'
  }
  async findEventComments(eventId) {
    const eventComments = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
    return eventComments
  }
  async createComment(commentData) {
    const newComment = (await dbContext.Comments.create(commentData))
    await newComment.populate('creator event')
    return newComment
  }

}

export const commentsService = new CommentsService()