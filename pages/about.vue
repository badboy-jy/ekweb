<template>
  <div class="bg-white">
    <section class="bg-gradient-to-r from-blue-800 to-blue-600 pt-24 pb-16 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{{ t("aboutPage.title") }}</h1>
        <p class="text-xl md:text-2xl text-blue-100 mb-8">{{ t("aboutPage.subtitle") }}</p>
        <div class="w-20 h-1 bg-blue-300 mx-auto"></div>
      </div>
    </section>
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="space-y-6">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{{ t("aboutPage.companyOverview") }}</h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            {{ t("aboutPage.companyDesc1") }}
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            {{ t("aboutPage.companyDesc2") }}
          </p>
          <div class="grid grid-cols-2 gap-6 mt-8">
            <div class="text-center p-6 bg-gray-50 rounded-xl shadow-sm">
              <div class="text-4xl font-bold text-blue-600 mb-2">2020</div>
              <div class="text-sm text-gray-600">{{ t("aboutPage.foundedYear") }}</div>
            </div>
            <div class="text-center p-6 bg-gray-50 rounded-xl shadow-sm">
              <div class="text-4xl font-bold text-blue-600 mb-2">20+</div>
              <div class="text-sm text-gray-600">{{ t("aboutPage.serviceCountries") }}</div>
            </div>
          </div>
        </div>
        <div class="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Modern%20office%20building%2C%20business%20corporate%20headquarters&sign=e9b78d244fed7fe864cf975248c117f3"
            alt="公司办公环境"
            class="w-full h-auto"
          />
        </div>
      </div>
    </section>
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{{ t("aboutPage.mission") }}</h2>
        <p class="text-xl text-gray-600">{{ t("aboutPage.missionDesc") }}</p>
        <div class="w-20 h-1 bg-blue-600 mx-auto mt-6"></div>
      </div>
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
        <div v-for="card in missionCards" :key="card.title" class="bg-white rounded-2xl p-8 text-center shadow-sm">
          <div class="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            {{ card.emoji }}
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-4">{{ card.title }}</h3>
          <p class="text-gray-600">{{ card.description }}</p>
        </div>
      </div>
    </section>
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{{ t("aboutPage.vision") }}</h2>
          <p class="text-xl text-gray-600">{{ t("aboutPage.visionDesc") }}</p>
          <div class="w-20 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>
        <div class="max-w-4xl mx-auto space-y-8">
          <div v-for="(event, index) in timelineEvents" :key="event.year" class="relative pl-10 md:pl-16">
            <div class="absolute left-0 md:left-8 top-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <div class="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div v-if="index < timelineEvents.length - 1" class="absolute left-4 md:left-12 top-8 w-0.5 h-full bg-blue-100"></div>
            <div class="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-800 mb-2 md:mb-0">{{ event.title }}</h3>
                <span class="text-blue-600 font-medium">{{ event.year }}</span>
              </div>
              <p class="text-gray-600">{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{{ t("aboutPage.achievements") }}</h2>
          <p class="text-xl text-gray-600">{{ t("aboutPage.achievementsSubtitle") }}</p>
          <div class="w-20 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center p-8 bg-white rounded-xl shadow-sm">
            <div class="text-4xl font-bold text-blue-600 mb-2">{{ stat.value }}</div>
            <div class="text-gray-600">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-20 bg-blue-600 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{{ t("aboutPage.startCooperation") }}</h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {{ t("aboutPage.cooperationDesc") }}
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
          <NuxtLink to="/contact" class="bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/30">
            {{ t("aboutPage.contactUs") }}
          </NuxtLink>
          <NuxtLink to="/products" class="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-blue-600 transition-all shadow-lg shadow-blue-700/20">
            {{ t("aboutPage.browseInventory") }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { t } = useI18n();

const missionCards = computed(() => [
  { title: t("aboutPage.mission"), description: t("aboutPage.missionDesc"), emoji: "🎯" },
  { title: t("aboutPage.vision"), description: t("aboutPage.visionDesc"), emoji: "🌟" },
  { title: t("aboutPage.values"), description: t("aboutPage.valuesDesc"), emoji: "💎" },
]);

const timelineEvents = [
  { year: "2020", title: "公司成立", description: "ETRUCK正式成立，专注于商用车进出口贸易，开始为全球客户提供优质服务" },
  { year: "2021", title: "业务扩展", description: "业务覆盖10个国家，建立完善的供应链体系，月出口量突破100辆" },
  { year: "2022", title: "技术升级", description: "推出在线平台，实现数字化管理，提升客户服务体验，累计出口突破2000辆" },
  { year: "2023", title: "全球布局", description: "服务网络覆盖20个国家，建立海外仓储中心，累计出口突破5000辆" },
  { year: "2024", title: "创新发展", description: "推出智能物流解决方案，建立完整的售后服务体系，成为行业领先平台" },
];

const stats = computed(() => [
  { label: t("aboutPage.vehiclesInStock"), value: "500+" },
  { label: t("aboutPage.totalExports"), value: "5000+" },
  { label: t("aboutPage.countries"), value: "20+" },
  { label: t("aboutPage.customerSatisfaction"), value: "98%" },
]);
</script>

