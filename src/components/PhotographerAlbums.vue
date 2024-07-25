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
        <h3 v-if="images.length === 0">No Albums to Display!</h3>
        <!-- <ProgressSpinner v-if="isLoading"/> -->
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
import { ref, watch } from 'vue';

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
        const responsiveOptions = [
            { breakpoint: '1024px', numVisible: 5 },
            { breakpoint: '768px', numVisible: 3 },
            { breakpoint: '560px', numVisible: 1 }
        ];
        
        const loadAlbums = async () => {
            try {
                const offset = page.value * pageSize.value;
                const response = await AuthService.loadAlbums(props.photographer_id, store.state.token, offset, pageSize.value);
                images.value = response.data.content; // Assuming response.data contains the image array
                totalPhotographers.value = response.data.totalElements;
            } catch (error) {
                console.error('Error loading albums:', error);
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

        watch(() => props.photographer_id, loadAlbums, { immediate: true });
        watch([page, pageSize], loadAlbums);

        return {
            images,
            activeIndex,
            displayCustom,
            responsiveOptions,
            page,
            pageSize,
            totalPhotographers,
            imageClick,
            onPageChange
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
