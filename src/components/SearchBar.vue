<template>
    <div class="card" style="display: flex; flex-direction: column;">
        <AutoComplete v-model="selectedCountry" multiple fluidtiple optionLabel="name" :suggestions="filteredCountries"
            @keydown.enter="logSelectedCountry" @complete="search" />
    </div>
</template>

<script>
import { CategoryService } from '@/services/CategoryService';
import AuthService from '@/services/AuthService';
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
            }, 0);
        },
        async logSelectedCountry() {
            let searchText; 
            let offset = 0; 
            let pageSize = 10;
            if (this.selectedCountry) {
                let cat;
                this.selectedCountry.forEach(country => {
                    cat = country.name;
                    searchText = country.name;
                });
                console.log(cat);
                const response = await AuthService.searchByCategory(searchText, offset, pageSize);
                console.log(response.data);
                
            } else {
                console.log("No country selected");
            }
        }
    }
};
</script>