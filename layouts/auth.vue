<template>
  <div class="min-h-screen flex flex-col bg-white">
    <header class="sticky top-0 z-50 bg-white shadow-sm">
      <div class="container mx-auto px-4 h-16 flex items-center">
        <button
          class="text-gray-600 hover:text-blue-600 transition-colors"
          @click="goBack"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          返回
        </button>
        <NuxtLink to="/" class="text-xl font-bold text-blue-600 ml-4">
          ETRUCK
        </NuxtLink>
      </div>
    </header>
    <main class="flex-1 bg-gray-50">
      <slot />
    </main>
    <footer class="bg-gray-900 text-white py-8">
      <div class="container mx-auto px-4 text-center">
        <div class="text-2xl font-bold mb-2">ETRUCK</div>
        <p class="text-gray-400 text-sm">专业商用车出口平台</p>
        <div class="mt-4 text-gray-500 text-xs">
          © 2025 ETRUCK. 保留所有权利.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const goBack = () => {
  if (process.client && window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
};
</script>

