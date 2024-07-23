<template>
    <div class="card" v-for="(review, index) in reviews" :key="index">
        <Panel>
            <template #header>
                <Avatar image="/CaptureNowLogo.svg" size="large" shape="circle" />
                <span class="font-bold">{{ review.customerName }}</span>
            </template>

            <p class="m-0">
                <strong>Rating:</strong> {{ review.rating }}<br>
                <strong>Comment:</strong> {{ review.comment || 'No comment provided' }}<br>
                <strong>Date:</strong> {{ formatDate(review.ratingDate) }}
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

<style scoped>
.p-panel-header {
    justify-content: flex-start;
}
</style>
