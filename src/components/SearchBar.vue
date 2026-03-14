<template>
    <div class="search-container">
        <div class="search-input-group">
            <i class="pi pi-search search-icon"></i>
            <AutoComplete 
                v-model="selectedCountry" 
                multiple 
                fluid 
                optionLabel="name" 
                :suggestions="filteredCountries"
                @keydown.enter="logSelectedCountry" 
                @complete="search" 
                placeholder="Search by category (e.g. Wedding, Food...)"
                class="premium-search"
            />
        </div>
    </div>
</template>

<script>
import { CategoryService } from '@/services/CategoryService';
import AuthService from '@/services/AuthService';
import { mapMutations, mapGetters } from 'vuex';

export default {
    data() {
        return {
            countries: null,
            selectedCountry: null,
            filteredCountries: null
        };
    },
    mounted() {
        CategoryService.getCategories().then((data) => {
            this.countries = data;
        });
    },
    methods: {
        ...mapMutations(['setPhotographers', 'addPhotographer', 'deletePhotographer']),
        search(event) {
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.filteredCountries = [...this.countries];
                } else {
                    this.filteredCountries = this.countries.filter((country) => {
                        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                    });
                }
            }, 0);
        },
        async logSelectedCountry() {
            let searchText = '';
            let offset = 0;
            let pageSize = 10;

            if (this.selectedCountry && this.selectedCountry.length) {
                searchText = this.selectedCountry.map(country => country.name).join(',');
                console.log('Search Text:', searchText);

                const response = await AuthService.searchByCategory(searchText, offset, pageSize);
                console.log('Search Results:', response.data);

                // Store the search results in Vuex
                this.setPhotographers(response.data.content);
                // this.$router.push('/');
            } else {
                console.log("No country selected");
            }
        }
    },
    computed: {
        ...mapGetters(['allPhotographers']),
    },
};
</script>

<style scoped>
.search-container {
    width: 100%;
    display: flex;
    justify-content: center;
}

.search-input-group {
    position: relative;
    display: flex;
    align-items: center;
    background: #ffffff;
    border: 1.5px solid #edf2f7;
    border-radius: 50px;
    padding: 0.6rem 1.75rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.03), 0 10px 30px rgba(0,0,0,0.02);
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    width: 100%;
}

.search-input-group:hover {
    border-color: #e2e8f0;
    box-shadow: 0 8px 25px rgba(0,0,0,0.06);
    transform: translateY(-1px);
}

.search-input-group:focus-within {
    border-color: #ff4757;
    box-shadow: 0 15px 35px rgba(255, 71, 87, 0.12);
    transform: translateY(-2px);
    background: #fff;
}

.search-icon {
    font-size: 1.25rem;
    color: #ff4757;
    margin-right: 1rem;
    transition: transform 0.3s ease;
}

.search-input-group:focus-within .search-icon {
    transform: scale(1.1);
}

:deep(.premium-search) {
    border: none !important;
    background: transparent !important;
    flex-grow: 1;
    width: 100%;
}

:deep(.p-autocomplete-multiple-container) {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    box-shadow: none !important;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
}

:deep(.p-autocomplete-input-chip) {
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
}

:deep(.p-autocomplete-chip-item) {
    background: #fff5f5 !important;
    color: #ff4757 !important;
    border: 1px solid #fed7d7 !important;
    border-radius: 12px !important;
    padding: 2px 10px !important;
    font-size: 0.85rem !important;
    font-weight: 700 !important;
    height: 28px !important;
    transition: all 0.2s ease;
}

:deep(.p-autocomplete-chip-item:hover) {
    background: #feb2b2 !important;
    color: #fff !important;
}

:deep(.p-inputtext) {
    border: none !important;
    box-shadow: none !important;
    font-size: 1.05rem !important;
    padding: 0.4rem 0 !important;
    color: #2d3748;
    font-weight: 500;
}

:deep(.p-inputtext::placeholder) {
    color: #a0aec0;
    font-weight: 400;
}

:deep(.p-inputtext:focus) {
    border: none !important;
    box-shadow: none !important;
}

/* Response for Mobile */
@media (max-width: 575px) {
    .search-input-group {
        padding: 0.5rem 1.25rem;
    }
    
    :deep(.p-inputtext) {
        font-size: 0.95rem !important;
    }
}
</style>
