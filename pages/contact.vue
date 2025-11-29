<template>
  <div class="bg-white">
    <section class="bg-gradient-to-r from-blue-800 to-blue-600 pt-24 pb-16 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>
      <div class="container mx-auto px-4 relative z-10 text-center max-w-3xl">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{{ t("contact.title") }}</h1>
        <p class="text-xl md:text-2xl text-blue-100 mb-8">
          {{ t("contact.subtitle") }}
        </p>
        <div class="w-20 h-1 bg-blue-300 mx-auto"></div>
      </div>
    </section>
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="card in contactCards" :key="card.title" class="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
          <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <i :class="['text-blue-600', 'text-xl', card.icon]"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">{{ card.title }}</h3>
          <p class="text-gray-600 mb-3">{{ card.description }}</p>
          <component :is="card.linkTag" v-bind="card.linkProps" class="text-blue-600 font-medium hover:underline">
            {{ card.linkText }}
          </component>
        </div>
      </div>
    </section>
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{{ t("contact.sendMessage") }}</h2>
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-800 mb-2">{{ t("contact.name") }} *</label>
                <input v-model="formData.name" type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-800 mb-2">{{ t("contact.phone") }} *</label>
                <input v-model="formData.phone" type="tel" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-800 mb-2">{{ t("contact.email") }}</label>
              <input v-model="formData.email" type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-800 mb-2">{{ t("contact.inquiryType") }}</label>
              <select v-model="formData.inquiry_type" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option v-for="option in inquiryTypes" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-800 mb-2">{{ t("contact.message") }} *</label>
              <textarea v-model="formData.message" rows="5" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" :placeholder="t('contact.messagePlaceholder')"></textarea>
            </div>
            <div class="flex items-center">
              <input v-model="formData.privacy" type="checkbox" id="privacy" class="rounded text-blue-600 focus:ring-blue-500" />
              <label for="privacy" class="ml-2 text-sm text-gray-600">
                {{ t("contact.agreePrivacy") }}
                <a href="#" class="text-blue-600 hover:underline">{{ t("contact.privacy") }}</a>
              </label>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-700/20" :disabled="isSubmitting">
              {{ isSubmitting ? t("contact.sending") : t("contact.sendMessage") }}
            </button>
          </form>
        </div>
        <div class="space-y-6">
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h3 class="text-xl font-bold text-gray-800 mb-4">{{ t("contact.companyLocation") }}</h3>
            <div class="bg-gray-100 rounded-xl h-72 overflow-hidden border border-gray-200">
              <iframe
                width="100%"
                height="100%"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://www.openstreetmap.org/export/embed.html?bbox=116.5641%2C40.0885%2C116.6307%2C40.1285&layer=mapnik&marker=40.1085%2C116.5974"
                title="Company Location"
              ></iframe>
            </div>
            <p class="text-sm text-gray-600 mt-4 flex items-start">
              <i class="fas fa-map-marker-alt text-blue-600 mt-1 mr-2 flex-shrink-0"></i>
              中国北京市顺义区南法信航港国际大厦海关大楼815
            </p>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h3 class="text-xl font-bold text-gray-800 mb-4">{{ t("contact.faqTitle") }}</h3>
            <div class="space-y-3">
              <div v-for="faq in faqs" :key="faq.question">
                <p class="font-semibold text-gray-800">{{ faq.question }}</p>
                <p class="text-gray-600 text-sm">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6 sm:px-8 lg:px-12 max-w-5xl text-center bg-blue-600 text-white rounded-3xl p-10 shadow-lg">
        <h2 class="text-3xl font-bold mb-4">{{ t("contact.emergencyContact") }}</h2>
        <p class="text-blue-100 mb-6">{{ t("contact.24hEmergency") }}</p>
        <a href="tel:+8610355888" class="inline-flex items-center gap-3 px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors">
          <i class="fas fa-phone-alt"></i>
          +86 10 355 888
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { toast } from "vue-sonner";

const { t } = useI18n();

const isSubmitting = ref(false);
const formData = reactive({
  name: "",
  phone: "",
  email: "",
  inquiry_type: "",
  message: "",
  privacy: false,
});

const inquiryTypes = computed(() => [
  { value: "", label: t("contact.selectInquiry") },
  { value: "vehicle_inquiry", label: t("contact.vehicleInquiry") },
  { value: "customization", label: t("contact.customization") },
  { value: "logistics", label: t("contact.logistics") },
  { value: "after_sales", label: t("contact.afterSales") },
  { value: "partnership", label: t("contact.partnership") },
  { value: "other", label: t("contact.other") },
]);

const faqs = computed(() => [
  { question: t("contact.faq1Question"), answer: t("contact.faq1Answer") },
  { question: t("contact.faq2Question"), answer: t("contact.faq2Answer") },
  { question: t("contact.faq3Question"), answer: t("contact.faq3Answer") },
  { question: t("contact.faq4Question"), answer: t("contact.faq4Answer") },
]);

const contactCards = computed(() => [
  {
    icon: "fas fa-phone-alt",
    title: t("contact.phoneConsultation"),
    description: t("contact.24hService"),
    linkTag: "a",
    linkProps: { href: "tel:+8610355888" },
    linkText: "+86 10 355 888",
  },
  {
    icon: "fas fa-envelope",
    title: t("contact.email"),
    description: t("contact.sendEmail"),
    linkTag: "a",
    linkProps: { href: "mailto:contact@etruck.top" },
    linkText: "contact@etruck.top",
  },
  {
    icon: "fas fa-map-marker-alt",
    title: t("contact.address"),
    description: t("contact.visitUs"),
    linkTag: "span",
    linkProps: {},
    linkText: "中国北京市顺义区南法信航港国际大厦海关大楼815",
  },
  {
    icon: "fas fa-clock",
    title: t("contact.businessHours"),
    description: t("contact.teamAlwaysReady"),
    linkTag: "span",
    linkProps: {},
    linkText: `${t("contact.mondayToSunday")} 9:00 - 18:00`,
  },
]);

const handleSubmit = () => {
  if (!formData.name || !formData.phone || !formData.message || !formData.privacy) {
    toast.error(t("contact.fillRequired"), { position: "top-right" });
    return;
  }
  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    toast.success(t("contact.sendSuccess"), { position: "top-right" });
    formData.name = "";
    formData.phone = "";
    formData.email = "";
    formData.inquiry_type = "";
    formData.message = "";
    formData.privacy = false;
  }, 1500);
};
</script>

