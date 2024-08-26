<template>
    <div class="review-container">
        <label for="exampleFormControlTextarea1" class="form-label" style="font-weight: 500;">Add
            Review
        </label>
        <div class="card flex justify-center">
            <Rating v-model="rating" style="font-size: 1.5rem;" />
        </div>
        <Textarea v-model="comment" autoResize rows="5" cols="40" class="responsive-textarea" fluid />
        <Button label="Submit" text raised @click="addReview" />
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
    data() {
        return {
            rating: null,
            comment: ''
        };
    },
    methods: {
        async addReview() {
            const response = await AuthService.addReview(this.$store.state.user.email, this.photographer_id, this.rating, this.comment, this.$store.state.token);
            console.log(response);
            if (response.status == 201) {
                this.$toast.add({ severity: 'success', summary: 'Review Added!', detail: '', life: 3000 });
                this.$emit('reloadReviews'); // Emit event to parent
            }
        }
    },
    mounted() {

    }
};
</script>

<style scoped>
.review-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-left: 10px;
    padding-right: 10px;
}

.responsive-textarea {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
}
</style>