<template>
  <footer class="bg-[#E6EAED] w-full">
    <div class="flex justify-center px-6 py-24 md:px-16">
      <div class="w-5/6 grid grid-cols-1 lg:grid-cols-6 gap-20 md:gap-40">
        <div class="space-y-10 lg:col-span-2">
          <router-link to="/" class="text-3xl font-bold iceland-regular text-[#159763]">RENTLY</router-link>
          <p class="text-sm text-[#A6A6A6] text-justify">Kami adalah layanan rental kendaraan terkemuka yang memiliki banyak mitra di setiap wilayah untuk terhubung dengan Anda dan membantu perjalanan Anda, baik untuk pertemuan, acara, liburan, maupun perjalanan jauh.</p>
          <div class="flex space-x-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" class="border border-[#159763] w-fit p-1 text-[#159763] hover:bg-[#159763] hover:text-white duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="size-5">
                    <Facebook/>
                </svg>
              </a>

              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" class="border border-[#159763] w-fit p-1 text-[#159763] hover:bg-[#159763] hover:text-white duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="size-5">
                    <Instagram/>
                </svg>
              </a>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" class="border border-[#159763] w-fit p-1 text-[#159763] hover:bg-[#159763] hover:text-white duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="size-5">
                    <Twitter/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" class="border border-[#159763] w-fit p-1 text-[#159763] hover:bg-[#159763] hover:text-white duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="size-5">
                    <Linkedin/>
                </svg>
              </a>
          </div>
        </div>
        <div class="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="mb-8">
            <h1 class="text-xl font-bold text-[#737373] mb-8">Company</h1>
            <ul class="list-none space-y-3">
              <li><router-link :to="{path: '/company', query: { open: 0}}" class="text-sm text-[#A6A6A6] hover:text-[#159763]">About Us</router-link></li>
              <li><router-link :to="{path: '/company', query: { open: 1}}" class="text-sm text-[#A6A6A6] hover:text-[#159763]">Services</router-link></li>
              <li><router-link :to="{path: '/company', query: { open: 2}}" class="text-sm text-[#A6A6A6] hover:text-[#159763]">Vehicle</router-link></li>
              <li><router-link :to="{path: '/company', query: { open: 3}}" class="text-sm text-[#A6A6A6] hover:text-[#159763]">Our Partner</router-link></li>
            </ul>
          </div>

          <div class="mb-8">
            <h1 class="text-xl font-bold text-[#737373] mb-8">Services</h1>
            <ul class="list-none space-y-3">
              <li><router-link :to="{path: '/service', query: { open: 0}}" class="text-sm text-[#A6A6A6] hover:text-[#159763]">Instant Rent</router-link></li>
              <li><router-link :to="{path: '/service', query: { open: 1}}" class="text-sm text-[#A6A6A6] hover:text-[#159763]">Private Driver</router-link></li>
              <li><router-link :to="{path: '/service', query: { open: 2}}" class="text-sm text-[#A6A6A6] hover:text-[#159763]">Long Trip</router-link></li>
            </ul>
          </div>

          <div>
            <h1 class="text-xl font-bold text-[#737373] mb-8">Support</h1>
            <ul class="list-none space-y-3">
              <li><router-link :to="{path: '/support', query: { open: 0}}" class="text-sm text-[#A6A6A6] hover:text-[#159763]">FAQ</router-link></li>
              <li><router-link :to="{path: '/support', query: { open: 1}}" class="text-sm text-[#A6A6A6] hover:text-[#159763]">Call Center</router-link></li>
              <li><router-link :to="{path: '/support', query: { open: 2}}" class="text-sm text-[#A6A6A6] hover:text-[#159763]">Partner With Us</router-link></li>
              <li><router-link :to="{path: '/support', query: { open: 3}}"class="text-sm text-[#A6A6A6] hover:text-[#159763]">Terms & Condition</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from 'lucide-vue-next';

export default {
  name: 'ServiceSection',
  components: {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
  }
}
</script>
