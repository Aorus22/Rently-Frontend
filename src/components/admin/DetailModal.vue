<script setup>
import { defineProps, defineEmits, watch } from "vue";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const props = defineProps({ data: Object, config: Object });
const emit = defineEmits(["close"]);

function snakeToTitleCase(str) {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Membersihkan data saat modal ditutup
const closeModal = () => {
  emit("close");
};

// Reset data ketika modal ditutup
watch(() => props.data, (newData) => {
  if (!newData) {
    closeModal();
  }
});
</script>

<template>
  <div v-if="data" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <Card class="w-[500px] max-w-full">
      <CardContent class="p-6">
        <h2 class="text-lg font-bold mb-4">Detail View</h2>
        <div class="overflow-auto max-h-[400px]">
          <table class="w-full border-collapse border border-gray-300 text-sm">
            <tbody>
              <tr v-for="(label, column) in data" :key="column">
                <td class="border p-2 font-semibold text-gray-700 w-1/3">{{ snakeToTitleCase(column) }}</td>
                <td class="border p-2 text-gray-600 break-words">
                  <template v-if="config?.special_view?.[column] === 'image'">
                    <img :src="data[column]" alt="Image" class="max-w-[150px] max-h-[150px] rounded-lg" />
                  </template>
                  <template v-else-if="config.special_view?.[column] === 'url'">
                    <a :href="data[column]" target="_blank">
                      <Button variant="link">View</Button>
                    </a>
                  </template>
                  <template v-else>
                    <div>
                      {{ data?.[column] }}
                    </div>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Button @click="closeModal" class="mt-4 w-full">Close</Button>
      </CardContent>
    </Card>
  </div>
</template>
