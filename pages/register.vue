<template>
  <div>
    <section class="bg-gradient-to-r from-blue-800 to-blue-600 pt-20 pb-16 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>
      <div class="container mx-auto px-4 relative z-10 text-center max-w-3xl">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{{ t("register.createAccount") }}</h1>
        <p class="text-xl md:text-2xl text-blue-100 mb-8">{{ t("register.subtitle") }}</p>
        <div class="w-20 h-1 bg-blue-300 mx-auto"></div>
      </div>
    </section>
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t("register.name") }}</label>
              <input v-model="formData.name" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" :placeholder="t('register.enterName')" required />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t("register.phone") }}</label>
                <input v-model="formData.phone" type="tel" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" :placeholder="t('register.enterPhone')" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t("register.email") }}</label>
                <input v-model="formData.email" type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" :placeholder="t('register.enterEmail')" required />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t("register.password") }}</label>
              <input v-model="formData.password" type="password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" :placeholder="t('register.setPassword')" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t("register.confirmPassword") }}</label>
              <input v-model="formData.confirmPassword" type="password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" :placeholder="t('register.confirmPasswordPlaceholder')" required />
            </div>
            <div class="flex items-center">
              <input v-model="formData.agree" type="checkbox" id="agree" class="rounded text-blue-600 focus:ring-blue-500" />
              <label for="agree" class="ml-2 text-sm text-gray-600">
                {{ t("register.agreeText1") }}
                <a href="#" class="text-blue-600 hover:underline">{{ t("register.terms") }}</a>
                {{ t("register.agreeText2") }}
                <a href="#" class="text-blue-600 hover:underline">{{ t("register.privacy") }}</a>
              </label>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors" :disabled="isSubmitting">
              {{ isSubmitting ? t("register.registering") : t("register.registerNow") }}
            </button>
          </form>
          <p class="text-sm text-gray-600 mt-6 text-center">
            {{ t("register.haveAccount") }}
            <NuxtLink to="/login" class="text-blue-600 font-semibold hover:underline">
              {{ t("register.loginNow") }}
            </NuxtLink>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { toast } from "vue-sonner";

const { t } = useI18n();
const router = useRouter();

const isSubmitting = ref(false);
const formData = reactive({
  name: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  agree: false,
});

const handleSubmit = () => {
  if (formData.name.length < 2) {
    toast.error(t("register.validNameMin"));
    return;
  }
  if (!formData.agree) {
    toast.error(t("register.agreeTerms"));
    return;
  }
  if (formData.password !== formData.confirmPassword) {
    toast.error(t("register.passwordsMatch"));
    return;
  }
  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    toast.success(t("register.registerSuccess"));
    navigateTo("/login");
  }, 1500);
};
</script>

