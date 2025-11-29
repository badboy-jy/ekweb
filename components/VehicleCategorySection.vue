<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">{{ t("categories.title") }}</h2>
        <div class="w-20 h-1 bg-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">
          {{ t("categories.subtitle") }}
        </p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div
          v-for="category in displayCategories"
          :key="category.id"
          class="rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
          :class="category.count > 0 ? 'bg-white hover:shadow-lg' : 'bg-gray-200 cursor-not-allowed opacity-70'"
          @click="handleCategoryClick(category)"
        >
          <div class="p-6 text-center">
            <div
              class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              :class="category.count > 0 ? 'bg-blue-50 text-blue-600' : 'bg-gray-300 text-gray-600'"
            >
              <i :class="['fas', category.icon, 'text-2xl']"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ category.displayName }}</h3>
            <div
              class="inline-flex items-center px-2.5 py-1 rounded-full text-sm"
              :class="category.count > 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-300 text-gray-700'"
            >
              {{ t("categories.available", { count: category.count }) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

type VehicleCategory = {
  id: number;
  name: string;
  count: number;
  icon: string;
};

const vehicleCategoriesConfig: VehicleCategory[] = [
  { id: 1, name: "重商", count: 0, icon: "fa-truck-moving" },
  { id: 2, name: "轻卡", count: 0, icon: "fa-truck" },
  { id: 3, name: "皮卡", count: 0, icon: "fa-truck-pickup" },
  { id: 4, name: "VAN", count: 0, icon: "fa-shuttle-van" },
  { id: 5, name: "新能源", count: 0, icon: "fa-charging-station" },
  { id: 6, name: "其他", count: 0, icon: "fa-ellipsis" },
];

type ApiCountData = {
  truckType: string;
  numType: string;
};

const categories = ref<VehicleCategory[]>(vehicleCategoriesConfig);
const router = useRouter();
const { t } = useI18n();

onMounted(async () => {
  try {
    const response = await fetch("http://114.55.246.208:8082/business/website/listCount");
    if (!response.ok) throw new Error("Network response was not ok");
    const apiData: ApiCountData[] = await response.json();

    const countMap = apiData.reduce<Record<string, number>>((acc, item) => {
      acc[item.truckType] = parseInt(item.numType, 10) || 0;
      return acc;
    }, {});

    categories.value = vehicleCategoriesConfig.map((category) => ({
      ...category,
      count: countMap[category.name] || 0,
    }));
  } catch (error) {
    console.error("Failed to fetch vehicle counts:", error);
  }
});

const displayCategories = computed(() =>
  categories.value.map((category) => ({
    ...category,
    displayName: t(`categories.${category.name}`) || category.name,
  }))
);

const handleCategoryClick = (category: VehicleCategory) => {
  if (category.count === 0) return;
  navigateTo(`/products?categoryId=${category.id}`);
};
</script>

