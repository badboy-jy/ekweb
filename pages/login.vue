<template>
  <div>
    <section class="bg-gradient-to-r from-blue-800 to-blue-600 pt-20 pb-16 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>
      <div class="container mx-auto px-4 relative z-10 text-center max-w-3xl">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{{ t("login.welcome") }}</h1>
        <p class="text-xl md:text-2xl text-blue-100 mb-8">{{ t("login.subtitle") }}</p>
        <div class="w-20 h-1 bg-blue-300 mx-auto"></div>
      </div>
    </section>
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div class="flex border-b border-gray-200 mb-8">
            <button class="py-3 px-4 text-sm font-medium transition-colors" :class="loginMethod === 'phone' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'" @click="setLoginMethod('phone')">
              {{ t("login.phoneLogin") }}
            </button>
            <button class="py-3 px-4 text-sm font-medium transition-colors" :class="loginMethod === 'email' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'" @click="setLoginMethod('email')">
              {{ t("login.emailLogin") }}
            </button>
          </div>
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div v-if="loginMethod === 'phone'">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t("login.phone") }}
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-mobile-alt text-gray-400"></i>
                </div>
                <input
                  type="tel"
                  v-model="formData.phone"
                  :placeholder="t('login.enterPhone')"
                  class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div v-else>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t("login.email") }}
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  type="email"
                  v-model="formData.email"
                  :placeholder="t('login.enterEmail')"
                  class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t("login.password") }}</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  type="password"
                  v-model="formData.password"
                  :placeholder="t('login.enterPassword')"
                  class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div class="flex items-center justify-between text-sm">
              <a href="#" class="text-blue-600 hover:underline">{{ t("login.forgotPassword") }}</a>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors" :disabled="isSubmitting">
              {{ isSubmitting ? t("login.loggingIn") : t("login.login") }}
            </button>
          </form>
          <p class="text-sm text-gray-600 mt-6 text-center">
            {{ t("login.noAccount") }}
            <NuxtLink to="/register" class="text-blue-600 font-semibold hover:underline">
              {{ t("login.registerNow") }}
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
import { useAuth } from "~/composables/useAuth";

const { t } = useI18n();
const router = useRouter();
const auth = useAuth();

const loginMethod = ref<"phone" | "email">("phone");
const isSubmitting = ref(false);

const formData = reactive({
  phone: "",
  email: "",
  password: "",
});

const setLoginMethod = (method: "phone" | "email") => {
  if (loginMethod.value !== method) {
    loginMethod.value = method;
    formData.phone = "";
    formData.email = "";
    formData.password = "";
  }
};

const handleSubmit = () => {
  if (loginMethod.value === "phone" && formData.phone.length < 11) {
    toast.error(t("login.validPhone"));
    return;
  }
  if (loginMethod.value === "email" && !formData.email.includes("@")) {
    toast.error(t("login.validEmail"));
    return;
  }
  if (formData.password.length < 6) {
    toast.error(t("login.validPassword"));
    return;
  }
  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    auth.setIsAuthenticated(true);
    toast.success(t("login.loginSuccess"));
    navigateTo("/");
  }, 1200);
};
</script>

