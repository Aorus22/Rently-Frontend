<template>
  <div class="text-2xl font-bold">
    Hello, {{ adminName }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminName: JSON.parse(localStorage.getItem("admin"))?.nama || "Admin"
    };
  }
};
</script>
