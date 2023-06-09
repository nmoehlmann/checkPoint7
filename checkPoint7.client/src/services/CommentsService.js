import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async createComment(formData) {
    const res = await api.post('api/comments', formData)
    AppState.comments.push(new Comment(res.data))
  }
  async deleteComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`)
    logger.log('DELETING COMMENT', res.data)
    AppState.comments = AppState.comments.filter(c => c.id != commentId)
  }
}

export const commentsService = new CommentsService()