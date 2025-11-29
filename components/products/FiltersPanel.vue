<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-lg font-bold text-gray-800">{{ t("productsPage.filter") }}</h3>
      <button class="text-blue-600 text-sm hover:text-blue-700" @click="$emit('reset')">
        {{ t("productsPage.reset") }}
      </button>
    </div>
    <div class="mb-6">
      <div class="relative">
        <input
          type="text"
          :placeholder="t('productsPage.searchPlaceholder')"
          :value="filters.searchQuery"
          class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          @input="$emit('search-change', ($event.target as HTMLInputElement).value)"
        />
        <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
      </div>
    </div>
    <div v-if="isMetaLoading" class="animate-pulse h-64 bg-gray-100 rounded"></div>
    <div v-else>
      <div class="mb-6">
        <h4 class="text-base font-semibold text-gray-800 mb-3">{{ t("productsPage.categories") }}</h4>
        <div class="space-y-2">
          <label
            v-for="category in metaData.categories"
            :key="category.id"
            class="flex items-center text-gray-700 cursor-pointer hover:bg-gray-50 p-1 rounded"
          >
            <input
              type="checkbox"
              class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              :checked="filters.categories.includes(category.id)"
              @change="$emit('category-change', category.id)"
            />
            <span class="ml-2 flex-1">{{ t(`categories.${category.name}`) }}</span>
          </label>
        </div>
      </div>
      <div class="mb-6">
        <h4 class="text-base font-semibold text-gray-800 mb-3">{{ t("productsPage.priceRange") }}</h4>
        <div class="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            :value="filters.priceRange.min"
            class="flex-1 px-3 py-2 rounded-lg border border-gray-300 w-full"
            @input="$emit('price-change', 'min', Number(($event.target as HTMLInputElement).value))"
          />
          <span class="flex items-center text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max"
            :value="filters.priceRange.max"
            class="flex-1 px-3 py-2 rounded-lg border border-gray-300 w-full"
            @input="$emit('price-change', 'max', Number(($event.target as HTMLInputElement).value))"
          />
        </div>
      </div>
      <div class="mb-6">
        <h4 class="text-base font-semibold text-gray-800 mb-3">{{ t("productsPage.driveType") }}</h4>
        <div class="space-y-2">
          <label
            v-for="type in metaData.driveTypes"
            :key="type"
            class="flex items-center text-gray-700 cursor-pointer"
          >
            <input
              type="checkbox"
              class="w-4 h-4 text-blue-600 rounded border-gray-300"
              :checked="filters.driveType.includes(type)"
              @change="$emit('option-change', type, 'driveType')"
            />
            <span class="ml-2">{{ type }}</span>
          </label>
        </div>
      </div>
      <div class="mb-6">
        <h4 class="text-base font-semibold text-gray-800 mb-3">{{ t("productsPage.engineType") }}</h4>
        <div class="space-y-2">
          <label
            v-for="type in metaData.engineTypes"
            :key="type"
            class="flex items-center text-gray-700 cursor-pointer"
          >
            <input
              type="checkbox"
              class="w-4 h-4 text-blue-600 rounded border-gray-300"
              :checked="filters.engineType.includes(type)"
              @change="$emit('option-change', type, 'engineType')"
            />
            <span class="ml-2">{{ type }}</span>
          </label>
        </div>
      </div>
      <div class="mb-6">
        <h4 class="text-base font-semibold text-gray-800 mb-3">{{ t("productsPage.emissionStandard") }}</h4>
        <div class="space-y-2">
          <label
            v-for="type in metaData.emissionStandards"
            :key="type"
            class="flex items-center text-gray-700 cursor-pointer"
          >
            <input
              type="checkbox"
              class="w-4 h-4 text-blue-600 rounded border-gray-300"
              :checked="filters.emissionStandard.includes(type)"
              @change="$emit('option-change', type, 'emissionStandard')"
            />
            <span class="ml-2">{{ t(`emissionStandards.${type}`) }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

type FilterMetaData = {
  categories: { id: number; name: string }[];
  driveTypes: string[];
  engineTypes: string[];
  emissionStandards: string[];
};

type Filters = {
  categories: number[];
  priceRange: { min: number; max: number };
  engineType: string[];
  driveType: string[];
  emissionStandard: string[];
  searchQuery: string;
};

defineProps<{
  filters: Filters;
  metaData: FilterMetaData;
  isMetaLoading: boolean;
}>();

defineEmits<{
  reset: [];
  "category-change": [categoryId: number];
  "option-change": [option: string, type: "driveType" | "engineType" | "emissionStandard"];
  "price-change": [key: "min" | "max", value: number];
  "search-change": [value: string];
}>();

const { t } = useI18n();
</script>

