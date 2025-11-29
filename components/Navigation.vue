<template>
  <header class="sticky top-0 z-50 bg-white shadow-sm backdrop-blur-md bg-opacity-90" role="banner">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-blue-600" aria-label="ETRUCK 首页">
            ETRUCK
          </NuxtLink>
          <nav class="hidden md:ml-10 md:flex md:space-x-8" role="navigation" aria-label="主导航">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.href"
              :to="link.href"
              class="text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 text-sm font-medium"
              :class="{ 'text-blue-600': isActive(link.href) }"
            >
              {{ t(link.labelKey) }}
            </NuxtLink>
          </nav>
        </div>
        <div class="hidden md:flex items-center space-x-4">
          <div class="lang-selector">
            <button
              class="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
            >
              <span>{{ currentLanguageLabel }}</span>
              <i class="fas fa-chevron-down ml-2 text-xs"></i>
            </button>
            <div class="lang-dropdown">
              <div
                v-for="lang in languages"
                :key="lang.code"
                class="lang-option"
                :class="{ active: locale === lang.code }"
                @click="changeLanguage(lang.code)"
              >
                {{ lang.name }}
              </div>
            </div>
          </div>
          <template v-if="auth.isAuthenticated">
            <button
              class="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              aria-label="logout"
              @click="auth.logout"
            >
              {{ t("nav.logout") }}
            </button>
          </template>
          <template v-else>
            <button
              class="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              aria-label="login"
              @click="navigateTo('/login')"
            >
              {{ t("nav.login") }}
            </button>
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="register"
              @click="navigateTo('/register')"
            >
              {{ t("nav.register") }}
            </button>
          </template>
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="inquiry"
            @click="handleInquiryClick"
          >
            {{ t("nav.inquiry") }}
          </button>
        </div>
        <button
          class="md:hidden text-gray-600"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          aria-label="切换移动菜单"
          :aria-expanded="isMobileMenuOpen"
        >
          <i :class="`fas fa-${isMobileMenuOpen ? 'times' : 'bars'} text-xl`"></i>
        </button>
      </div>
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-t border-gray-200 animate-slideDown">
        <nav class="flex flex-col space-y-4 py-4 px-4" role="navigation" aria-label="移动导航">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            class="text-gray-600 hover:text-blue-600 transition-colors py-2"
            :class="{ 'text-blue-600 font-medium': isActive(link.href) }"
            @click="closeMobileMenu"
          >
            {{ t(link.labelKey) }}
          </NuxtLink>
          <div class="pt-4 border-t border-gray-200 space-y-3">
            <a href="tel:+8613522226434" class="text-gray-600 text-center py-2">+86 135 2226 6434</a>
            <template v-if="auth.isAuthenticated">
              <button
                class="w-full px-4 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-center"
                @click="handleLogout"
              >
                {{ t("nav.logout") }}
              </button>
            </template>
            <template v-else>
              <button
                class="w-full px-4 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-center"
                @click="goLogin"
              >
                {{ t("nav.login") }}
              </button>
              <button
                class="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
                @click="goRegister"
              >
                {{ t("nav.register") }}
              </button>
            </template>
            <div class="py-3">
              <p class="text-sm text-gray-600 mb-2">{{ t("nav.language") }}</p>
              <div class="flex space-x-2">
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  class="px-3 py-1 text-sm rounded"
                  :class="locale === lang.code ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                  @click="changeLanguage(lang.code)"
                >
                  {{ lang.code.toUpperCase() }}
                </button>
              </div>
            </div>
            <button
              class="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
              @click="handleInquiryClick"
            >
              {{ t("nav.inquiry") }}
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useAuth } from "~/composables/useAuth";

const auth = useAuth();
const { t, locale, setLocale } = useI18n();
const route = useRoute();
const router = useRouter();

type NavLink = {
  href: string;
  labelKey: string;
};

const navLinks: NavLink[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/products", labelKey: "nav.products" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/team", labelKey: "nav.team" },
  { href: "/contact", labelKey: "nav.contact" },
];

const languages = [
  { code: "zh", name: "中文" },
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
];

const isMobileMenuOpen = ref(false);

const currentLanguageLabel = computed(() => {
  const found = languages.find((item) => item.code === locale.value);
  return found ? found.name : "中文";
});

const isActive = (path: string) => route.path === path;

const changeLanguage = async (lng: string) => {
  await setLocale(lng);
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const handleInquiryClick = () => {
  navigateTo("/contact");
  closeMobileMenu();
};

const goLogin = () => {
  navigateTo("/login");
  closeMobileMenu();
};

const goRegister = () => {
  navigateTo("/register");
  closeMobileMenu();
};

const handleLogout = () => {
  auth.logout();
  closeMobileMenu();
};
</script>

