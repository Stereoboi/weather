<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <p>Are you sure you want to remove this city from workspace?</p>
      <button @click="confirmRemove">Yes</button>
      <button @click="cancelRemove">No</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showModal = ref(false);

const confirmRemove = () => {
  showModal.value = false;
  emit("confirm");
};

const cancelRemove = () => {
  showModal.value = false;
  emit("cancel");
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal button {
  margin: 10px;
}
</style>
