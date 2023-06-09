<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <section class="row">
      hero img
    </section>
    <section class="row">
      <div class="col-3" v-for="e in events" :key="e.id">
        <EventCard :event="e"/>
      </div>
    </section>
  </main>
</template>

<script>
import { onMounted } from "vue";
// import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { computed } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
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
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
