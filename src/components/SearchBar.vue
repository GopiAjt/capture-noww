<template>
    <div class="search-container">
        <IconField class="w-full">
            <InputIcon class="pi pi-search" />
            <AutoComplete 
                v-model="selectedCountry" 
                multiple 
                fluid 
                optionLabel="name" 
                :suggestions="filteredCountries"
                @keydown.enter="logSelectedCountry" 
                @complete="search" 
                placeholder="Search by category (Wedding, Food...)"
                class="w-full"
            />
        </IconField>
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
    padding: 0 1rem;
}

:deep(.p-iconfield) {
    width: 100%;
    max-width: 600px;
}

:deep(.p-inputtext) {
    padding: 0.8rem 1rem 0.8rem 3rem !important;
    border-radius: 50px !important;
    border: 2px solid #f1f1f1 !important;
    transition: all 0.3s ease !important;
    background: #ffffff !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.03) !important;
}

:deep(.p-inputtext:focus) {
    border-color: #ffec00 !important;
    box-shadow: 0 6px 18px rgba(255, 236, 0, 0.15) !important;
    outline: none !important;
}

:deep(.p-inputicon) {
    left: 1.25rem !important;
    color: #1a1a1a !important;
}

:deep(.p-autocomplete-chip-item) {
    background: #ffec00 !important;
    color: #1a1a1a !important;
    border: 1px solid #ffec00 !important;
    border-radius: 12px !important;
    padding: 2px 10px !important;
    font-size: 0.85rem !important;
    font-weight: 700 !important;
}

:deep(.p-autocomplete-chip-item:hover) {
    background: #1a1a1a !important;
    color: #ffec00 !important;
}

@media (max-width: 575px) {
    .search-container {
        padding: 0 0.5rem;
    }
    :deep(.p-inputtext) {
        padding: 0.7rem 1rem 0.7rem 2.5rem !important;
        font-size: 0.95rem !important;
    }
}
</style>
