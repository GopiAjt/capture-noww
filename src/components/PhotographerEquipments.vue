<template>
    <div class="album-card">
        <Galleria v-model:activeIndex="activeIndex" v-model:visible="displayCustom" :value="images"
            :responsiveOptions="responsiveOptions" :numVisible="7" containerStyle="max-width: 850px" :circular="true"
            :fullScreen="true" :showItemNavigators="true" :showThumbnails="false">
            <template #item="slotProps">
                <img :src="`data:image/jpeg;base64,${slotProps.item.photo}`" :alt="slotProps.item.name"
                    style="width: 100%; display: block" />
            </template>
            <template #thumbnail="slotProps">
                <img :src="`data:image/jpeg;base64,${slotProps.item.photo}`" :alt="slotProps.item.name"
                    style="display: block; width: 100%;" />
            </template>
        </Galleria>

        <div v-if="images" class="album-images">
            <div v-for="(image, index) in images" :key="index">
                <img :src="`data:image/jpeg;base64,${image.photo}`" :alt="image.name" style="cursor: pointer"
                    @click="imageClick(index)" class="images" />
            </div>
        </div>
    </div>
    <div v-if="images" style="text-align: center;">
        <ProgressSpinner v-if="isLoading" style="width: 50px; height: 50px" 
            strokeWidth="8" fill="transparent"
            animationDuration=".5s" 
            aria-label="Loading.." />
        <h3 v-if="images.length === 0">No Equipments to Display!</h3>
    </div>
    <div class="card">
        <Paginator :rows="pageSize" :totalRecords="totalPhotographers" :rowsPerPageOptions="[10, 20, 30]"
            @page="onPageChange">
        </Paginator>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import { useStore } from 'vuex';
import { ref, watch, onMounted } from 'vue';

export default {
    props: {
        photographer_id: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const store = useStore(); // Access Vuex store
        const images = ref([]);
        const activeIndex = ref(0);
        const displayCustom = ref(false);
        const page = ref(0);
        const pageSize = ref(10);
        const totalPhotographers = ref(0);
        const isLoading = ref(false);
        const responsiveOptions = [
            { breakpoint: '1024px', numVisible: 5 },
            { breakpoint: '768px', numVisible: 3 },
            { breakpoint: '560px', numVisible: 1 }
        ];

        const loadAlbums = async () => {
            try {
                const offset = page.value * pageSize.value;
                const response = await AuthService.loadEquipments(props.photographer_id, store.state.token, offset, pageSize.value);
                images.value = response.data.content; // Assuming response.data contains the image array
                totalPhotographers.value = response.data.totalElements;
                console.log(response);
            } catch (error) {
                console.error('Error loading albums:', error);
            } finally{
                isLoading.value = false;
            }
        };

        const imageClick = (index) => {
            activeIndex.value = index;
            displayCustom.value = true;
        };

        const onPageChange = (event) => {
            page.value = event.page;
            pageSize.value = event.rows;
            loadAlbums();
        };

        // Watch for changes in photographer_id and trigger delayed load
        watch(() => props.photographer_id, () => {
            isLoading.value = true;
            setTimeout(loadAlbums, 5000); // Fetch data after 5 seconds
        }, { immediate: false });
        watch([page, pageSize], loadAlbums);

        // onMounted(() => {
        //     setTimeout(loadAlbums, 10000); // Fetch data once after 5 seconds
        // });

        return {
            images,
            activeIndex,
            displayCustom,
            responsiveOptions,
            page,
            pageSize,
            totalPhotographers,
            imageClick,
            onPageChange,
            isLoading
        };
    }
};
</script>

<style scoped>
.album-card {
    display: flex;
    justify-content: center;
}

.album-images {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    gap: 1.5rem;
}

.images {
    width: 400px;
}

@media (max-width: 575px) {
    .images {
        width: 350px;
    }
}
</style>