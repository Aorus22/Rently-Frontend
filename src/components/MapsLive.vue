<template>
  <Dialog :open="show" @update:open="$emit('close')">
    <DialogContent class="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Live Tracking Kendaraan</DialogTitle>
        <DialogDescription>
          <div v-if="error" class="block text-sm text-red-500">
            {{ error }}
          </div>
          <div v-if="status === 'last-seen' && timestamp" class="block mt-1 text-xs text-gray-500">
            <span class="block text-lg text-red-500">
              Koneksi GPS terputus
            </span>
            <span class="block text-sm text-gray-500">
              Terakhir terlihat pada: {{ timestamp.toLocaleString('id-ID') }}
            </span>
          </div>
          <div v-else-if="status === 'live'" >
            Lokasi kendaraan saat ini diperbarui secara real-time
          </div>
          <div v-else-if="status === 'no-data'" >
            Tidak ada data lokasi kendaraan
          </div>
        </DialogDescription>
      </DialogHeader>

      <div class="mt-4 map-container">
        <div v-if="error" class="flex items-center justify-center h-[400px] border-2 border-red-200 bg-red-50 rounded-md">
          <div class="text-center p-6">
            <div class="text-red-500 font-semibold text-lg mb-2">{{ error }}</div>
            <div class="text-gray-600">ID Kendaraan: {{ vehicleId }}</div>
          </div>
        </div>

        <div v-else id="live-map" class="map-iframe"></div>

        <div class="mt-2 flex justify-between text-sm">
          <div v-if="!error">
            <span class="font-semibold">Lat:</span> {{ latitude.toFixed(6) }},
            <span class="font-semibold">Long:</span> {{ longitude.toFixed(6) }}
          </div>
        </div>

        <div v-if="!error && address" class="mt-1 text-sm text-gray-600">
          <span class="font-semibold">Alamat:</span> {{ address }}
        </div>

        <div class="mt-4 flex justify-end">
          <button
              @click="openGoogleMaps"
              class="text-blue-600 hover:underline"
              :disabled="error"
              :class="{ 'opacity-50 cursor-not-allowed': error }"
            >
              Buka di Google Maps
          </button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon,
  iconUrl: icon,
  shadowUrl: iconShadow
});

export default {
  props: {
    show: Boolean,
    vehicleId: {
      type: Number,
      required: true,
    },
  },
  components: {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  },
  data() {
    return {
      latitude: 0,
      longitude: 0,
      timestamp: null,
      eventSource: null,
      status: "no-data",
      map: null,
      marker: null,
      error: null,
      address: '',
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.error = null;
        this.$nextTick(() => {
          this.initMap();
          this.connectSSE();
        });
      } else {
        this.eventSource?.close();
      }
    }
  },
  methods: {
    initMap() {
      if (this.map) {
        this.map.remove();
      }

      this.map = L.map('live-map').setView([this.latitude, this.longitude], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.marker = L.marker([this.latitude, this.longitude])
        .addTo(this.map)
        .bindPopup('Kendaraan ID: ' + this.vehicleId);
    },
    updateMarkerPosition() {
      if (this.map && this.marker) {
        const newLatLng = L.latLng(this.latitude, this.longitude);
        this.marker.setLatLng(newLatLng);
        this.map.setView(newLatLng, this.map.getZoom());

        if (this.marker.isPopupOpen()) {
          this.marker.setPopupContent(
            'Kendaraan ID: ' + this.vehicleId +
            '<br>Lat: ' + this.latitude.toFixed(6) +
            '<br>Long: ' + this.longitude.toFixed(6) +
            (this.address ? '<br>Alamat: ' + this.address : '')
          );
        }

        this.fetchAddress();
      }
    },
    async connectSSE() {
      const host = import.meta.env.VITE_API_GPS_HOSTNAME;
      const Url = `${host}/track/${this.vehicleId}`;

      this.eventSource = new EventSource(Url);

      this.eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.latitude = data.latitude;
          this.longitude = data.longitude;
          this.timestamp = new Date(data.timestamp * 1000);
          this.status = "live";
          this.updateMarkerPosition();
        } catch (error) {
          this.error = "Gagal mengambil posisi kendaraan terakhir";
        }
      };

      this.eventSource.onerror = async () => {
        this.eventSource.close();
        this.eventSource = null;

        try {
          const response = await fetch(Url);
          if (response.ok || response.status === 206) {
            const data = await response.json();
            this.latitude = data.latitude;
            this.longitude = data.longitude;
            this.timestamp = new Date(data.timestamp * 1000);
            this.status = "last-seen";
            this.updateMarkerPosition();
          } else {
            this.status = "no-data";
            this.error = 'Gagal mengambil posisi kendaraan terakhir';
          }
        } catch (err) {
          this.status = "no-data";
          this.error = 'Gagal mengambil posisi kendaraan terakhir';
        }
      };
    },
    openGoogleMaps() {
      if (this.error) return;

      const url = `https://www.google.com/maps?q=${this.latitude},${this.longitude}`;
      window.open(url, '_blank');
    },
    fetchAddress() {
      if (this.error) return;

      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.latitude}&lon=${this.longitude}`;

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Gagal mendapatkan data alamat');
          }
          return response.json();
        })
        .then(data => {
          if (data.display_name) {
            this.address = data.display_name;

            if (this.marker && this.marker.isPopupOpen()) {
              this.updatePopupContent();
            }
          }
        })
        .catch(error => {
          this.address = 'Alamat tidak tersedia';
        });
    },
  },
  beforeUnmount() {
    if (this.eventSource) {
      this.eventSource.close();
    }
    if (this.map) {
      this.map.remove();
    }
  }
}
</script>

<style scoped>
.map-container {
  width: 100%;
  border-radius: 0.375rem;
  overflow: hidden;
}
.map-iframe {
  width: 100%;
  height: 400px;
  border: 2px solid #e2e8f0;
  border-radius: 0.375rem;
}
</style>
