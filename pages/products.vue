<template>
  <div>
    <div class="md:hidden bg-white shadow-sm px-4 py-3 sticky top-16 z-40">
      <button class="flex items-center text-blue-600 font-medium w-full justify-between" @click="isMobileFilterOpen = !isMobileFilterOpen">
        <span>{{ t("productsPage.filter") }}</span>
        <i class="fas fa-chevron-down transition-transform" :class="{ 'rotate-180': isMobileFilterOpen }"></i>
      </button>
      <div v-if="isMobileFilterOpen" class="mt-3 animate-slideDown">
        <FiltersPanel :filters="filters" :meta-data="metaData" :is-meta-loading="isMetaLoading" @reset="resetFilters" @category-change="handleCategoryChange" @option-change="handleCheckboxChange" @price-change="handlePriceChange" @search-change="handleSearchChange" />
      </div>
    </div>
    <main class="flex-1 bg-gray-50">
      <div class="container mx-auto px-4 py-6">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div class="hidden md:block lg:col-span-1">
            <FiltersPanel :filters="filters" :meta-data="metaData" :is-meta-loading="isMetaLoading" @reset="resetFilters" @category-change="handleCategoryChange" @option-change="handleCheckboxChange" @price-change="handlePriceChange" @search-change="handleSearchChange" />
          </div>
          <div class="lg:col-span-3">
            <div class="bg-white rounded-xl shadow-sm p-4 mb-6 flex justify-between items-center">
              <p class="text-gray-600" v-html="t('productsPage.resultsFound', { count: totalCount })"></p>
            </div>
            <div v-if="isLoading">
              <LoadingSkeleton />
            </div>
            <div v-else>
              <div v-if="vehicleList.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                <div v-for="vehicle in vehicleList" :key="vehicle.id" class="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div class="relative h-48 md:h-60 overflow-hidden group">
                    <img :src="vehicle.image" :alt="vehicle.model" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" @error="handleImageError" />
                    <div class="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {{ vehicle.type }}
                    </div>
                  </div>
                  <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                      <div class="flex-1 pr-2">
                        <h3 class="text-lg font-bold text-gray-800 line-clamp-1">{{ vehicle.brand }}</h3>
                        <p class="text-gray-600 text-sm line-clamp-1">{{ vehicle.model }}</p>
                      </div>
                      <div class="text-right whitespace-nowrap">
                        <p class="text-sm text-gray-500 line-through">{{ formatPrice(vehicle.originalPrice) }}</p>
                        <p class="text-xl font-bold text-red-500">{{ formatPrice(vehicle.currentPrice) }}</p>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3 mt-4">
                      <div class="flex items-center">
                        <i class="fas fa-cog text-blue-500 mr-2"></i>
                        <span class="truncate">{{ vehicle.engineModel }}</span>
                      </div>
                      <div class="flex items-center">
                        <i class="fas fa-tachometer-alt text-blue-500 mr-2"></i>
                        <span class="truncate">{{ vehicle.torque }}</span>
                      </div>
                      <div class="flex items-center">
                        <i class="fas fa-leaf text-blue-500 mr-2"></i>
                        <span class="truncate">{{ vehicle.emissionStandard }}</span>
                      </div>
                      <div class="flex items-center">
                        <i class="fas fa-dharmachakra text-blue-500 mr-2"></i>
                        <span class="truncate">{{ vehicle.driveType }}</span>
                      </div>
                    </div>
                    <div class="mt-6 flex gap-3">
                      <button class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium" @click="navigateTo(`/vehicle/${vehicle.id}`)">
                        {{ t("productsPage.viewDetails") }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="bg-white rounded-xl shadow-sm p-10 text-center">
                <div class="text-gray-400 mb-2">暂无数据</div>
                <button class="text-blue-600" @click="resetFilters">重置筛选</button>
              </div>
              <Pagination :current-page="filters.page" :page-size="filters.pageSize" :total="totalCount" @change="handlePageChange" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";

import LoadingSkeleton from "~/components/products/LoadingSkeleton.vue";
import FiltersPanel from "~/components/products/FiltersPanel.vue";
import Pagination from "~/components/products/Pagination.vue";

const API_BASE_URL = "http://114.55.246.208:8082";
const API_LIST_URL = `${API_BASE_URL}/business/website/list`;
const DEFAULT_IMAGE_URL =
  "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Auman%20GTL%208x4%20concrete%20mixer%20truck%2C%20construction%20site%20background&sign=c06d6a3bb6f1e5eb2e1146c0852ca3ad";

type RawVehicle = {
  id: number | null;
  truckType: string;
  truckNo: string;
  brand: string;
  automaker: string;
  vehicleModel: string;
  drive: string;
  engineType: string;
  emission: string;
  torque: string;
  gearboxCategory: string;
  webPrice: string;
  webPriceUnderline: string;
  fileUrl: string | null;
  business: string;
  function: string;
};

type ApiResponse = {
  total: number;
  rows: RawVehicle[];
  code: number;
  msg: string;
};

type Vehicle = {
  id: number;
  brand: string;
  model: string;
  type: string;
  image: string;
  originalPrice: number;
  currentPrice: number;
  engineModel: string;
  torque: string;
  emissionStandard: string;
  controlType: string;
  driveType: string;
};

type FilterMetaData = {
  categories: { id: number; name: string }[];
  driveTypes: string[];
  engineTypes: string[];
  emissionStandards: string[];
};

type FilterOptions = {
  categories: number[];
  priceRange: { min: number; max: number };
  engineType: string[];
  driveType: string[];
  emissionStandard: string[];
  searchQuery: string;
  page: number;
  pageSize: number;
  sort: string;
};

const router = useRouter();
const route = useRoute();
const { t, locale } = useI18n();

const vehicleList = ref<Vehicle[]>([]);
const totalCount = ref(0);
const isLoading = ref(false);
const isMetaLoading = ref(false);
const isMobileFilterOpen = ref(false);

const metaData = reactive<FilterMetaData>({
  categories: [],
  driveTypes: [],
  engineTypes: [],
  emissionStandards: [],
});

const filters = reactive<FilterOptions>({
  categories: [],
  priceRange: { min: 0, max: 2000000 },
  engineType: [],
  driveType: [],
  emissionStandard: [],
  searchQuery: "",
  page: 1,
  pageSize: 10,
  sort: "default",
});

const getFullImageUrl = (url: string | null) => {
  if (!url) return DEFAULT_IMAGE_URL;
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

const cleanString = (str: string) => (str ? str.replace(/\n/g, " ").trim() : "");

const mapRawDataToVehicle = (raw: RawVehicle): Vehicle => ({
  id: raw.id || Math.random(),
  brand: cleanString(raw.brand),
  model: cleanString(raw.vehicleModel),
  type: cleanString(raw.truckType),
  image: getFullImageUrl(raw.fileUrl),
  originalPrice: parseFloat(raw.webPriceUnderline) || 0,
  currentPrice: parseFloat(raw.webPrice) || 0,
  engineModel: cleanString(raw.engineType),
  torque: cleanString(raw.torque),
  emissionStandard: cleanString(raw.emission),
  controlType: cleanString(raw.gearboxCategory),
  driveType: cleanString(raw.drive),
});

const fetchFilterOptions = async () => {
  isMetaLoading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));
    metaData.categories = [
      { id: 1, name: "重商" },
      { id: 2, name: "轻卡" },
      { id: 3, name: "皮卡" },
      { id: 4, name: "VAN" },
      { id: 5, name: "新能源" },
    ];
    metaData.driveTypes = ["4×2", "6×2", "6×4", "8×4"];
    metaData.engineTypes = ["ISD", "X11", "WP", "MC", "dCi"];
    metaData.emissionStandards = ["欧 Ⅳ", "欧 Ⅴ", "欧 Ⅵ"];
  } catch (error) {
    console.error("Failed to fetch options", error);
  } finally {
    isMetaLoading.value = false;
  }
};

