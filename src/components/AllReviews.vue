<template>
    <div class="card" v-for="(review, index) in reviews" :key="index">
        <Panel>
            <div  style="display: flex; justify-content: space-between;" >
                <div style="display: flex; gap: 10px;">
                    <Avatar image="/CaptureNowLogo.svg" size="large" shape="circle" />
                    <div style="display: flex; flex-direction: column;">
                        <span class="font-bold">{{ review.customerName }}</span>
                        <p style="font-size: smaller;">{{ formatDate(review.ratingDate) }}</p>
                    </div>
                </div>
                <div class="rating-div">
                    <i class="pi pi-star-fill" style="font-size: 1.5rem; color: yellow; margin-right: 5px;"></i> {{ review.rating }}<br>
                </div>
            </div>

            <p class="m-0">
                <strong> </strong> {{ review.comment || 'No comment provided' }}<br>
            </p>
        </Panel>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import { watch, ref } from 'vue';
import { useStore } from 'vuex';

export default {
    props: {
        p_id: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const reviews = ref(null);
        const store = useStore(); // Access Vuex store

        const loadReview = async () => {
            if (props.p_id) {
                try {
                    const response = await AuthService.loadReviews(props.p_id, store.state.token); // Use store.state.token
                    reviews.value = response.data;
                    console.log(response.data);
                } catch (error) {
                    console.error('Error loading reviews:', error);
                }
            }
        };

        const formatDate = (dateString) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        };

        watch(() => props.p_id, loadReview, { immediate: true });

        return {
            reviews,
            formatDate
        };
    }
};
</script>

<style >
.p-panel-header {
    padding: 1%;
}
</style>
