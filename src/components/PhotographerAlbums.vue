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
        const images = ref(null);
        const activeIndex = ref(0);
        const displayCustom = ref(false);
        const responsiveOptions = [
            { breakpoint: '1024px', numVisible: 5 },
            { breakpoint: '768px', numVisible: 3 },
            { breakpoint: '560px', numVisible: 1 }
        ];

        const loadAlbums = async () => {
            console.log(props.photographer_id);
            try {
                const response = await AuthService.loadAlbums(props.photographer_id, store.state.token);
                images.value = response.data; // Assuming response.data contains the image array
                console.log(response.data);
            } catch (error) {
                console.error('Error loading albums:', error);
            }
        };

        const imageClick = (index) => {
            activeIndex.value = index;
            displayCustom.value = true;
        };

        watch(() => props.photographer_id, loadAlbums, { immediate: true });

        return {
            images,
            activeIndex,
            displayCustom,
            responsiveOptions,
            imageClick
        };
    }
};
</script>

<style scoped>
/* .p-panel-header {
    justify-content: flex-start;
} */
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
