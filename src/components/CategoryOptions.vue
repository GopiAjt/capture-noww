<template>
  <section class="p-4 md:p-8">
    <div class="p-mb-6 text-center">
      <h2 class="text-3xl md:text-4xl font-bold">What are you looking for?</h2>
      <p class="p-mt-2 text-lg text-600">Select a category to find your perfect photographer</p>
      <br>
    </div>

    <!-- CSS Grid layout: 3 columns x 2 rows -->
    <div id="main-container" class="categories-grid">
      <div v-for="category in visibleCategories" :key="category.name" class="category-item" 
           @click="handleCategoryClick(category.name.replace(/s$/, ''))">
        <Card class="category-card" :aria-label="`Category ${category.name}`">
          <template #header>
            <div class="image-wrap">
              <img :src="category.image" :alt="category.name" class="category-image" loading="lazy" />
              <div class="image-overlay">
                <h4 class="category-title">{{ category.name }}</h4>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import AuthService from '@/services/AuthService';
import { useStore } from 'vuex';

const store = useStore();

const getImageUrl = (name) => {
  return new URL(`../assets/images/categories/${name}`, import.meta.url).href;
};

const categories = ref([
  { name: 'Weddings', image: getImageUrl('wedding.jpg') },
  { name: 'Portraits', image: getImageUrl('portrait.jpg') },
  { name: 'Events', image: getImageUrl('event.jpg') },
  { name: 'Real Estate', image: getImageUrl('real-estate.jpg') },
  { name: 'Products', image: getImageUrl('product.jpg') },
  { name: 'Fashion', image: getImageUrl('fashion.jpg') },
]);

const handleCategoryClick = async (categoryName) => {
  try {
    const response = await AuthService.searchByCategory(categoryName, 0, 10);
    store.commit('setPhotographers', response.data.content);
    store.commit('setPhotographersPage', 0);
    store.commit('setPhotographersPageSize', 10);
    
    // Scroll to the photographer list
    document.querySelector('.categories-grid')?.nextElementSibling?.scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    console.error('Error filtering by category:', error);
  }
};

// Show first 6 categories (3 columns x 2 rows)
const visibleCategories = categories.value.slice(0, 6);
</script>

<style scoped>
.category-card {
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
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

/* Make card background transparent and match image height */
.category-card .p-card {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
.category-card {
  padding: 0 !important;
}
.category-card .p-card-body {
  padding: 0 !important;
}
.category-card .p-card-header {
  padding: 0 !important;
}

.image-wrap {
  position: relative;
}

.image-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%);
  color: #fff;
  padding: 5rem;
}

.overlay-button {
  background-color: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.18);
}

/* CSS Grid for 3x2 layout */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columns on md+ */
    grid-auto-rows: 1fr; /* equal height rows */
  }
}

.category-item {
  display: flex;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.category-title {
  margin: 0.5rem 0 0.75rem;
  font-weight: 600;
}
</style>
