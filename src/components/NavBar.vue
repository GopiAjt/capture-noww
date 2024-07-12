<template>
    <div class="card">
        <Toolbar>
            <template #start>
                <img src="/src/assets/images/CaptureNow.png" alt="CaptureNoww" width="50px">
            </template>

            <template #center>
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText placeholder="Search" />
                </IconField>
            </template>

            <template #end>
                
            </template>
        </Toolbar>
    </div>
</template>

<script setup>
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
</style>