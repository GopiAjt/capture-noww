<template>
    <div class="nav-card">
        <Toolbar id="blurred-toolbar">
            <template #start>
                <img src="/CaptureNowLogo.svg" alt="CaptureNoww" width="45px" @click="navigateTo('/')"
                    style="cursor: pointer;">
            </template>


            <template #end>
                <!-- <AutoComplete v-model="selectedCountry" optionLabel="name" :suggestions="filteredCountries"
                    @complete="search" fluid size="small" /> -->
                <Button icon="pi pi-search" outlined aria-label="Search" @click="visible = true" fluid></Button>
                <SignupSignin v-if="!$store.state.isLogedIn" />
                <ProfileIcon v-else></ProfileIcon>
            </template>

        </Toolbar>
    </div>
    <Drawer v-model:visible="visible" header="Search" position="full">
        <SearchBar></SearchBar>
    </Drawer>
</template>

<script setup>
import SignupSignin from '@/components/SignupSigninPopup.vue'
import ProfileIcon from './ProfileIcon.vue';
import { CategoryService } from "@/services/CategoryService";
import SearchBar from './SearchBar.vue';

</script>
<script>
export default {
    data() {
        return {
            categories: [], // Initialize as an empty array
            selectedCountry: null,
            filteredCountries: null,
            visible: false
        };
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        search(event) {
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.filteredCountries = [...this.categories];
                } else if (this.categories && this.categories.length) {
                    this.filteredCountries = this.categories.filter((country) => {
                        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                    });
                } else {
                    this.filteredCountries = [];
                }
            }, 250);
        },
        mounted() {
            CategoryService.getCategories().then((data) => (this.categories = data));
        },
    }
}
</script>

<style scoped>
#blurred-toolbar {
    background-color: rgba(255, 255, 0, 0.234);
    padding: 5px;
    padding-left: 10vw;
    padding-right: 10vw;
    width: 100%;
    backdrop-filter: blur(8px);
    position: relative;
}

.nav-card {
    padding: 10px;
}

.p-button {
    width: 30px;
}

.p-iconfield {
    width: 20px;
}

@media (max-width: 575px) {
    #blurred-toolbar {
        background-color: rgba(255, 255, 0, 0.316);
        padding: 5px;
        padding-left: 2vw;
        padding-right: 2vw;
        width: 100%;
        backdrop-filter: blur(5px);
    }
}
</style>
<style>
.p-toolbar-end {
    gap: 20px;
}
</style>