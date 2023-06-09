<template>
  <router-link :to="{ name: 'EventDetails', params: { id: event.id } }">
    <main class="elevation-3 event-coverImg d-flex flex-column justify-content-end">
      <section class="row blurCard text-light">
        <div class="col-8">
          <p>{{ event.name }}</p>
          <p>{{ event.location }}</p>
          <p>{{ event.startDate }}</p>
        </div>
        <div class="col-4">
          <p>{{ event.capacity }}</p>
        </div>
      </section>
    </main>
  </router-link>
</template>


<script>
import { computed } from "vue";
import { Event } from "../models/Event.js";

export default {
  props: {
    event: { type: Event, required: true }
  },
  setup(props) {
    return {
      coverImg: computed(() => `url(${props.event?.coverImg}`)
    }
  }
}
</script>


<style lang="scss" scoped>
.event-coverImg {
  background-image: v-bind(coverImg);
  background-position: center;
  background-size: cover;
  height: 17rem;
}

.blurCard {
  background: rgba($color: #000000, $alpha: .8)
}
</style>