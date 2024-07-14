<template>
    <div class="card">
        <Toolbar>
            <template #start>
                <img src="/src/assets/images/CaptureNow.png" alt="CaptureNoww" width="50px" @click="navigateTo('/')">
            </template>

            <template #center>
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText placeholder="Search" size="small"/>
                </IconField>
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
    padding-left: 4vw;
    padding-right: 4vw;
}

.card {
    padding: 10px;
}
.p-button{
    width: 30px;
}
.p-iconfield{
    width: 20px;
}
@media (max-width: 390px) {
    img {
        width: 3vw;
    }
}
</style>