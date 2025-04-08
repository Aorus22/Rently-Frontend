<template>
  <section class="bg-[#F9FBFC] p-6 sm:p-8 rounded-lg shadow-sm w-full max-w-3xl min-h-[400px] mx-auto mt-[50px] mb-[50px] space-y-6">
    <h2 class="text-3xl font-bold border-b-4 border-[#159763] pb-2 flex items-center gap-2">
      <Building class="w-6 h-6 text-[#159763]" /> Tentang Company
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
  Building,
  Package,
  Truck,
  Handshake,
  ChevronDown,
} from 'lucide-vue-next';

export default {
  name: 'CompanySection',
  components: {
    Building,
    Package,
    Truck,
    Handshake,
    ChevronDown,
  },
  data() {
    return {
      activeIndex: null,
      services: [
        {
          title: 'Tentang Kami',
          description:
            'Kami adalah perusahaan yang bergerak di bidang penyewaan kendaraan dengan komitmen tinggi terhadap pelayanan pelanggan, keamanan, dan kenyamanan. Sejak berdiri, kami terus berinovasi dalam menyediakan solusi mobilitas yang cepat, fleksibel, dan terjangkau bagi masyarakat maupun perusahaan. Kami percaya bahwa transportasi yang efisien adalah fondasi penting bagi kehidupan dan bisnis modern. Dengan dukungan tim profesional dan sistem berbasis teknologi, kami hadir untuk memenuhi kebutuhan mobilitas Anda kapan pun dan di mana pun.',
          icon: 'Building',
        },
        {
          title: 'Layanan',
          description:
            'Layanan kami dirancang untuk memberikan pengalaman sewa kendaraan yang mudah dan terpercaya. Mulai dari sewa harian, mingguan, hingga bulanan, kami menyediakan berbagai jenis kendaraan sesuai kebutuhan pelanggan, baik individu maupun korporat. Kami juga dilengkapi dengan fitur pelacakan real-time, dukungan teknis 24 jam, serta sistem pemesanan online yang praktis. Dengan pendekatan berbasis teknologi dan pelayanan manusiawi, kami terus meningkatkan standar layanan kami setiap harinya.',
          icon: 'Package',
        },
        {
          title: 'Kendaraan',
          description:
            'Armada kendaraan kami terdiri dari berbagai jenis dan tipe, mulai dari kendaraan penumpang, kendaraan niaga ringan, hingga kendaraan operasional perusahaan. Seluruh unit kami dijaga dalam kondisi prima melalui perawatan berkala dan inspeksi kualitas yang ketat. Kami memastikan setiap kendaraan yang kami sewakan bersih, aman, dan siap digunakan. Informasi lengkap mengenai tipe kendaraan, spesifikasi, serta ketersediaan dapat diakses melalui platform kami.',
          icon: 'Truck',
        },
        {
          title: 'Mitra Kami',
          description:
            'Kami percaya bahwa kolaborasi adalah kunci pertumbuhan bersama. Oleh karena itu, kami menjalin kemitraan strategis dengan berbagai pihak, termasuk perusahaan logistik, penyedia teknologi, bengkel resmi, dan institusi keuangan. Dengan dukungan mitra yang kompeten dan terpercaya, kami dapat menghadirkan layanan yang lebih luas, cepat, dan terintegrasi. Kami terbuka terhadap kolaborasi baru yang dapat memberikan nilai tambah bagi pelanggan dan ekosistem kami.',
          icon: 'Handshake',
        },
      ],
    };
  },
  methods: {
    toggle(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
  },
  mounted() {
    const openIndex = Number(this.$route.query.open);
    if (!isNaN(openIndex)) {
      this.activeIndex = openIndex;
    }
  },
  watch: {
    '$route.query.open'(newVal) {
      const index = Number(newVal)
      if (!isNaN(index)) {
        this.activeIndex = index
      }
    }
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
