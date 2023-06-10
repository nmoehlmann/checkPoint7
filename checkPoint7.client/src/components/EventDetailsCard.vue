<template>
  <main class="container-fluid elevation-3" v-if="event">
    <section class="row">
      <div class="col-4 p-4">
        <img v-if="currentEvent.isCanceled == false" class="img-fluid" :src="event?.coverImg" alt="event-coverImg">
        <img class="img-fluid" v-if="currentEvent.isCanceled == true" src="https://pngimg.com/d/sold_out_PNG73.png"
          alt="">
        <p class="fs-2 fw-bold text-center">{{ event.type }}</p>
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
            <!-- NOTE make this number persist through page reload -->
            <p>Tickets Remaining: {{ currentEvent.capacity - currentEvent.ticketCount }}</p>
            <h1 v-if="currentEvent.capacity == currentEvent.ticketCount" class="text-danger">SOLD OUT!!!!</h1>
          </div>
          <div class="col-6 d-flex justify-content-around" v-if="user?.isAuthenticated">
            <button v-if="!isAttending && currentEvent.isCanceled == false" @click="createTicket()"
              class="btn btn-primary">Attend</button>
            <button v-if="isAttending && currentEvent.isCanceled == false" @click="deleteTicket()"
              class="btn btn-danger">Leave</button>
            <!-- TODO make everything render when button is clicked -->
            <button v-if="event.creator.id == account.id && event.isCanceled == false" @click="cancelEvent(event.id)"
              class="btn btn-dark">Cancel</button>
            <!-- <button v-if="event.creator.id == account.id && event.isCanceled == true" @click="cancelEvent(event.id)"
              class="btn btn-success">ReCreate</button> -->
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
import { eventsService } from "../services/EventsService.js"
import { logger } from "../utils/Logger.js"
import { router } from "../router.js"

export default {
  props: {
    event: { type: Event, required: true }
  },
  setup() {

    const route = useRoute()
    return {

      async deleteTicket() {
        try {
          if (await Pop.confirm) {
            const ticket = AppState.tickets.find(t => t.accountId == AppState.
              account.id)
            await ticketsService.deleteTicket(ticket.id)
          }
        } catch (error) {
          Pop.error(error, 'error deleting ticket')
        }
      },

      async createTicket() {
        try {
          const eventId = route.params.id
          await ticketsService.createTicket(eventId)
        } catch (error) {
          Pop.error(error, 'there was an error creating a ticket')
        }
      },

      async cancelEvent(eventId) {
        try {
          logger.log(eventId, 'THIS IS THE EVENT ID')
          await eventsService.cancelEvent(eventId)
        } catch (error) {
          Pop.error(error, 'issue canceling event')
        }
      },

      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      isAttending: computed(() => AppState.tickets.find(t => t.accountId == AppState.user.id)),
      myTickets: computed(() => AppState.myTickets),
      currentEvent: computed(() => AppState.activeEvent),
      // ticketsRemaining: computed(() => AppState.remainingTickets)
    }
  }
}
</script>


<style lang="scss" scoped></style>