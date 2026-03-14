<template>
  <section class="category-section">
    <div class="section-header">
      <h2 class="title">What are you looking for?</h2>
      <p class="subtitle">Select a category to find your perfect photographer</p>
      
      <div class="search-bar-wrapper">
        <SearchBar />
      </div>
    </div>

    <div class="categories-container scrollbar-hide">
      <Card 
        v-for="category in categories" 
        :key="category.name" 
        class="category-card-wrapper"
        :class="{ 'active': isSelected(category.name) }"
        @click="handleCategoryClick(category.name)"
        v-ripple
      >
        <template #header>
          <div class="category-card-inner">
            <div class="image-container">
              <img :src="category.image" :alt="category.name" class="category-img" loading="lazy" />
              <div class="glass-overlay">
                <span class="category-name">{{ category.name }}</span>
              </div>
            </div>
            <div class="active-indicator"></div>
          </div>
        </template>
      </Card>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import AuthService from '@/services/AuthService';
import Api from '@/services/Api';
import { useStore } from 'vuex';
import SearchBar from './SearchBar.vue';

const store = useStore();

const getImageUrl = (name) => {
  return new URL(`../assets/images/categories/${name}`, import.meta.url).href;
};

const categories = [
  { name: 'All', image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1074&auto=format&fit=crop' },
  { name: 'Weddings', image: getImageUrl('wedding.jpg') },
  { name: 'Portraits', image: getImageUrl('portrait.jpg') },
  { name: 'Events', image: getImageUrl('event.jpg') },
  { name: 'Real Estate', image: getImageUrl('real-estate.jpg') },
  { name: 'Products', image: getImageUrl('product.jpg') },
  { name: 'Fashion', image: getImageUrl('fashion.jpg') },
];

const selectedCategory = computed(() => store.getters.selectedCategory);

const isSelected = (name) => {
  if (name === 'All') return !selectedCategory.value || selectedCategory.value === 'All';
  return selectedCategory.value === name || selectedCategory.value === name.replace(/s$/, '');
};

const handleCategoryClick = async (categoryName) => {
  try {
    const filterName = categoryName === 'All' ? '' : categoryName.replace(/s$/, '');
    store.commit('setSelectedCategory', filterName);
    
    let response;
    if (!filterName) {
      response = await Api().get(`/customer/getPhotographersIndex/0/10`);
    } else {
      response = await AuthService.searchByCategory(filterName, 0, 10);
    }

    store.commit('setPhotographers', response.data.content);
    store.commit('setTotalPhotographers', response.data.totalElements);
    store.commit('setPhotographersPage', 0);
    store.commit('setPhotographersPageSize', 10);
    
    // Smooth scroll to the photographer list
    setTimeout(() => {
      document.querySelector('.photographers-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  } catch (error) {
    console.error('Error filtering by category:', error);
  }
};
</script>

<style scoped>
.category-section {
  padding: 4rem 2rem;
  background: #fafafa;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
}

.search-bar-wrapper {
  max-width: 600px;
  margin: 2.5rem auto 0;
  padding: 0 1rem;
  transition: all 0.3s ease;
}

.search-bar-wrapper:focus-within {
  transform: translateY(-2px);
}

.categories-container {
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  padding: 1rem 1.5rem 2.5rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

/* Ensure cards don't wrap and have consistent size on mobile */
.category-card-wrapper {
  flex: 0 0 160px;
  scroll-snap-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
}

:deep(.p-card-body), :deep(.p-card-content) {
  padding: 0 !important;
}

@media (min-width: 1024px) {
  .categories-container {
    justify-content: center;
    flex-wrap: wrap;
    overflow-x: hidden;
  }
}

.category-card-inner {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 1/1; /* Square cards on mobile/strip */
  background: #fff;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
}

@media (min-width: 768px) {
  .category-card-inner {
    aspect-ratio: 4/5;
  }
  .category-card-wrapper {
    flex: 0 0 180px;
  }
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.category-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.glass-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4)35%, rgba(0,0,0,0) 65%);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 1.25rem;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  /* Smooth out the blur edge */
  mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 100%);
}

.category-name {
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
}

.active-indicator {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 12px;
  height: 12px;
  background: #ff4757;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 15px rgba(255, 71, 87, 0.6);
  opacity: 0;
  transform: scale(0);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 10;
}

/* Hover & Active States */
.category-card-wrapper:hover .category-img {
  transform: scale(1.1);
}

.category-card-wrapper.active .active-indicator {
  opacity: 1;
  transform: scale(1);
}

.category-card-wrapper.active .category-card-inner {
  outline: 3px solid #ff4757;
  box-shadow: 0 20px 40px rgba(255, 71, 87, 0.15);
}

.category-card-wrapper.active .category-name {
  color: #1a1a1a;
  background: rgba(255, 255, 255, 0.9);
  padding: 6px 14px;
  border-radius: 12px;
  font-weight: 800;
}

.category-card-wrapper.active .glass-overlay {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}

/* Hide scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@media (max-width: 768px) {
  .category-section {
    padding: 2.5rem 0;
  }
  .section-header {
    padding: 0 1.5rem;
    margin-bottom: 1.5rem;
  }
  .title {
    font-size: 1.75rem;
  }
  .subtitle {
    font-size: 0.95rem;
  }
}
</style>
