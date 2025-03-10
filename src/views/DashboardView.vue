<template>
  <div class="flex items-center justify-items-start w-full background-dashboard p-6 md:px-16">
    <div class="bg-white/85 rounded-xl p-6 sm:p-10 sm:w-1/2 space-y-4 md:mx-28">
      <h1 class="text-3xl">Bebas Worry</h1>
      <h1 class="text-5xl font-semibold">Sewa Cepat, Langsung Berangkat</h1>
      <div class="flex items-center space-x-2 sm:space-x-5">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>
          Aman
        </div>
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
          </svg>
          Nyaman
        </div>
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Tepat Waktu
        </div>
      </div>

      <router-link to="/kendaraan"
        class="flex items-center w-fit mt-28 inline-block px-6 py-3 text-lg bg-[#159763] rounded-full shadow-md hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105">
        Learn More
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-4 ml-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </router-link>
    </div>

    <footer class="absolute bottom-5 text-gray-500 text-sm">
      &copy; 2024 Rently. All rights reserved.
    </footer>
  </div>
</template>

<style>
.background-dashboard {
  background: url('/src/assets/image/bg-1.png') no-repeat center center;
  background-size: cover;
  background-attachment: fixed; /* Optional: Keeps the background fixed while scrolling */
  width: 100vw;
  display: flex; /* Ensures content inside can be centered */
  align-items: center;
}
</style>

<script>
export default {
  name: "DashboardView",
};
</script>
