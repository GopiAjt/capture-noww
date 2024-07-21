<template>
    <div class="card" v-for="review in reviews" :key="index">
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

export default {
    props: {
        photographer_id: {
            type: String,
            required: true
        }
    },
    methods: {
        async loadReview() {
            const response = await AuthService.loadReviews(this.photographer_id, this.$store.state.token);
            this.reviews = response.data;
            console.log(response.data);
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }
    },
    mounted() {
        this.loadReview();
    },
    data() {
        return {
            reviews: null
        }
    }
};
</script>

<style scoped>
.p-panel-header{
    justify-content: flex-start;
}
</style>