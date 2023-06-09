<template>
  <main class="container-fluid">
    <section class="row">
      <div class="col-11">
        <router-view />
      </div>
      <div class="col-1">
        <AccountNav />
      </div>
    </section>
  </main>

  <Modal id="createEvent">
    <CreateEventForm />
  </Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.row {
  padding-right: 0;
  padding-left: 0;
  margin-right: 0;
  margin-left: 0;
}

.container-fluid {
  padding-right: 0;
  padding-left: 0;
  margin-right: 0;
  margin-left: 0;
}

.col-11 {
  padding-right: 0;
  padding-left: 0;
  margin-right: 0;
  margin-left: 0;
}

.col-1 {
  padding-right: 0;
  padding-left: 0;
  margin-right: 0;
  margin-left: 0;
}
</style>
