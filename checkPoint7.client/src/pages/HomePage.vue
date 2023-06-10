<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <section class="row">
      <!-- TODO hero image -->
    </section>
    <section class="row">
      <div class="col-8 offset-2">
        <div class="d-flex justify-content-around my-3">
          <button @click="filterBy = ''">All</button>
          <button @click="filterBy = 'concert'">Concert</button>
          <button @click="filterBy = 'convention'">Convention</button>
          <button @click="filterBy = 'sport'">Sport</button>
          <button @click="filterBy = 'digital'">Digital</button>
        </div>
      </div>
    </section>
    <section class="row">
      <div class="col-3" v-for="e in events" :key="e.id">
        <EventCard :event="e" />
      </div>
    </section>
  </main>
</template>

<script>
import { onMounted, ref } from "vue";
// import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { computed } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    const filterBy = ref('')
    async function getAllEvents() {
      try {
        // logger.log('getting events')
        await eventsService.getAllEvents()

      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(() => getAllEvents())
    return {
      // events: computed(() => AppState.events),
      filterBy,
      events: computed(() => {
        if (filterBy.value == "") {
          return AppState.events
        } else {
          return AppState.events.filter(e => e.type == filterBy.value)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.buttonActive {
  color: green;
}
</style>
