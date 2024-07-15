<template>
    <div class="card">
        <Toolbar>
            <template #start>
                <img src="/src/assets/images/CaptureNow.png" alt="CaptureNoww" width="50px" @click="navigateTo('/')">
            </template>

            <template #center>
                <div class="card flex justify-center">
                    <MultiSelect v-model="selectedCities" :options="cities" optionLabel="name" filter
                        placeholder="Select Cities" :maxSelectedLabels="3" class="w-full md:w-80" />
                </div>
            </template>
            <template #end>
                <SignupSignin />
            </template>
        </Toolbar>
    </div>
</template>

<script setup>
import SignupSignin from '@/components/SignupSigninPopup.vue'
import { ref } from 'vue';

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
    padding: 1px;
    padding-left: 7vw;
    padding-right: 7vw;
    position: sticky;
    width: 100%;
}

.card {
    padding: 10px;
}

.p-button {
    width: 30px;
}

.p-iconfield {
    width: 20px;
}

@media (max-width: 390px) {
    img {
        width: 3vw;
    }
}
</style>