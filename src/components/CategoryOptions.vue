<template>
  <section class="category-section">
    <div class="section-header">
      <h2 class="title">What are you looking for?</h2>
      <p class="subtitle">Select a category to find your perfect photographer</p>
    </div>

    <div class="categories-container scrollbar-hide">
      <div 
        v-for="category in categories" 
        :key="category.name" 
        class="category-card-wrapper"
        :class="{ 'active': isSelected(category.name) }"
        @click="handleCategoryClick(category.name)"
      >
        <div class="category-card-inner">
          <div class="image-container">
            <img :src="category.image" :alt="category.name" class="category-img" loading="lazy" />
            <div class="glass-overlay">
              <span class="category-name">{{ category.name }}</span>
            </div>
          </div>
          <div class="active-indicator"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import AuthService from '@/services/AuthService';
import Api from '@/services/Api';
import { useStore } from 'vuex';

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

.categories-container {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 1rem 0.5rem 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.category-card-wrapper {
  flex: 0 0 auto;
  width: 180px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.category-card-inner {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 4/5;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
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
  padding: 1.5rem 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.category-name {
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
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
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s ease;
}

/* Hover Effects */
.category-card-wrapper:hover {
  transform: translateY(-10px);
}

.category-card-wrapper:hover .category-img {
  transform: scale(1.1);
}

/* Active State */
.category-card-wrapper.active {
  transform: translateY(-5px);
}

.category-card-wrapper.active .category-card-inner {
  box-shadow: 0 15px 35px rgba(255, 71, 87, 0.2);
  outline: 3px solid #ff4757;
}

.category-card-wrapper.active .active-indicator {
  opacity: 1;
  transform: scale(1);
}

.category-card-wrapper.active .category-name {
  color: #ff4757;
  text-shadow: none;
  background: white;
  padding: 2px 10px;
  border-radius: 8px;
}

.category-card-wrapper.active .glass-overlay {
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(5px);
}

/* Scrollbar Utility */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@media (max-width: 768px) {
  .categories-container {
    justify-content: flex-start;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .category-card-wrapper {
    width: 140px;
  }
  
  .title {
    font-size: 2rem;
  }
}
</style>
