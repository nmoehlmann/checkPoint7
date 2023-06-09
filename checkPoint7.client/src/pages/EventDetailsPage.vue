<template>
  <main class="container-fluid">
    <header>
      <Navbar />
    </header>
    <section class="row">
      <EventDetailsCard :event="event" />
    </section>
    <section class="row my-2">
      <div class="col-2 d-flex justify-content-center align-items-center flex-column" v-for="t in tickets"
        :key="t.accountId">
        <img class="account-img" :src="t.profile.picture" alt="">
        <p :t="t">{{ t.profile.name }}</p>
      </div>
    </section>
    <div class="col-1"></div>
    <section class="row" v-if="user?.isAuthenticated">
      <form @submit.prevent="createComment()">
        <div class="col-8 offset-2 d-flex justify-content-center flex-column">
          <textarea name="" id="" cols="30" rows="10" v-model="editable.body" placeholder="Tell the people..."></textarea>
          <div class="d-flex justify-content-center mt-2">
            <button class="btn btn-success" type="submit">Post Comment</button>
          </div>
        </div>
      </form>
    </section>
    <section class="row">
      <div class="col-8 elevation-3 my-2 offset-2" v-for="c in comments" :key="c.id">
        <CommentCard :comment="c" />
      </div>
    </section>
  </main>
</template>


<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { AppState } from "../AppState.js";
import { computed } from "vue";
import { commentsService } from "../services/CommentsService.js"
import { Ticket } from "../models/Ticket.js";

export default {
  props: {
    ticket: { type: Ticket, required: true }
  },
  setup() {

    const route = useRoute()
    const editable = ref({})

    async function getEventById() {
      try {
        // debugger
        const eventId = route.params.id
        logger.log(eventId)
        await eventsService.getEventById(eventId)
      } catch (error) {
        Pop.error(error)
      }
    }

    async function getEventTickets() {
      try {
        const eventId = route.params.id
        await eventsService.getEventTickets(eventId)
      } catch (error) {
        Pop.error(error, 'couldnt get event tickets')
      }
    }

    async function getEventComments() {
      try {
        const eventId = route.params.id
        await eventsService.getEventComments(eventId)
      } catch (error) {
        Pop.error(error, 'issue getting comments')
      }
    }

    onMounted(() => {
      getEventById()
      getEventTickets()
      getEventComments()
    })
    return {
      event: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.tickets),
      comments: computed(() => AppState.comments),
      user: computed(() => AppState.user),
      editable,

      async createComment() {
        try {
          const formData = editable.value
          formData.eventId = route.params.id
          logger.log(formData)
          await commentsService.createComment(formData)
        } catch (error) {
          Pop.error(error, 'issue posting comment')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.account-img {
  height: 5rem;
  width: 5rem;
  object-fit: contain
}
</style>