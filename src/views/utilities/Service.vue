<template>
  <section class="bg-[#F9FBFC] p-6 rounded-lg shadow-sm max-w-4xl mx-auto space-y-6">
    <h2 class="text-3xl font-bold border-b-4 border-[#159763] pb-2 flex items-center gap-2">
      <CircleHelp class="w-6 h-6 text-[#159763]" /> Layanan Kami
    </h2>

    <div v-for="(item, index) in services" :key="index" class="border-b border-[#E6EAED] pb-4">
      <button
        @click="toggle(index)"
        class="flex justify-between items-center w-full text-left text-xl font-semibold text-black py-2"
      >
        <div class="flex items-center gap-2">
          <component :is="item.icon" class="w-5 h-5 text-[#159763]" />
          {{ item.title }}
        </div>
        <ChevronDown :class="['w-5 h-5 transition-transform', activeIndex === index ? 'rotate-180' : '']" />
      </button>

      <transition name="fade">
        <p v-if="activeIndex === index" class="text-gray-700 pl-7 pr-2 pt-2 leading-relaxed">
          {{ item.description }}
        </p>
      </transition>
    </div>
  </section>
</template>

<script>
import {
  Car,
  SatelliteDish,
  Wrench,
  CircleHelp,
  ChevronDown,
} from 'lucide-vue-next';

export default {
  name: 'ServiceSection',
  components: {
    Car,
    SatelliteDish,
    Wrench,
    CircleHelp,
    ChevronDown,
  },
  data() {
    return {
      activeIndex: null,
      services: [
        {
          title: 'Instant Rent',
          description:
            'Kami menyediakan layanan sewa kendaraan secara instan untuk mobil, minibus, dan pickup melalui situs ini. Setelah pengguna melakukan pendaftaran dan pengajuan sewa, tim admin kami akan melakukan konfirmasi maksimal dalam waktu 30 menit. Proses cepat dan praktis, sesuai dengan kebutuhan Anda kapan pun dan di mana pun.',
          icon: 'Car',
        },
        {
          title: 'Tracking',
          description:
            'Kami menyediakan fitur pelacakan kendaraan secara real-time yang dapat diakses langsung melalui situs ini. Lokasi kendaraan ditampilkan berdasarkan area atau kota terkini. Fitur ini dapat diakses oleh pengguna kapanpun, memastikan keamanan, transparansi, dan kenyamanan selama masa sewa.',
          icon: 'SatelliteDish',
        },
        {
          title: 'Maintenance',
          description:
            'Seluruh kendaraan kami mendapatkan perawatan berkala guna menjaga performa dan kenyamanan selama digunakan. Pemeriksaan meliputi kondisi mesin, oli, ban, dan aspek teknis lainnya. Jika terjadi kerusakan akibat kelalaian pengguna selama masa sewa, tanggung jawab akan dibebankan kepada penyewa sesuai ketentuan yang berlaku.',
          icon: 'Wrench',
        },
      ],
    };
  },
  methods: {
    toggle(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