fetchFilterOptions();

watch(
  () => route.query.categoryId,
  (val) => {
    const categoryIdParam = Array.isArray(val) ? val[0] : val;
    if (categoryIdParam) {
      const catId = parseInt(categoryIdParam, 10);
      if (!Number.isNaN(catId)) {
        filters.categories = [catId];
        filters.page = 1;
      }
    }
  },
  { immediate: true }
);

let fetchTimer: number | undefined;
const scheduleFetch = () => {
  if (fetchTimer) window.clearTimeout(fetchTimer);
  fetchTimer = window.setTimeout(fetchVehicles, 500);
};

watch(
  () => ({
    categories: [...filters.categories],
    priceRange: { ...filters.priceRange },
    engineType: [...filters.engineType],
    driveType: [...filters.driveType],
    emissionStandard: [...filters.emissionStandard],
    searchQuery: filters.searchQuery,
    page: filters.page,
    pageSize: filters.pageSize,
    sort: filters.sort,
  }),
  scheduleFetch,
  { deep: true }
);

async function fetchVehicles() {
  isLoading.value = true;
  try {
    const params = new URLSearchParams();
    params.append("pageNum", filters.page.toString());
    params.append("pageSize", filters.pageSize.toString());

    if (filters.searchQuery) params.append("brand", filters.searchQuery);

    if (filters.categories.length > 0) {
      const selectedNames = filters.categories
        .map((id) => metaData.categories.find((c) => c.id === id)?.name)
        .filter(Boolean) as string[];
      if (selectedNames.length > 0) params.append("truckType", selectedNames.join(","));
    }

    if (filters.driveType.length > 0) params.append("drive", filters.driveType.join(","));
    if (filters.emissionStandard.length > 0) params.append("emission", filters.emissionStandard.join(","));
    if (filters.engineType.length > 0) params.append("engineType", filters.engineType.join(","));
    if (filters.priceRange.min > 0) params.append("minPrice", filters.priceRange.min.toString());
    if (filters.priceRange.max > 0) params.append("maxPrice", filters.priceRange.max.toString());

    const response = await fetch(`${API_LIST_URL}?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data: ApiResponse = await response.json();

    if (data.code === 200) {
      vehicleList.value = (data.rows || []).map(mapRawDataToVehicle);
      totalCount.value = data.total;
    } else {
      vehicleList.value = [];
      totalCount.value = 0;
    }
  } catch (error) {
    console.error("Network error:", error);
  } finally {
    isLoading.value = false;
  }
}

const handleCategoryChange = (categoryId: number) => {
  const index = filters.categories.indexOf(categoryId);
  if (index >= 0) {
    filters.categories.splice(index, 1);
  } else {
    filters.categories.push(categoryId);
  }
  filters.page = 1;
};

type CheckboxFilterKey = "driveType" | "engineType" | "emissionStandard";

const handleCheckboxChange = (option: string, type: CheckboxFilterKey) => {
  const target = filters[type];
  if (Array.isArray(target)) {
    const idx = target.indexOf(option);
    if (idx >= 0) {
      target.splice(idx, 1);
    } else {
      target.push(option);
    }
    filters.page = 1;
  }
};

const handlePriceChange = (key: "min" | "max", value: number) => {
  filters.priceRange[key] = value;
  filters.page = 1;
};

const handleSearchChange = (value: string) => {
  filters.searchQuery = value;
  filters.page = 1;
};

const resetFilters = () => {
  filters.categories = [];
  filters.priceRange = { min: 0, max: 2000000 };
  filters.engineType = [];
  filters.driveType = [];
  filters.emissionStandard = [];
  filters.searchQuery = "";
  filters.page = 1;
  filters.pageSize = 10;
  filters.sort = "default";
};

const handlePageChange = (newPage: number) => {
  const totalPages = Math.ceil(totalCount.value / filters.pageSize);
  if (newPage >= 1 && newPage <= totalPages) {
    filters.page = newPage;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const formatPrice = (price: number) => {
  if (!price) return "面议";
  const language = locale.value;
  const currency = language.startsWith("zh") ? "CNY" : "USD";
  return new Intl.NumberFormat(language.startsWith("zh") ? "zh-CN" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(currency === "USD" ? price / 7.2 : price);
};

const handleImageError = (event: Event) => {
  (event.target as HTMLImageElement).src = DEFAULT_IMAGE_URL;
};
</script>

