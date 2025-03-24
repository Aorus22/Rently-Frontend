<!-- src/components/DynamicModal.vue -->
<template>
  <Dialog :open="isOpen" @update:open="handleClose">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="text-lg font-semibold text-gray-900">
          {{ title }}
        </DialogTitle>
        <DialogDescription v-if="description" class="text-sm text-gray-600">
          {{ description }}
        </DialogDescription>
      </DialogHeader>

      <slot name="content" />

      <div class="mt-6 flex justify-end gap-3">
        <Button
          variant="outline"
          class="border-gray-300 text-gray-700 hover:bg-gray-100"
          @click="handleClose"
          :disabled="isLoading"
        >
          {{ cancelText || 'Batal' }}
        </Button>
        <Button
          :variant="confirmVariant || 'default'"
          class="bg-blue-600 hover:bg-blue-700 text-white"
          :class="{ 'bg-red-600 hover:bg-red-700': confirmVariant === 'destructive' }"
          @click="handleConfirm"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="flex items-center">
            <ArrowPathIcon class="w-4 h-4 mr-2 animate-spin" />
            {{ loadingText || 'Memproses...' }}
          </span>
          <span v-else>{{ confirmText || 'Konfirmasi' }}</span>
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script>
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'DynamicModal',
  components: {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    Button,
    ArrowPathIcon
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: 'Konfirmasi'
    },
    cancelText: {
      type: String,
      default: 'Batal'
    },
    loadingText: {
      type: String,
      default: 'Memproses...'
    },
    confirmVariant: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      isLoading: false,
      isOpen: this.show
    }
  },
  watch: {
    show(newVal) {
      this.isOpen = newVal
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    async handleConfirm() {
      this.isLoading = true
      try {
        await this.$emit('confirm')
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>