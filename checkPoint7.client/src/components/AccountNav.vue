<template>
  <main class="container-fluid">
    <section class="row">
      <Login />
    </section>
    <section class="row" v-if="user?.isAuthenticated">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createEvent">New
        Event</button>
    </section>
    <section class="row text-center">
      <RouterLink :to="{ name: 'Home' }">
        <p>Home</p>
      </RouterLink>
      <RouterLink :to="{ name: 'Account' }">
        <p>Account</p>
      </RouterLink>
    </section>
  </main>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
p {
  margin: 0
}
</style>