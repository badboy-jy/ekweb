<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div>
          <h3 class="text-2xl font-bold mb-4">ETRUCK</h3>
          <p class="text-gray-400 mb-4">
            {{ t("footer.companyDesc") }}
          </p>
          <div class="flex space-x-4">
            <a
              href="https://www.tiktok.com/@etruckmx"
              class="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fab fa-tiktok"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors"><i class="fab fa-twitter"></i></a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-4">{{ t("footer.quickLinks") }}</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">{{ t("nav.home") }}</NuxtLink></li>
            <li>
              <NuxtLink to="/products" class="text-gray-400 hover:text-white transition-colors">
                {{ t("nav.products") }}
              </NuxtLink>
            </li>
            <li><NuxtLink to="/about" class="text-gray-400 hover:text-white transition-colors">{{ t("nav.about") }}</NuxtLink></li>
            <li><NuxtLink to="/team" class="text-gray-400 hover:text-white transition-colors">{{ t("nav.team") }}</NuxtLink></li>
            <li>
              <NuxtLink to="/contact" class="text-gray-400 hover:text-white transition-colors">
                {{ t("nav.contact") }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-4">{{ t("footer.contact") }}</h4>
          <ul class="space-y-3">
            <li class="flex items-start">
              <i class="fas fa-map-marker-alt text-gray-400 mt-1 mr-3"></i>
              <span class="text-gray-400">{{ t("footer.address") }}</span>
            </li>
            <li class="flex items-center">
              <i class="fas fa-phone text-gray-400 mr-3"></i>
              <span class="text-gray-400">{{ t("footer.phone") }}</span>
            </li>
            <li class="flex items-center">
              <i class="fas fa-envelope text-gray-400 mr-3"></i>
              <span class="text-gray-400">{{ t("footer.email") }}</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-4">{{ t("footer.subscribe") }}</h4>
          <p class="text-gray-400 mb-4">
            {{ t("footer.subscribeDesc") }}
          </p>
          <form class="flex">
            <input
              type="email"
              :placeholder="t('footer.emailPlaceholder')"
              class="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              class="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
            >
              {{ t("footer.subscribeButton") }}
            </button>
          </form>
        </div>
      </div>
      <div class="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-500 text-sm mb-4 md:mb-0">
          &copy; {{ currentYear }} ETRUCK. {{ t("footer.allRights") }}
        </p>
        <div class="flex space-x-6">
          <a href="#" class="text-gray-500 hover:text-white text-sm transition-colors">{{ t("footer.privacy") }}</a>
          <a href="#" class="text-gray-500 hover:text-white text-sm transition-colors">{{ t("footer.terms") }}</a>
          <a href="#" class="text-gray-500 hover:text-white text-sm transition-colors">{{ t("footer.cookie") }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { t } = useI18n();
const currentYear = computed(() => new Date().getFullYear());
</script>

