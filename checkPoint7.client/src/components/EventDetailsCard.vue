<template>
  <main class="container-fluid elevation-3" v-if="event">
    <section class="row">
      <div class="col-4 p-4">
        <img class="img-fluid" :src="event?.coverImg" alt="event-coverImg">
      </div>
      <div class="col-8">
        <section class="row">
          <div class="col-6">
            <h1>{{ event.name }}</h1>
            <p>{{ event.location }}</p>
          </div>
          <div class="col-6">
            <h2>{{ event.startDate }}</h2>
          </div>
        </section>
        <article class="row">
          <p>{{ event.description }}</p>
        </article>
        <section class="row">
          <div class="col-6">
            <p>{{ event.capacity }}</p>
          </div>
          <div class="col-6" v-if="user?.isAuthenticated">
            <button @click="createTicket()" class="btn btn-primary">Attend</button>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>


<script>
import Pop from "../utils/Pop.js"
import { ticketsService } from "../services/TicketsService.js"
import { useRoute } from "vue-router"
import { computed } from "vue"
import { AppState } from "../AppState.js"

export default {
  props: {
    event: { type: Event, required: true }
  },
  setup() {
    const route = useRoute()

    return {

      async createTicket() {
        try {
          const eventId = route.params.id
          await ticketsService.createTicket(eventId)
        } catch (error) {
          Pop.error(error, 'there was an error creating a ticket')
        }
      },

      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    }
  }
}
</script>


<style lang="scss" scoped></style>