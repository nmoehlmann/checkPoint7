import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";
import { logger } from "../utils/Logger.js";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.removeComment)
  }
  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      // logger.log(req.body, 'req.body what is it?')
      const newComment = await commentsService.createComment(req.body)
      // logger.log(newComment)
      return res.send(newComment)
    } catch (error) {
      next(error)
    }
  }

  async removeComment(req, res, next) {
    try {
      const userId = req.userInfo.id
      const commentId = req.params.commentId
      const removedComment = await commentsService.removeComment(commentId, userId)
      return res.send(removedComment)
    } catch (error) {
      next(error)
    }
  }
}