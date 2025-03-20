<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
    <Card class="w-[600px]">
      <CardContent class="p-6">
        <h2 class="text-xl font-bold mb-4">{{ editData ? 'Edit' : 'Create' }} {{ table }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(config, column) in config?.editable_columns" :key="column">
              <Label class="block text-sm font-medium">{{ snakeToTitleCase(column) }}</Label>
              <Input
                v-if="['text', 'number', 'date', 'decimal'].includes(config.type)"
                v-model="form[column]"
                :type="config.type === 'decimal' ? 'number' : config.type"
                :step="config.type === 'decimal' ? config.step : undefined"
                class="w-full"
              />
              <Select v-else-if="config.type === 'select'" v-model="form[column]" class="w-full">
                <SelectTrigger>
                  <SelectValue :placeholder="`Select ${snakeToTitleCase(column)}`" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="option in config.options" :key="option.value ?? option" :value="option.value ?? option">
                    {{ option.label ?? option }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div class="flex justify-end space-x-2 mt-4">
            <Button variant="outline" @click="$emit('close')">Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import api from "@/plugins/axios";

const props = defineProps(["table", "config", "editData"]);
const emit = defineEmits(["close", "refresh"]);
const form = ref({});

watch(() => props.editData, (newVal) => {
  form.value = newVal ? { ...newVal } : {};
}, { immediate: true });

function snakeToTitleCase(str) {
  return str.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function getFilteredData(formValue, editableColumns) {
  return Object.fromEntries(Object.keys(editableColumns).map(key => [key, formValue[key]]).filter(([, value]) => value !== undefined));
}

function getChangedValues(oldObj, newObj) {
  return Object.fromEntries(Object.entries(newObj).filter(([key, value]) => oldObj[key] !== value));
}

const handleSubmit = async () => {
  try {
    if (props.editData) {
      const editFilteredData = getChangedValues(getFilteredData(props.editData, props.config.editable_columns), getFilteredData(form.value, props.config.editable_columns));
      await api.put(`/admin/${props.table}/${props.editData.id}`, editFilteredData);
    } else {
      await api.post(`/admin/${props.table}`, form.value);
    }
    emit("refresh");
    emit("close");
  } catch (error) {
    alert(`Error: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
  }
};
</script>
