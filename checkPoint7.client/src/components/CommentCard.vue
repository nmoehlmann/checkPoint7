<template>
  <section class="row">
    <div class="col-2">
      <img class=" rounded-circle img-fluid" :src="comment.creator.picture" alt="">
    </div>
    <div class="col-10">
      <p>{{ comment.creator.name }}</p>
      <div class="card">
        <p>{{ comment.body }}</p>
      </div>
    </div>
  </section>
  <section class="row" v-if="comment.creator.id == account.id">
    <div class="d-flex justify-content-end">
      <button @click="deleteComment(comment.id)" class="btn btn-danger">Delete</button>
    </div>
  </section>
</template>


<script>
// import { popScopeId } from "vue";
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { commentsService } from "../services/CommentsService.js";
// import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    comment: { type: Comment, required: true }
  },
  setup() {
    return {
      async deleteComment(commentId) {
        try {
          await commentsService.deleteComment(commentId)
        } catch (error) {
          Pop.error(error)
        }
      },

      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
.pfp {
  height: 20rem;
  width: 20rem;
}

p {
  margin: 0
}
</style>