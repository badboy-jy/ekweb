<template>
  <div class="min-h-screen flex flex-col bg-white">
    <header class="sticky top-0 z-50 bg-white shadow-sm">
      <div class="container mx-auto px-4 h-16 flex items-center">
        <button
          class="text-gray-600 hover:text-blue-600 transition-colors"
          aria-label="返回上一页"
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
    <Footer />
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const goBack = () => {
  if (process.client && window.history.length > 1) {
    router.back();
  } else {
    router.push("/ekweb");
  }
};
</script>

