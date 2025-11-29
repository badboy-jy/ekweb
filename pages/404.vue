<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center bg-white text-center px-4 py-20">
    <p class="text-sm font-semibold text-blue-600 mb-2">404</p>
    <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">页面驶离了既定路线</h1>
    <p class="text-gray-600 mb-8 max-w-md">
      您访问的页面不存在，可以返回首页继续探索智能出行。
    </p>
    <NuxtLink to="/" class="rounded-full bg-blue-600 text-white px-6 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors">
      返回首页
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
</script>

