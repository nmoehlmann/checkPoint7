<template>
  <div class="modal-content">
    <main class="container">
      <form @submit.prevent="createEvent()">

        <section class="row">
          <div class="col-6 d-flex justify-content-center gap-2 gap-3">
            <label for="name">Event Name:</label>
            <input name="name" type="text" placeholder="Event Name" v-model="editable.name">
          </div>
          <div class="col-6 d-flex justify-content-center gap-3">
            <label for="location">Location:</label>
            <input type="text" name="location" placeholder="Event Location" v-model="editable.location">
          </div>
        </section>
        <section class="row">
          <div class="col-6 d-flex justify-content-center gap-3">
            <label for="startDate">Start Date:</label>
            <input type="text" name="startDate" placeholder="Start Date" v-model="editable.startDate">
          </div>
          <div class="col-6 d-flex justify-content-center gap-3">
            <label for="capacity">Total Capacity:</label>
            <input type="text" name="capacity" placeholder="Capacity" v-model="editable.capacity">
          </div>
        </section>
        <div class="col-12 d-flex justify-content-center gap-3">
          <label for="type">Event Category</label>
          <select name="type" id="type" v-model="editable.type">
            <option value="concert">Concert</option>
            <option value="convention">Convention</option>
            <option value="sport">Sport</option>
            <option value="digital">Digital</option>
          </select>
        </div>
        <div class="col-12 d-flex justify-content-center gap-3">
          <label for="coverImg"></label>
          <input type="text" name="coverImg" placeholder="Cover Image URL" v-model="editable.coverImg">
        </div>
        <div class="col-12 d-flex flex-column">
          <label for="description">Event Description</label>
          <textarea name="description" id="" cols="30" rows="10" v-model="editable.description"
            placeholder="Event Description..."></textarea>
        </div>
        <div class="col-12">
          <div>
            <button type="submit" class="btn btn-primary">
              Create Event
            </button>
          </div>
        </div>

      </form>
    </main>
  </div>
</template>


<script>
import { ref } from "vue";
import { eventsService } from "../services/EventsService.js";
import { Modal } from "bootstrap";
import { router } from "../router.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const editable = ref({})
    return {
      editable,

      async createEvent() {
        try {
          // debugger
          const formData = editable.value
          const newEvent = await eventsService.createEvent(formData)
          Modal.getOrCreateInstance('#createEvent').hide()
          router.push({ name: 'EventDetails', params: { id: newEvent.id } })
        } catch (error) {
          Pop.error(error, 'could not create event')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
div {
  padding-bottom: 1rem;
}
</style>