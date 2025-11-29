<template>
  <section class="relative w-full bg-gradient-to-b from-gray-100 to-white">
    <div class="relative h-[400px] md:h-[500px] overflow-hidden">
      <div
        v-for="(image, index) in heroImages"
        :key="image"
        class="absolute inset-0 w-full h-full transition-opacity duration-700"
        :style="{ opacity: index === currentImageIndex ? 1 : 0 }"
      >
        <img :src="image" :alt="`ETRUCK commercial vehicles ${index + 1}`" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        <button
          v-for="(_, index) in heroImages"
          :key="`indicator-${index}`"
          class="w-3 h-3 rounded-full transition-colors"
          :class="index === currentImageIndex ? 'bg-white' : 'bg-white/50'"
          @click="currentImageIndex = index"
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>
      <div class="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
        <div>
          <h1 class="text-4xl md:text-6xl font-bold mb-2">ETRUCK</h1>
          <p class="text-xl md:text-2xl font-medium mb-6">{{ t("hero.slogan") }}</p>
          <div class="flex flex-wrap justify-center gap-4">
            <div
              v-for="brand in partnerBrands"
              :key="brand.id"
              class="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-90 rounded-lg flex items-center justify-center"
            >
              <img :src="brand.logo" :alt="brand.name" class="w-12 h-12 md:w-16 md:h-16 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 py-8 -mt-0">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
          v-for="item in translatedKeyData"
          :key="item.id"
          class="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100"
        >
          <div class="w-12 h-12 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <i :class="['fas', item.icon, 'text-xl']"></i>
          </div>
          <h3 class="text-gray-600 text-sm font-medium mb-1">{{ item.label }}</h3>
          <p class="text-2xl font-bold text-blue-600">{{ item.value }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import { heroImages } from "~/mocks/heroImages";
import { keyData, partnerBrands } from "~/mocks/vehicleData";

const { t } = useI18n();

const currentImageIndex = ref(0);
let intervalId: number | undefined;

onMounted(() => {
  intervalId = window.setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % heroImages.length;
  }, 5000);
});

onBeforeUnmount(() => {
  if (intervalId) {
    window.clearInterval(intervalId);
  }
});

const translatedKeyData = computed(() =>
  keyData.map((item) => ({
    ...item,
    label: t(`hero.${item.label}`) || item.label,
  }))
);
</script>

