<template>
  <div class="col-8 offset-2 my-2" v-if="myTicket">
    <section class="row">
      <div class="col-4">
        <router-link :to="{ name: 'EventDetails', params: { id: myTicket.event.id } }">
          <img class="img-fluid" :src="myTicket.event.coverImg" :alt="myTicket.event.name">
        </router-link>
      </div>
      <div class="col-8">
        <p>{{ myTicket.event.name }}</p>
        <p>{{ myTicket.event.location }}</p>
        <button class="btn btn-danger" @click="deleteTicket(myTicket.id)">Discard</button>
      </div>
    </section>
  </div>
</template>


<script>
import { Ticket } from "../models/Ticket.js";
import { ticketsService } from "../services/TicketsService.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    myTicket: { type: Ticket, required: true }
  },
  setup() {
    return {
      async deleteTicket(ticketId) {
        try {
          await ticketsService.deleteTicket(ticketId)
        } catch (error) {
          Pop.error(error, 'error deleting ticket')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>