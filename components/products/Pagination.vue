<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center mt-8">
    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      <button
        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        :class="{ 'cursor-not-allowed opacity-50': currentPage === 1 }"
        :disabled="currentPage === 1"
        @click="$emit('change', currentPage - 1)"
      >
        <span class="sr-only">Previous</span>
        <i class="fas fa-chevron-left h-5 w-5 flex items-center justify-center text-xs"></i>
      </button>
      <template v-for="(num, index) in pageNumbers" :key="`page-${index}-${num}`">
        <span
          v-if="num === '...'"
          class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
        >
          ...
        </span>
        <button
          v-else
          class="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0"
          :class="num === currentPage ? 'z-10 bg-blue-600 text-white ring-1 ring-inset ring-blue-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'"
          :aria-current="num === currentPage ? 'page' : undefined"
          @click="$emit('change', num as number)"
        >
          {{ num }}
        </button>
      </template>
      <button
        class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        :class="{ 'cursor-not-allowed opacity-50': currentPage === totalPages }"
        :disabled="currentPage === totalPages"
        @click="$emit('change', currentPage + 1)"
      >
        <span class="sr-only">Next</span>
        <i class="fas fa-chevron-right h-5 w-5 flex items-center justify-center text-xs"></i>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  currentPage: number;
  pageSize: number;
  total: number;
}>();

defineEmits<{
  change: [page: number];
}>();

const totalPages = computed(() => Math.ceil(props.total / props.pageSize));

const pageNumbers = computed(() => {
  const total = totalPages.value;
  const current = props.currentPage;
  const pages: Array<number | string> = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i += 1) {
      pages.push(i);
    }
  } else if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, "...", total);
  } else if (current >= total - 3) {
    pages.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, "...", current - 1, current, current + 1, "...", total);
  }

  return pages;
});
</script>

