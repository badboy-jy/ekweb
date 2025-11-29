<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <h2 class="text-3xl font-bold text-gray-800 mb-2">{{ t("products.popular") }}</h2>
          <p class="text-gray-600">
            {{ t("products.updated", { date: formattedDate }) }}
          </p>
        </div>
        <button
          class="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          @click="navigateTo('/products')"
        >
          {{ t("products.viewAll") }}
          <i class="fas fa-chevron-right ml-2 text-sm"></i>
        </button>
      </div>
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="index in 6" :key="index" class="animate-pulse">
          <div class="bg-gray-200 rounded-2xl h-96" />
        </div>
      </div>
      <div v-else-if="error" class="py-20 text-center">
        <p class="text-xl text-red-600 mb-6">{{ error }}</p>
        <button class="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700" @click="fetchVehicles">
          重新加载
        </button>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="vehicle in vehicles"
          :key="vehicle.id"
          class="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <div class="relative h-48 md:h-60 overflow-hidden">
            <img :src="vehicle.coverImage" :alt="`${vehicle.function} ${vehicle.business}`" class="w-full h-full object-cover" />
            <div class="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
              {{ vehicle.function || vehicle.business }}
            </div>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-xl font-bold text-gray-800">{{ vehicle.brand }}</h3>
                <p class="text-gray-600">{{ vehicle.engineType }} {{ vehicle.drive }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-500 line-through">{{ formatPrice(vehicle.originalPrice) }}</p>
                <p class="text-xl font-bold text-red-500">{{ formatPrice(vehicle.currentPrice) }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-4">
              <div class="flex items-center">
                <i class="fas fa-cog text-blue-500 mr-2"></i>
                <span class="text-sm text-gray-600">{{ vehicle.engineType }}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-tachometer-alt text-blue-500 mr-2"></i>
                <span class="text-sm text-gray-600">{{ vehicle.torque }}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-leaf text-blue-500 mr-2"></i>
                <span class="text-sm text-gray-600">{{ vehicle.emission }}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-grip text-blue-500 mr-2"></i>
                <span class="text-sm text-gray-600">{{ vehicle.gearboxCategory }}</span>
              </div>
            </div>
            <div class="mt-6 flex gap-3">
              <button
                class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                @click="navigateTo(`/vehicle/${vehicle.id}`)"
              >
                {{ t("products.details") }}
              </button>
              <button class="w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                <i class="far fa-heart text-gray-600"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import { onMounted, ref } from "vue";

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

type Vehicle = Omit<RawVehicle, "id" | "automaker" | "vehicleModel" | "webPrice" | "webPriceUnderline" | "fileUrl"> & {
  id: number;
  displayMaker: string;
  displayModel: string;
  currentPrice: number;
  originalPrice: number;
  coverImage: string;
};

type ApiResponse = {
  total: number;
  rows: RawVehicle[];
  code: number;
  msg: string;
};

const vehicles = ref<Vehicle[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const { t } = useI18n();

const formattedDate = format(new Date(), "yyyy年MM月dd日");

const formatPrice = (price: number) => {
  if (!price || price <= 0) return "暂无报价";
  const locale = navigator.language || "zh-CN";
  const isZh = locale.startsWith("zh");
  const rate = 7.15;
  const displayPrice = isZh ? price : Math.round(price / rate);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: isZh ? "CNY" : "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(displayPrice);
};

const fetchVehicles = async () => {
  loading.value = true;
  error.value = null;
  try {
    const params = new URLSearchParams({ page: "1", pageSize: "6" }).toString();
    const res = await fetch(`http://114.55.246.208:8082/business/website/list?${params}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("网络请求失败");

    const json: ApiResponse = await res.json();

    if (json.code !== 200) throw new Error("更多车型信息请联系contact@etruck.top");

    const processed: Vehicle[] = json.rows.map((item) => {
      const cleanChinese = (str: string) => str.split("\n")[0]?.trim() || "";
      const cleanModel = (str: string) =>
        str
          .replace(/\n.*/g, "")
          .replace(/Tractor|Flat car|Dump|Cargo|Loader/gi, "")
          .trim();

      return {
        id: item.id ?? Math.random(),
        truckType: item.truckType,
        truckNo: item.truckNo,
        brand: item.brand,
        drive: item.drive,
        engineType: item.engineType,
        emission: item.emission,
        torque: item.torque,
        gearboxCategory: item.gearboxCategory,
        business: item.business,
        function: item.function,
        displayMaker: cleanChinese(item.automaker || ""),
        displayModel: cleanModel(item.vehicleModel || ""),
        currentPrice: Number(item.webPrice) || 0,
        originalPrice: Number(item.webPriceUnderline) || 0,
        coverImage:
          item.fileUrl ||
          "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Auman%20GTL%208x4%20concrete%20mixer%20truck%2C%20construction%20site%20background&sign=c06d6a3bb6f1e5eb2e1146c0852ca3ad",
      };
    });

    vehicles.value = processed;
  } catch (err) {
    console.error("加载车辆失败:", err);
    error.value = (err as Error).message || "加载失败";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchVehicles);
</script>

