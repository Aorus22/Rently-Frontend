<template>
  <section class="bg-[#F9FBFC] p-6 sm:p-8 rounded-lg shadow-sm w-full max-w-3xl min-h-[400px] mx-auto mt-[50px] mb-[50px] space-y-6">
    <h2 class="text-3xl font-bold border-b-4 border-[#159763] pb-2 flex items-center gap-2">
      <MessageCircle class="w-6 h-6 text-[#159763]" /> Layanan Kami
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
        <div v-if="activeIndex === index">
          <p class="text-gray-700 pl-7 pr-2 pt-2 leading-relaxed">
            {{ item.description }}
          </p>

          <div v-if="item.qa" class="mt-4 space-y-4 pl-7 pr-2">
            <div v-for="(entry, i) in item.qa" :key="i">
              <p class="font-semibold text-gray-800">{{ entry.question }}</p>
              <p class="text-gray-600">{{ entry.answer }}</p>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </section>
</template>

<script>
import {
  HelpCircle,
  PhoneCall,
  Handshake,
  ScrollText,
  ChevronDown,
  MessageCircle,
} from 'lucide-vue-next';

export default {
  name: 'SupportSections',
  components: {
    HelpCircle,
    PhoneCall,
    Handshake,
    ScrollText,
    MessageCircle,
    ChevronDown,
  },
  data() {
    return {
      activeIndex: null,
      services: [
        {
          title: 'FAQ (Pertanyaan yang Sering Diajukan)',
          description: 'Berikut beberapa pertanyaan umum yang sering diajukan pelanggan kami.',
          icon: 'HelpCircle',
          qa: [
            {
              question: 'Apa saja syarat untuk menyewa kendaraan?',
              answer: 'Untuk menyewa kendaraan, Anda cukup mendaftar kemudian menyewa di platform secara langsung. Tidak perlu ribet'
            },
            {
              question: 'Apakah saya bisa memesan kendaraan secara online?',
              answer: 'Ya, kami menyediakan sistem pemesanan online yang mudah digunakan. Anda dapat memilih kendaraan, menentukan waktu sewa, dan melakukan pembayaran langsung melalui platform kami.'
            },
            {
              question: 'Apakah tersedia layanan pengantaran kendaraan ke lokasi saya?',
              answer: 'Mohon maaf, untuk layanan pengantaran kendaraan ke lokasi masih tidak memungkinkan, anda harus datang ke lokasi yang tertera ketika pengambilan kendaraan'
            },
            {
              question: 'Apa yang harus dilakukan jika kendaraan mengalami kerusakan di tengah jalan?',
              answer: 'Jika terjadi kerusakan, Anda dapat langsung menghubungi call center kami. Tim teknis kami akan segera merespons dan memberikan bantuan, baik melalui perbaikan di tempat atau penggantian unit kendaraan.'
            },
            {
              question: 'Bagaimana kebijakan pembatalan sewa kendaraan?',
              answer: 'Pembatalan dapat dilakukan maksimal 24 jam sebelum waktu sewa dimulai tanpa dikenakan biaya. Jika pembatalan dilakukan kurang dari 24 jam, maka akan dikenakan biaya pembatalan sesuai ketentuan yang berlaku.'
            }
          ]
        },
        {
          title: 'Call Center',
          description:
            'Tim layanan pelanggan kami siap membantu Anda 24 jam sehari, 7 hari seminggu. Anda dapat menghubungi call center kami untuk mendapatkan bantuan langsung, menyampaikan keluhan, maupun melakukan konsultasi seputar layanan dan kendaraan. Kami berkomitmen untuk memberikan tanggapan yang cepat, ramah, dan solutif dalam setiap interaksi.',
          icon: 'PhoneCall',
        },
        {
          title: 'Bermitra dengan Kami',
          description:
            'Kami membuka peluang kerja sama dengan berbagai pihak, baik individu, institusi, maupun perusahaan yang ingin berkontribusi dalam industri mobilitas. Jika Anda tertarik menjadi mitra kami dalam bentuk kolaborasi layanan, penyediaan armada, atau dukungan teknologi, silakan hubungi kami melalui email resmi di:',
          icon: 'Handshake',
          qa: [
            {
              "question": "partnership@rently.com",
              "answer": ""
            },
            {
              "question": "",
              "answer": "Bersama kita bisa menciptakan ekosistem transportasi yang lebih baik dan berkelanjutan."
            }
          ],
        },
        {
          title: 'Syarat dan Ketentuan',
          description:
            'Syarat dan ketentuan kami menjelaskan secara detail mengenai hak dan kewajiban pengguna dalam menggunakan layanan yang kami sediakan. Dokumen ini mencakup ketentuan penggunaan, kebijakan privasi, tanggung jawab pengguna, serta mekanisme penyelesaian sengketa. Kami menyarankan untuk membaca dengan seksama sebelum menggunakan layanan, guna memastikan pengalaman yang aman dan nyaman bagi semua pihak.',
          icon: 'ScrollText',
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
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
