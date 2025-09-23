<template>
  <section class="p-4 md:p-8">
    <div class="p-mb-6 text-center">
      <h2 class="text-3xl md:text-4xl font-bold">What are you looking for?</h2>
      <p class="p-mt-2 text-lg text-600">Select a category to find your perfect photographer</p>
      <br>
    </div>

    <!-- PrimeFlex grid -->
    <div class="p-grid p-nogutter">
      <template v-for="(row, rowIndex) in rowsToShow" :key="rowIndex">
        <div v-for="category in row" :key="category.name" class="p-col-12 p-md-4 p-lg-4 p-p-3">
          <div class="p-d-flex p-flex-column p-h-100">
            <Card class="category-card p-flex-1 p-d-flex p-flex-column p-jc-between" :aria-label="`Category ${category.name}`">
              <template #header>
                <img :src="category.image" :alt="category.name" class="category-image" loading="lazy" />
              </template>

              <div class="p-d-flex p-flex-column p-ai-center p-text-center p-p-3">
                <h4 class="p-mt-3 p-text-bold">{{ category.name }}</h4>
                <Button label="Explore" class="p-mt-3 p-button-sm" :aria-label="`Explore ${category.name}`" />
              </div>
            </Card>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const categories = ref([
  { name: 'Weddings', image: '/src/assets/images/categories/wedding.jpg' },
  { name: 'Portraits', image: '/src/assets/images/categories/portrait.jpg' },
  { name: 'Events', image: '/src/assets/images/categories/event.jpg' },
  { name: 'Real Estate', image: '/src/assets/images/categories/real-estate.jpg' },
  { name: 'Products', image: '/src/assets/images/categories/product.jpg' },
  { name: 'Fashion', image: '/src/assets/images/categories/fashion.jpg' },
]);

// Chunk categories into rows of 3 and take the first two rows to render a 3x2 layout
const chunk = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
};

const rowsToShow = chunk(categories.value, 3).slice(0, 2);
</script>

<style scoped>
.category-card {
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  padding-left: 40px;
  padding-right: 40px;
}
.category-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.12);
}
.category-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}
</style>
