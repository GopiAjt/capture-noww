<template>
    <div class="card" style="display: flex; flex-direction: column;">
        <AutoComplete v-model="selectedCountry" multiple fluidtiple optionLabel="name" :suggestions="filteredCountries"
            @complete="search" />
    </div>
</template>

<script>
import { CategoryService } from '@/services/CategoryService';

export default {
    data() {
        return {
            countries: null,
            selectedCountry: null,
            filteredCountries: null
        };
    },
    mounted() {
        CategoryService.getCategories().then((data) => (this.countries = data));
    },
    methods: {
        search(event) {
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.filteredCountries = [...this.countries];
                } else {
                    this.filteredCountries = this.countries.filter((country) => {
                        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                    });
                }
            }, 250);
        }
    }
};
</script>