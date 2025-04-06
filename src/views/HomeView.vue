<template>
  <div class="bg-[#E6EAED] w-full">
    <div class="flex flex-col items-center py-36">
      <h1 class="text-4xl font-bold text-center mb-8">Jelajahi Berdasarkan Tipe</h1>
      <div class="w-4/5 lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-2">
        <a href="/kendaraan?category=Mobil" class="bg-white flex flex-col items-center justify-center gap-2 py-6 rounded-xl shadow-md hover:bg-[#159763] hover:text-white duration-300">
          <div class="bg-[#F9FBFC] p-3 rounded-full inline-flex mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="#000000" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </svg>
          </div>
          <p class="font-medium">Mobil</p>
        </a>
        <a href="/kendaraan?category=Minibus" class="bg-white flex flex-col items-center justify-center gap-2 py-6 rounded-xl shadow-md hover:bg-[#159763] hover:text-white duration-300">
          <div class="bg-[#F9FBFC] p-3 rounded-full inline-flex mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="#000000" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </svg>
          </div>
          <p class="font-medium">Minibus</p>
        </a>
        <a href="/kendaraan?category=Pickup" class="bg-white flex flex-col items-center justify-center gap-2 py-6 rounded-xl shadow-md hover:bg-[#159763] hover:text-white duration-300">
          <div class="bg-[#F9FBFC] p-3 rounded-full inline-flex mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="#000000" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </svg>
          </div>
          <p class="font-medium">Pickup</p>
        </a>
      </div>
    </div>

    <div class="bg-[#F9FBFC] py-16 flex justify-center">
      <div class="bg-card-home w-5/6 px-6 py-14 md:px-16 text-center">
        <h2 class="font-semibold text-[#159763] mb-6">SERVICES</h2>
        <h1 class="text-3xl font-semibold text-[#737373] mb-8">Our Services</h1>
        <p class="text-xs sm:text-lg text-[#A6A6A6] mb-10">Layanan kami tidak hanya menyewakan berbagai jenis kendaraan
          seperti mobil, motor, bus, dan truk, tetapi juga
          dilengkapi dengan fitur pelacakan serta perawatan kendaraan untuk memastikan perjalanan Anda lebih aman dan
          nyaman</p>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 text-white">
          <div class="bg-card-rent flex flex-col items-center p-14">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
              stroke="currentColor" class="size-[100px] mb-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
            </svg>
            <h3 class="text-2xl font-semibold mb-6">Instant Rent</h3>
            <p class="text-sm text-justify mb-12">Kami siap menyediakan layanan sewa langsung di mana pun dan kapan pun
              Anda membutuhkan, dengan petugas siap merespons dengan cepat</p>
            <router-link to="/Service" class="text-black bg-white py-4 px-8 hover:text-white hover:bg-green-700 transition-all duration-300">Baca lebih lanjut</router-link>
          </div>
          <div class="bg-card-track flex flex-col items-center p-14">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
              stroke="currentColor" class="size-[100px] mb-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <h3 class="text-2xl font-semibold mb-6">Tracking</h3>
            <p class="text-sm text-justify mb-12">Kami menyediakan fitur pelacakan kendaraan real-time dengan pemantauan
              akurat dan respons cepat untuk keamanan serta kenyamanan Anda.</p>
            <router-link to="/Service"
              class="text-black bg-white py-4 px-8 hover:text-white hover:bg-green-700 transition-all duration-300">Baca lebih lanjut</router-link>
          </div>
          <div class="bg-card-maintenance flex flex-col items-center p-14">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
              stroke="currentColor" class="size-[100px] mb-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            <h3 class="text-2xl font-semibold mb-6">Maintenance</h3>
            <p class="text-sm text-justify mb-12">Kami menyediakan perawatan berkala untuk menjaga kendaraan tetap
              prima, dengan pemantauan akurat dan respons cepat demi keamanan serta kenyamanan Anda.</p>
            <router-link to="/Service"
              class="text-black bg-white py-4 px-8 hover:text-white hover:bg-green-700 transition-all duration-300">Baca lebih lanjut</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center px-6 py-24 md:px-16 text-center">
      <div class="w-5/6">
        <h2 class="font-semibold text-[#159763] mb-6">KEUNTUNGAN</h2>
        <h1 class="text-3xl font-semibold text-[#737373] mb-8">Why Choose Us?</h1>
        <p class="text-xs sm:text-lg text-[#A6A6A6] mb-10">Kami menawarkan banyak jaminan dan keuntungan saat Anda
          menyewa mobil dengan kami untuk perjalanan Anda. Berikut adalah beberapa keuntungan yang akan Anda dapatkan.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          <div class="grid grid-flow-col grid-rows-3 gap-2">
            <div class="row-span-3 flex items-center justify-center px-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="#159763" class="size-12">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </div>
            <div class="col-span-2 flex items-center text-xl sm:text-2xl font-semibold text-[#737373]">
              Easy Rent</div>
            <div class="col-span-2 row-span-2 text-xs text-justify text-[#A6A6A6]">Sewa
              kendaraan di rental kami dengan proses yang mudah dan cepat tanpa mengganggu produktivitas Anda.</div>
          </div>
          <div class="grid grid-flow-col grid-rows-3 gap-2">
            <div class="row-span-3 flex items-center justify-center px-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="#159763" class="size-12">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
            </div>
            <div class="col-span-2 flex items-center text-xl sm:text-2xl font-semibold text-[#737373]">Premium Quality
            </div>
            <div class="col-span-2 row-span-2 flex text-xs text-justify text-[#A6A6A6]">Kendaraan kami selalu dirawat
              dengan baik, baik dari segi kesehatan mesin maupun kebersihannya, untuk memberikan pengalaman berkendara
              yang lebih nyaman.</div>
          </div>
          <div class="grid grid-flow-col grid-rows-3 gap-2">
            <div class="row-span-3 flex items-center justify-center px-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="#159763" class="size-12">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
            </div>
            <div class="col-span-2 flex items-center text-xl sm:text-2xl font-semibold text-[#737373]">Professional
              Agent</div>
            <div class="col-span-2 row-span-2 text-xs text-justify text-[#A6A6A6]">Anda dapat meminta pendamping
              perjalanan untuk menemani dan membimbing perjalanan Anda.</div>
          </div>
          <div class="grid grid-flow-col grid-rows-3 gap-2">
            <div class="row-span-3 flex items-center justify-center px-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="#159763" class="size-12">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
              </svg>
            </div>
            <div class="col-span-2 flex items-center text-xl sm:text-2xl font-semibold text-[#737373]">Car Safety</div>
            <div class="col-span-2 row-span-2 text-xs text-justify text-[#A6A6A6]">Kami menjamin keamanan mesin mobil
              agar selalu berjalan dengan baik melalui pemeriksaan rutin pada mesin mobil.</div>
          </div>
          <div class="grid grid-flow-col grid-rows-3 gap-2">
            <div class="row-span-3 flex items-center justify-center px-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="#159763" class="size-12">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z" />
              </svg>
            </div>
            <div class="col-span-2 flex items-center text-xl sm:text-2xl font-semibold text-[#737373]">Refund</div>
            <div class="col-span-2 row-span-2 text-xs text-justify text-[#A6A6A6]">Jaminan layanan kami memberikan
              kesempatan pengembalian uang jika mobil tidak sesuai dengan informasi yang diberikan.</div>
          </div>
          <div class="grid grid-flow-col grid-rows-3 gap-2">
            <div class="row-span-3 flex items-center justify-center px-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="#159763" class="size-12">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
              </svg>
            </div>
            <div class="col-span-2 flex items-center text-xl sm:text-2xl font-semibold text-[#737373]">Live Monitoring
            </div>
            <div class="col-span-2 row-span-2 text-xs text-justify text-[#A6A6A6]">Layanan kami menyediakan pemantauan
              pelanggan secara langsung untuk memantau perjalanan dalam hal keamanan dan kenyamanan.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center px-6 py-24 md:px-16">
      <div class="w-5/6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 class="font-semibold text-[#159763] mb-6">HUBUNGI KAMI</h2>
            <h1 class="text-3xl font-semibold text-[#737373] mb-8">Contact Us</h1>
            <p class="text-xs sm:text-lg text-[#A6A6A6] mb-10">Jika Anda membutuhkan konsultasi dengan kami, Anda dapat
              menulis pesan atau menelepon kami, kami akan merespons secepat mungkin.</p>

            <div class="space-y-4 mb-16">
              <div class="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="#159763" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <p class="text-sm text-[#808080]">budi@rently.com</p>
              </div>

              <div class="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="#159763" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <p class="text-sm text-[#808080]">0812-3456-789</p>
              </div>

              <div class="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="#159763" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p class="text-sm text-[#808080]">Everyday : 08.00-21.00</p>
              </div>

              <div class="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="#159763" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <p class="text-sm text-[#808080]">Jl. Dr Sutomo, Karimunjawa, Kabupaten Jepara, Jawa Tengah</p>
              </div>
            </div>

            <div class="flex space-x-4">
              <div
                class="border border-[#159763] w-fit p-1 text-[#159763] hover:bg-[#159763] hover:text-white duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="size-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                </svg>
              </div>

              <div
                class="border border-[#159763] w-fit p-1 text-[#159763] hover:bg-[#159763] hover:text-white duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="size-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                </svg>
              </div>

              <div
                class="border border-[#159763] w-fit p-1 text-[#159763] hover:bg-[#159763] hover:text-white duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="size-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                </svg>
              </div>

              <div
                class="border border-[#159763] w-fit p-1 text-[#159763] hover:bg-[#159763] hover:text-white duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="size-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.148040599699!2d110.85002361045927!3d-7.558832742423546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a14234667a3fd%3A0xbda63b32997616ad!2sUniversitas%20Sebelas%20Maret%20(UNS)!5e0!3m2!1sid!2sid!4v1742184558849!5m2!1sid!2sid"
              class="mb-10 sm:mb-16" width="100%" height="350" style="border:0;" allowfullscreen="true" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>

            <a href="" class="text-sm border border-[#159763] bg-[#159763] text-white w-fit px-3 py-2 hover:bg-[#0d6341] duration-300">Peta Kantor</a>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-[#F9FBFC] flex justify-center px-6 py-20 md:px-16">
      <div class="w-5/6">
        <h1 class="text-3xl font-semibold text-[#737373] text-center mb-4">Tertarik untuk bekerja sama dengan kami?</h1>
        <p class="text-xs md:text-base text-[#A6A6A6] text-center mb-10">Kami selalu terbuka untuk kolaborasi dengan individu, komunitas, atau perusahaan yang ingin menciptakan solusi bersama.</p>
        <div class="flex justify-center space-x-2">
          <router-link to="/support" type="submit" class="bg-[#159763] px-4 py-3 text-sm text-white hover:bg-[#0d6341] duration-300">Baca lebih lanjut</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Background untuk masing-masing kartu */
.bg-card-home,
.bg-card-rent,
.bg-card-track,
.bg-card-maintenance {
  background-size: cover;
  /* Menutupi elemen sepenuhnya */
  background-position: center;
  /* Posisikan gambar di tengah */
  background-repeat: no-repeat;
  /* Mencegah pengulangan */
  min-height: 100%;
  /* Pastikan elemen memiliki tinggi penuh */
}


.bg-card-home {
  background-image: url('/src/assets/image/home-1.png');
}

.bg-card-rent {
  background-image: url('/src/assets/image/home-rent.png');
}

.bg-card-track {
  background-image: url('/src/assets/image/home-track.png');
}

.bg-card-maintenance {
  background-image: url('/src/assets/image/home-maintenance.png');
}
</style>
