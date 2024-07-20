<template>
    <div class="nav-card">
        <Toolbar>
            <template #start>
                <img src="/public/CaptureNow.svg" alt="CaptureNoww" width="45px" @click="navigateTo('/')"
                    style="cursor: pointer;">
            </template>

            <template #center>
                <div class="card flex justify-center">
                    <MultiSelect v-model="selectedCities" :options="cities" optionLabel="name" filter
                        placeholder="Select Cities" :maxSelectedLabels="3" class="w-full md:w-80" />
                </div>
            </template>
            <template #end>
                <SignupSignin v-if="!$store.state.isLogedIn" />
                <ProfileIcon v-else></ProfileIcon>
            </template>
        </Toolbar>
    </div>
</template>

<script setup>
import SignupSignin from '@/components/SignupSigninPopup.vue'
import ProfileIcon from './ProfileIcon.vue';
// const items = ref([
//     {
//         label: 'Update',
//         icon: 'pi pi-refresh'
//     },
//     {
//         label: 'Delete',
//         icon: 'pi pi-times'
//     }
// ])
</script>
<script>
export default {
    data() {
        return {
            selectedCities: null,
            cities: [
                { name: 'New York', code: 'NY' },
                { name: 'Rome', code: 'RM' },
                { name: 'London', code: 'LDN' },
                { name: 'Istanbul', code: 'IST' },
                { name: 'Paris', code: 'PRS' }
            ],
            value: null
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        }
    }
}
</script>

<style scoped>
.p-toolbar {
    background-color: yellow;
    padding: 5px;
    padding-left: 10vw;
    padding-right: 10vw;
    width: 100%;
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
    .p-toolbar {
        background-color: yellow;
        padding: 5px;
        padding-left: 2vw;
        padding-right: 2vw;
        width: 100%;
    }
}
</style>