<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">{{ t("business.title") }}</h2>
        <div class="w-20 h-1 bg-blue-600 mx-auto"></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="capability in translatedCapabilities"
          :key="capability.id"
          class="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
        >
          <div class="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6">
            <i :class="['fas', capability.icon, 'text-2xl']"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">{{ capability.title }}</h3>
          <p class="text-gray-600">{{ capability.description }}</p>
        </div>
      </div>
      <div class="mt-20 bg-blue-600 rounded-2xl overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="p-8 md:p-12 flex flex-col justify-center">
            <h3 class="text-2xl font-bold text-white mb-4">{{ t("business.brandFocus") }}</h3>
            <p class="text-blue-100 mb-6">
              {{ t("business.brandDesc") }}
            </p>
            <ul class="space-y-3">
              <li class="flex items-center text-blue-100">
                <i class="fas fa-check-circle mr-2 text-green-300"></i>
                {{ t("business.advantage1") }}
              </li>
              <li class="flex items-center text-blue-100">
                <i class="fas fa-check-circle mr-2 text-green-300"></i>
                {{ t("business.advantage2") }}
              </li>
              <li class="flex items-center text-blue-100">
                <i class="fas fa-check-circle mr-2 text-green-300"></i>
                {{ t("business.advantage3") }}
              </li>
              <li class="flex items-center text-blue-100">
                <i class="fas fa-check-circle mr-2 text-green-300"></i>
                {{ t("business.advantage4") }}
              </li>
            </ul>
          </div>
          <div class="hidden md:block relative">
            <img
              src="https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_16_9&prompt=International%20commercial%20truck%20trade%2C%20container%20terminal%2C%20loading%20trucks%20onto%20ship%2C%20global%20logistics&sign=0cfd628dbef2750ef34449a82590d5e2"
              alt="商用车出口服务"
              class="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { businessCapabilities } from "~/mocks/vehicleData";

const { t } = useI18n();

const translatedCapabilities = computed(() =>
  businessCapabilities.map((capability) => ({
    ...capability,
    title: t(`business.${capability.title}`) || capability.title,
    description: t(`business.${capability.title}Desc`) || capability.description,
  }))
);
</script>

