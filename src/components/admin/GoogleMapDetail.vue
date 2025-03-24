<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden max-w-md mx-auto border border-gray">
    <div class="relative">
      <iframe
        :src="mapUrl"
        class="w-full h-64 border-0"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <div class="p-4">
      <button
        @click="openInGoogleMaps"
        class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Open di Maps
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lat: {
      type: Number,
      required: true
    },
    lon: {
      type: Number,
      required: true
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
      return `https://maps.google.com/maps?q=${this.lat},${this.lon}&hl=eng&z=${this.zoom}&output=embed&markers=color:${this.markerColor}|label:${this.markerLabel}|${this.latitude},${this.longitude}`;
    }
  },
  methods: {
    openInGoogleMaps() {
      window.open(`https://www.google.com/maps?q=${this.lat},${this.lon}`, "_blank");
    }
  }
};
</script>
