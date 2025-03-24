<!-- GoogleMaps.vue -->
<template>
  <Dialog :open="show" @update:open="$emit('close')">
    <DialogContent class="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Lokasi Pengambilan Kendaraan</DialogTitle>
        <DialogDescription>
          Berikut adalah lokasi garasi kendaraan yang dapat Anda ambil
        </DialogDescription>
      </DialogHeader>

      <div class="mt-4">
        <!-- Container untuk Google Maps -->
        <div class="map-container">
          <iframe
            :src="mapUrl"
            allowfullscreen
            loading="lazy"
            class="map-iframe"
          />
        </div>

        <!-- Tombol untuk membuka Google Maps di tab baru -->
        <Button class="mt-4 w-full" @click="openGoogleMaps">
          Buka di Google Maps
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default {
  components: {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Button,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    latitude: {
      type: [String, Number],
      required: true,
    },
    longitude: {
      type: [String, Number],
      required: true,
    },
    zoom: {
      type: Number,
      default: 15,
    },
    markerColor: {
      type: String,
      default: 'red',
    },
    markerLabel: {
      type: String,
      default: 'A',
    },
  },
  computed: {
    mapUrl() {
      return `https://maps.google.com/maps?q=${this.latitude},${this.longitude}&hl=eng&z=${this.zoom}&output=embed&markers=color:${this.markerColor}|label:${this.markerLabel}|${this.latitude},${this.longitude}`;
    },
  },
  methods: {
    openGoogleMaps() {
      const url = `https://www.google.com/maps?q=${this.latitude},${this.longitude}`;
      window.open(url, '_blank');
    },
  },
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 400px;
  border: 2px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.map-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.mt-4 {
  margin-top: 1rem;
}
</style>