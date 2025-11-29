<template>
  <div class="bg-white">
    <section class="bg-gradient-to-r from-blue-800 to-blue-600 pt-24 pb-16 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>
      <div class="container mx-auto px-4 relative z-10 text-center max-w-3xl">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{{ t("teamPage.title") }}</h1>
        <p class="text-xl md:text-2xl text-blue-100 mb-8">
          {{ t("teamPage.subtitle") }}
        </p>
        <div class="w-20 h-1 bg-blue-300 mx-auto"></div>
      </div>
    </section>
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6 sm:px-8 lg:px-12">
        <div class="text-center mb-16 max-w-4xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{{ t("teamPage.title") }}</h2>
          <p class="text-xl text-gray-600">{{ t("teamPage.teamIntro") }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            v-for="member in teamMembers"
            :key="member.id"
            class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-blue-600"
          >
            <div class="relative h-64 overflow-hidden group">
              <img :src="member.image" :alt="member.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-2">{{ member.name }}</h3>
              <p class="text-blue-600 font-medium mb-3">{{ member.position }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="skill in member.expertise" :key="skill" class="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs border border-blue-100">
                  {{ skill }}
                </span>
              </div>
              <p class="text-gray-600 text-sm mb-4">
                {{ member.bio }}
              </p>
              <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium" @click="openMemberModal(member)">
                {{ t("teamPage.learnMore") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6 sm:px-8 lg:px-12">
        <div class="text-center mb-16 max-w-4xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{{ t("teamPage.teamValues") }}</h2>
          <p class="text-xl text-gray-600">{{ t("teamPage.teamValuesSubtitle") }}</p>
          <div class="w-20 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div v-for="value in teamValues" :key="value.title" class="bg-white rounded-2xl p-8 text-center h-full shadow-sm">
            <div class="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              {{ value.emoji }}
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">{{ value.title }}</h3>
            <p class="text-gray-600">
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="py-20 bg-blue-600 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>
      <div class="container mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10 max-w-4xl">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{{ t("teamPage.contactExperts") }}</h2>
        <p class="text-xl text-blue-100 mb-8">
          {{ t("teamPage.contactExpertsDesc") }}
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <RouterLink to="/contact" class="bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/30">
            {{ t("aboutPage.contactUs") }}
          </RouterLink>
          <RouterLink to="/products" class="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-blue-600 transition-all shadow-lg shadow-blue-700/20">
            {{ t("aboutPage.browseInventory") }}
          </RouterLink>
        </div>
      </div>
    </section>
    <div v-if="selectedMember" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="closeModal">
      <div class="bg-white rounded-xl max-w-2xl w-[90%] max-h-[80vh] overflow-y-auto m-4" @click.stop>
        <div class="p-6">
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-2xl font-bold text-gray-800">
              {{ selectedMember.name }} - {{ selectedMember.position }}
            </h2>
            <button class="text-gray-400 hover:text-gray-600" @click="closeModal" :aria-label="t('teamPage.close')">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          <div class="flex flex-col md:flex-row gap-6 mb-6">
            <img :src="selectedMember.image" :alt="selectedMember.name" class="w-32 h-32 rounded-lg object-cover mx-auto md:mx-0" />
            <div class="flex-1">
              <p class="text-gray-600 mb-4">
                {{ selectedMember.detailedBio }}
              </p>
            </div>
          </div>
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3">{{ t("teamPage.expertise") }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div v-for="skill in selectedMember.expertise" :key="skill" class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span class="text-sm text-gray-600">{{ skill }}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800 mb-3">{{ t("teamPage.achievements") }}</h3>
            <div class="space-y-2">
              <div v-for="achievement in selectedMember.achievements" :key="achievement" class="flex items-start space-x-2">
                <div class="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <span class="text-sm text-gray-600">{{ achievement }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

import avery from "~/assets/images/team/avery.jpg";
import doris from "~/assets/images/team/doris.jpg";
import qusanshan from "~/assets/images/team/qusanshan.jpg";
import xuening from "~/assets/images/team/xuening.jpg";
import zhangdongyu from "~/assets/images/team/zhangdongyu.jpg";
import zhiyu from "~/assets/images/team/zhiyu.jpg";

type TeamMember = {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  expertise: string[];
  achievements: string[];
  detailedBio: string;
};

const { t } = useI18n();

const teamMembers: TeamMember[] = [
  {
    id: "qusanshan",
    name: "屈珊珊",
    position: "卡车产品经理",
    image: qusanshan,
    bio: "拥有8年商用车产品管理经验，深度了解国内外商用车市场趋势，能够为客户提供专业的产品推荐和解决方案。",
    detailedBio:
      "屈珊珊女士拥有8年商用车产品管理经验，毕业于清华大学汽车工程专业。她深度了解国内外商用车市场趋势，曾任职于国内知名商用车企业，参与多款热销车型的产品规划和市场推广工作。",
    expertise: ["产品规划", "市场分析", "客户需求"],
    achievements: ["成功主导10+款商用车型的产品规划", "建立了完善的客户需求分析体系", "客户满意度达到98%以上", "获得多项产品创新奖项"],
  },
  {
    id: "xuenin",
    name: "薛宁",
    position: "资深卡车出口专家",
    image: xuening,
    bio: "10年商用车出口经验，熟悉各国进出口政策和法规，已成功帮助数千辆商用车出口到全球20多个国家。",
    detailedBio: "薛宁先生是商用车出口领域的资深专家，拥有10年国际贸易经验。他熟悉各国进出口政策和法规，成功帮助数千辆商用车出口到全球20多个国家和地区。",
    expertise: ["出口贸易", "国际物流", "海关事务"],
    achievements: ["累计出口商用车超过3000辆", "服务客户遍布全球20多个国家", "出口成功率达到99.5%", "建立了完善的国际服务网络"],
  },
  {
    id: "avery",
    name: "艾弗里",
    position: "福田卡车专家",
    image: avery,
    bio: "福田品牌认证专家，专注福田卡车产品线6年，对各类福田商用车的技术参数和配置选项了如指掌。",
    detailedBio: "艾弗里先生是福田品牌认证专家，专注福田卡车产品线6年。他对各类福田商用车的技术参数和配置选项了如指掌，能够为客户提供最专业的福田产品咨询。",
    expertise: ["福田品牌", "技术规格", "配置定制"],
    achievements: ["福田官方认证技术专家", "服务福田客户超过500位", "技术咨询满意度99%", "获得福田优秀服务商称号"],
  },
  {
    id: "doris",
    name: "Doris",
    position: "财务总监",
    image: doris,
    bio: "12年财务管理经验，专注于商用车贸易的财务规划和成本控制，为客户提供最具竞争力的价格方案。",
    detailedBio: "Doris女士拥有12年财务管理经验，毕业于财经大学会计学专业。她专注于商用车贸易的财务规划和成本控制，为客户提供最具竞争力的价格方案。",
    expertise: ["财务管理", "价格分析", "成本控制"],
    achievements: ["建立了完善的成本控制体系", "为公司节省运营成本15%", "设计了多种灵活的付款方案", "获得高级会计师职称"],
  },
  {
    id: "zhangdongyu",
    name: "张冬雨",
    position: "财务分析师",
    image: zhangdongyu,
    bio: "金融学专业背景，8年财务分析经验，专注于商用车投资的价值分析和风险评估。",
    detailedBio: "张冬雨先生是金融学专业背景，拥有8年财务分析经验。他专注于商用车投资的价值分析和风险评估，为客户提供专业的投资建议。",
    expertise: ["财务分析", "风险评估", "投资咨询"],
    achievements: ["建立了完善的投资分析模型", "为客户设计最优投资方案", "风险评估准确率达到95%", "获得CFA特许金融分析师认证"],
  },
  {
    id: "double-sheep",
    name: "Double Sheep",
    position: "采购总监",
    image: zhiyu,
    bio: "10年供应链管理经验，建立了完善的供应商网络和质量控制体系，确保为客户提供最优质的商用车产品。",
    detailedBio:
      "Double Sheep先生拥有10年供应链管理经验，建立了完善的供应商网络和质量控制体系。他确保为客户提供最优质的商用车产品，同时控制采购成本。",
    expertise: ["供应链管理", "采购谈判", "质量控制"],
    achievements: ["建立了覆盖全国的供应商网络", "采购成本控制在行业领先水平", "产品质量合格率达到99.8%", "获得供应链管理专家认证"],
  },
];

const teamValues = computed(() => [
  { title: t("teamPage.professional"), description: t("teamPage.professionalDesc"), emoji: "🎯" },
  { title: t("teamPage.integrity"), description: t("teamPage.integrityDesc"), emoji: "🤝" },
  { title: t("teamPage.innovation"), description: t("teamPage.innovationDesc"), emoji: "💡" },
  { title: t("teamPage.excellence"), description: t("teamPage.excellenceDesc"), emoji: "🌟" },
]);

const selectedMember = ref<TeamMember | null>(null);

const openMemberModal = (member: TeamMember) => {
  selectedMember.value = member;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  selectedMember.value = null;
  document.body.style.overflow = "auto";
};

onBeforeUnmount(() => {
  document.body.style.overflow = "auto";
});
</script>

