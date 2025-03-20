<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded-lg w-96">
      <h2 class="text-xl font-bold mb-4">{{ editData ? 'Edit' : 'Create' }} {{ table }}</h2>
      <form @submit.prevent="handleSubmit">
        <div v-for="(config, column) in config?.editable_columns" :key="column" class="mb-4">
          <label class="block text-sm font-medium text-gray-700">{{ snakeToTitleCase(column) }}</label>
          <input
            v-if="['text', 'number', 'date', 'decimal'].includes(config.type)"
            v-model="form[column]"
            :type="config.type === 'decimal' ? 'number' : config.type"
            :step="config.type === 'decimal' ? config.step : undefined"
            class="w-full border p-2 rounded"
          />
          <select v-else-if="config.type === 'select'" v-model="form[column]" class="w-full border p-2 rounded">
            <option
              v-for="option in config.options"
              :key="typeof option === 'object' ? option.value : option"
              :value="typeof option === 'object' ? option.value : option">
              {{ typeof option === 'object' ? option.label : option }}
            </option>
          </select>
        </div>
        <div class="flex justify-end space-x-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import api from "@/plugins/axios";

const props = defineProps(["table", "config", "editData"]);
const emit = defineEmits(["close", "refresh"]);
const form = ref({});

console.log(props.editData);

watch(() => props.editData, (newVal) => {
  form.value = newVal ? { ...newVal } : {};
}, { immediate: true });

function snakeToTitleCase(str) {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getFilteredData(formValue, editableColumns) {
  const filteredData = {};
  for (const key in editableColumns) {
    if (formValue.hasOwnProperty(key)) {
      filteredData[key] = formValue[key];
    }
  }
  return filteredData;
}

function getChangedValues(oldObj, newObj) {
  const changes = {};
  for (const key in newObj) {
    if (oldObj.hasOwnProperty(key) && oldObj[key] !== newObj[key]) {
      changes[key] = newObj[key];
    }
  }

  return changes;
}

const handleSubmit = async () => {
  try {
    let response;
    if (props.editData) {
      const editFilteredData = getChangedValues(getFilteredData(props.editData, props.config.editable_columns), getFilteredData(form.value, props.config.editable_columns));
      console.log(editFilteredData);
      response = await api.put(`/admin/${props.table}/${props.editData.id}`, editFilteredData);
    } else {
      response = await api.post(`/admin/${props.table}`, form.value);
    }

    console.log("Success:", response.data);
    emit("refresh");
    emit("close");
  } catch (error) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      alert(`Error: ${JSON.stringify(error.response.data)}`);
    } else {
      console.error("Error:", error.message);
    }
  }
};
</script>
