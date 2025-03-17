<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({data: Object});

function snakeToTitleCase(str) {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

const emit = defineEmits(["close"]);
</script>

<template>
  <div v-if="data" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-lg font-bold mb-4">Detail View</h2>
      <table class="w-full border-collapse border border-gray-300">
        <tbody>
          <tr v-for="(label, column) in data" :key="label">
            <td class="border p-2 font-semibold">{{ snakeToTitleCase(column) }}</td>
            <td class="border p-2">
            <template v-if="column === 'gambar_url'">
              <img :src="data[column]" alt="Image" class="max-w-[100px] max-h-[100px]" />
            </template>
            <template v-else>
              {{ data?.[column] }}
            </template>
          </td>
          </tr>
        </tbody>
      </table>
      <button @click="emit('close')" class="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
        Close
      </button>
    </div>
  </div>
</template>
