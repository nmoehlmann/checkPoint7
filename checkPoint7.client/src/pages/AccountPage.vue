<template>
  <header>
    <Navbar />
  </header>
  <section class="row text-center">
    <h1>My Events</h1>
  </section>
  <main class="container-fluid">
    <section class="row" v-for="t in myTickets" :key="t.creator">
      <MyTickets :myTicket="t" />
    </section>
  </main>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";
import { ticketsService } from "../services/TicketsService.js";
export default {

  setup() {
    const route = useRoute()

    async function getMyTickets() {
      try {
        await ticketsService.getMyTickets(route.params.id)
      } catch (error) {
        Pop.error(error, 'error getting my tickets')
      }
    }

    onMounted(() => getMyTickets())
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
