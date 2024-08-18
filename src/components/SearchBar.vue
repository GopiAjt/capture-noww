<template>
    <div class="card" style="display: flex; flex-direction: column;">
        <AutoComplete v-model="selectedCountry" multiple fluidtiple optionLabel="name" :suggestions="filteredCountries"
            @keydown.enter="logSelectedCountry" @complete="search" />
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
        },
        logSelectedCountry() {
            if (this.selectedCountry) {
                this.selectedCountry.forEach(country => {
                    console.log(country.name); // Or any other property you need
                });
            } else {
                console.log("No country selected");
            }
        }
    }
};
</script>