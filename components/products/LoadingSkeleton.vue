<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
    <div v-for="index in 4" :key="index" class="bg-white border border-gray-200 rounded-xl overflow-hidden h-[450px] animate-pulse">
      <div class="h-48 bg-gray-200 w-full"></div>
      <div class="p-6 space-y-4">
        <div class="h-6 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  </div>
</template>

