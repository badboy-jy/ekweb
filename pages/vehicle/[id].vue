<template>
  <div class="min-h-screen flex flex-col bg-gray-50 relative">
    <main class="flex-1">
      <div class="container mx-auto px-4 py-6">
        <div v-if="loading" class="min-h-[60vh] flex items-center justify-center">
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p class="text-gray-600">正在加载车辆信息...</p>
          </div>
        </div>
        <div v-else-if="!vehicle" class="text-center py-24">
          <div class="text-6xl text-gray-300 mb-4"><i class="fas fa-car-crash"></i></div>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">未找到车辆信息</h2>
          <button class="px-6 py-2 bg-blue-600 text-white rounded-lg" @click="navigateTo('/')">返回首页</button>
        </div>
        <div v-else>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <div>
              <div class="bg-white rounded-xl overflow-hidden shadow-sm mb-4">
                <div class="relative h-[350px] md:h-[450px]">
                  <img
                    v-if="vehicleImages.length > 0"
                    :key="currentImageIndex"
                    :src="vehicleImages[currentImageIndex]"
                    alt="Vehicle"
                    class="w-full h-full object-contain transition-opacity duration-500"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">暂无图片</div>
                  <template v-if="vehicleImages.length > 1">
                    <button
                      class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white z-10"
                      @click="prevImage"
                    >
                      <i class="fas fa-chevron-left"></i>
                    </button>
                    <button
                      class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white z-10"
                      @click="nextImage"
                    >
                      <i class="fas fa-chevron-right"></i>
                    </button>
                  </template>
                  <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                    <button
                      v-for="(image, index) in vehicleImages"
                      :key="`indicator-${image}-${index}`"
                      class="w-2 h-2 rounded-full"
                      :class="index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'"
                      @click="changeImage(index)"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-4 gap-2">
                <div
                  v-for="(image, index) in vehicleImages"
                  :key="`thumb-${image}-${index}`"
                  class="cursor-pointer rounded-lg overflow-hidden border-2 h-20"
                  :class="index === currentImageIndex ? 'border-blue-600' : 'border-transparent'"
                  @click="changeImage(index)"
                >
                  <img :src="image" alt="Thumbnail" class="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <div>
              <div class="bg-white rounded-xl p-6 shadow-sm mb-6">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{{ vehicle.brand }} {{ vehicle.engineType }}</h2>
                <p class="text-xl font-bold text-red-500 mb-6">{{ getPriceInDollars(vehicle.webPrice) }}</p>
                <button class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center mb-6" @click="isContactModalOpen = true">
                  <i class="fas fa-phone-alt mr-2"></i> 联系卖家
                </button>
                <div class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-base font-semibold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                    关键参数
                  </h3>
                  <div class="grid grid-cols-2 gap-4">
                    <div v-for="param in keyParams" :key="param.label" class="flex flex-col">
                      <span class="text-gray-500 text-sm mb-1 flex items-center">
                        <i :class="['fas', param.icon, 'mr-1', 'text-blue-600']"></i>
                        {{ param.label }}
                      </span>
                      <span class="text-gray-800 font-medium">{{ param.value }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-white rounded-xl p-6 shadow-sm">
                <h3 class="text-base font-semibold text-gray-800 mb-4 flex items-center">
                  <i class="fas fa-ruler-combined text-blue-600 mr-2"></i>
                  车辆尺寸
                </h3>
                <div class="flex justify-center">
                  <div class="text-center p-4 border rounded bg-gray-50 w-full">
                    <p class="text-lg font-medium text-gray-800">{{ vehicle.model }}</p>
                    <p class="text-sm text-gray-500 mt-2">长宽高：{{ vehicle.overallDimension || "暂无数据" }}</p>
                    <p class="text-sm text-gray-500">轴距：{{ vehicle.wheelbase || "暂无数据" }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <i class="fas fa-cogs text-blue-600 mr-2"></i>
              主要配置
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <div v-for="config in mainConfigurations" :key="config.name" class="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:shadow-sm transition-shadow">
                <i :class="['fas', config.icon, 'text-blue-600', 'text-xl', 'mb-2']"></i>
                <span class="text-sm text-gray-800">{{ config.name }}</span>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-6">详细技术参数</h3>
            <div class="space-y-8">
              <div v-for="section in techSpecs" :key="section.title">
                <h4 class="text-base font-semibold text-blue-600 mb-4">{{ section.title }}</h4>
                <table class="w-full">
                  <tbody>
                    <tr v-for="(row, idx) in section.data" :key="row.label" :class="idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'">
                      <td class="py-3 px-4 text-gray-600 w-1/3 border-b border-gray-100">{{ row.label }}</td>
                      <td class="py-3 px-4 text-gray-800 border-b border-gray-100">{{ row.value }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <section v-if="recommendedVehicles.length > 0" class="mb-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-bold text-gray-800">推荐产品</h3>
              <NuxtLink to="/products" class="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium flex items-center">
                查看更多 <i class="fas fa-chevron-right ml-1 text-xs"></i>
              </NuxtLink>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                v-for="recVehicle in recommendedVehicles.filter((v) => v.id !== currentVehicleId).slice(0, 3)"
                :key="recVehicle.id"
                class="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                @click="navigateTo(`/vehicle/${recVehicle.id}`)"
              >
                <div class="relative h-40 overflow-hidden bg-gray-100">
                  <img
                    :src="recVehicle.fileUrl || fallbackImage"
                    :alt="`${recVehicle.function} ${recVehicle.business}`"
                    class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div class="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {{ recVehicle.function || recVehicle.business }}
                  </div>
                </div>
                <div class="p-4">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <h4 class="text-lg font-bold text-gray-800 truncate max-w-[150px]">{{ recVehicle.brand }}</h4>
                      <p class="text-sm text-gray-600 truncate max-w-[150px]">{{ recVehicle.engineType }} {{ recVehicle.drive }}</p>
                    </div>
                    <div class="text-right shrink-0">
                      <p class="text-red-500 font-bold">{{ getPriceInDollars(recVehicle.webPrice) }}</p>
                    </div>
                  </div>
                  <div class="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{{ recVehicle.emission || "N/A" }}</span>
                    <span>{{ recVehicle.torque || "N/A" }}</span>
                  </div>
                  <button class="w-full mt-3 bg-gray-100 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                    查看详情
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
    <div v-if="isContactModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click="isContactModalOpen = false">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden" @click.stop>
        <div class="bg-blue-600 p-6 flex justify-between items-start text-white">
          <div>
            <h3 class="text-xl font-bold">联系销售顾问</h3>
            <p class="text-blue-100 text-sm mt-1">期待您的咨询，我们将竭诚为您服务</p>
          </div>
          <button class="bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-colors" @click="isContactModalOpen = false">
            <i class="fas fa-times w-5 h-5 flex items-center justify-center"></i>
          </button>
        </div>
        <div class="p-6 space-y-6">
          <div class="flex items-start group">
            <div class="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mr-4 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
              <i class="fas fa-phone-alt"></i>
            </div>
            <div class="flex-1">
              <p class="text-sm text-gray-500 mb-1">咨询热线</p>
              <p class="text-lg font-bold text-gray-800">{{ contactInfo.phone }}</p>
            </div>
            <button class="text-gray-400 hover:text-blue-600 p-2" title="复制" @click="copyToClipboard(contactInfo.phone, '电话号码')">
              <i class="far fa-copy"></i>
            </button>
          </div>
          <div class="flex items-start group">
            <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <i class="fas fa-envelope"></i>
            </div>
            <div class="flex-1">
              <p class="text-sm text-gray-500 mb-1">电子邮箱</p>
              <p class="text-lg font-bold text-gray-800 break-all">{{ contactInfo.email }}</p>
            </div>
            <button class="text-gray-400 hover:text-blue-600 p-2" title="复制" @click="copyToClipboard(contactInfo.email, '邮箱')">
              <i class="far fa-copy"></i>
            </button>
          </div>
          <div class="flex items-start group">
            <div class="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mr-4 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="flex-1">
              <p class="text-sm text-gray-500 mb-1">公司地址</p>
              <p class="text-base text-gray-800 leading-snug">{{ contactInfo.address }}</p>
            </div>
            <button class="text-gray-400 hover:text-blue-600 p-2" title="复制" @click="copyToClipboard(contactInfo.address, '地址')">
              <i class="far fa-copy"></i>
            </button>
          </div>
        </div>
        <div class="p-4 bg-gray-50 border-t border-gray-100 text-center">
          <button class="text-gray-500 hover:text-gray-800 text-sm font-medium" @click="isContactModalOpen = false">
            关闭窗口
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { toast } from "vue-sonner";

type VehicleData = {
  id: number;
  brand: string;
  model: string;
  currentPrice: number;
  image: string;
  type: string;
  engineType: string;
  displacement: string;
  torque: string;
  transmission: string;
  seats: string;
  drive: string;
  function: string;
  [key: string]: any;
};

const route = useRoute();
const router = useRouter();

const vehicle = ref<VehicleData | null>(null);
const recommendedVehicles = ref<VehicleData[]>([]);
const loading = ref(true);
const currentImageIndex = ref(0);
const isContactModalOpen = ref(false);

const contactInfo = {
  address: "中国北京市顺义区南法信航港国际大厦海关大楼815室",
  phone: "+86 10 61668308",
  email: "contact@etruck.top",
};

const fallbackImage =
  "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Auman%20GTL%208x4%20concrete%20mixer%20truck%2C%20construction%20site%20background&sign=c06d6a3bb6f1e5eb2e1146c0852ca3ad";

const currentVehicleId = computed(() => vehicle.value?.id ?? -1);

const vehicleImages = computed(() => {
  if (vehicle.value?.ekFileList && Array.isArray(vehicle.value.ekFileList) && vehicle.value.ekFileList.length > 0) {
    return vehicle.value.ekFileList.map((item: { fileUrl: string }) => item.fileUrl || fallbackImage);
  }
  return [fallbackImage];
});

const keyParams = computed(() => [
  { label: "座位数", value: vehicle.value?.seats || "N/A", icon: "fa-users" },
  { label: "燃料类型", value: vehicle.value?.fuelType || "汽油", icon: "fa-gas-pump" },
  { label: "发动机", value: vehicle.value?.engineType || "N/A", icon: "fa-cog" },
  { label: "变速箱", value: vehicle.value?.gearboxType || "N/A", icon: "fa-exchange-alt" },
]);

const mainConfigurations = [
  { name: "ABS", icon: "fa-car-crash" },
  { name: "空调", icon: "fa-snowflake" },
  { name: "安全气囊", icon: "fa-shield-alt" },
  { name: "电动门窗", icon: "fa-window-maximize" },
  { name: "多功能方向盘", icon: "fa-window-maximize" },
  { name: "音响系统", icon: "fa-music" },
];

const techSpecs = computed(() => [
  {
    title: "基本信息",
    data: [
      { label: "制造商", value: vehicle.value?.automaker || vehicle.value?.brand || "N/A" },
      { label: "车辆类型", value: vehicle.value?.function || vehicle.value?.business },
      { label: "上市时间", value: vehicle.value?.year || "2025年" },
      { label: "整车质量", value: vehicle.value?.vcw || "N/A" },
    ],
  },
  {
    title: "发动机参数",
    data: [
      { label: "发动机型号", value: vehicle.value?.engineNo || vehicle.value?.engineType || "N/A" },
      { label: "排量", value: vehicle.value?.displacement || "N/A" },
      { label: "最大功率", value: vehicle.value?.speed || "N/A" },
      { label: "最大扭矩", value: vehicle.value?.torque || "N/A" },
      { label: "燃料类型", value: vehicle.value?.fuelType || "汽油" },
    ],
  },
  {
    title: "底盘参数",
    data: [
      { label: "变速箱", value: vehicle.value?.gearboxNo || vehicle.value?.gearboxType || "N/A" },
      { label: "驱动方式", value: vehicle.value?.drive || "N/A" },
      { label: "制动系统", value: vehicle.value?.brakeControl || "N/A" },
      { label: "悬挂系统", value: vehicle.value?.suspension || "N/A" },
    ],
  },
]);

const fetchData = async () => {
  const { id } = route.params;
  if (!id) return;
  loading.value = true;
  try {
    const [detailResponse, listResponse] = await Promise.all([
      fetch(`http://114.55.246.208:8082/business/website/getInfo?id=${id}`),
      fetch("http://114.55.246.208:8082/business/website/list"),
    ]);
    if (detailResponse.ok) {
      const detailRes = await detailResponse.json();
      if (detailRes.code === 200 || detailRes.code === 0) {
        vehicle.value = detailRes.data;
      } else if (detailRes.id) {
        vehicle.value = detailRes;
      }
    }
    if (listResponse.ok) {
      const listRes = await listResponse.json();
      recommendedVehicles.value = listRes.rows || listRes.data || (Array.isArray(listRes) ? listRes : []);
    }
  } catch (error) {
    console.error("获取数据失败:", error);
    toast.error("数据加载失败，请检查网络");
  } finally {
    loading.value = false;
    currentImageIndex.value = 0;
    window.scrollTo(0, 0);
  }
};

onMounted(fetchData);
watch(
  () => route.params.id,
  () => {
    fetchData();
  }
);

const changeImage = (index: number) => {
  currentImageIndex.value = index;
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % vehicleImages.value.length;
};

const prevImage = () => {
  currentImageIndex.value =
    (currentImageIndex.value - 1 + vehicleImages.value.length) % vehicleImages.value.length;
};

const getPriceInDollars = (price: number) => {
  if (!price) return "询价";
  const dollarPrice = price / 7;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dollarPrice);
};

const copyToClipboard = async (text: string, type: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${type}已复制到剪贴板`);
  } catch {
    toast.error("复制失败，请重试");
  }
};
</script>

