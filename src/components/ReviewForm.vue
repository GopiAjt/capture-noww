<template>
    <div class="review-container">
        <label for="exampleFormControlTextarea1" class="form-label" style="font-weight: 500;">Add Review</label>

        <Rating v-model="rating" class="custom-rating" />
        <Textarea v-model="comment" autoResize rows="5" cols="40" class="responsive-textarea" fluid />
        <Button label="Submit" text raised @click="validateForm" />
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
        validateForm() {
            let valid = true;
            if (!this.rating) {
                this.$toast.add({ severity: 'error', summary: 'Please select a rating', life: 3000 });
                valid = false;
            }
            if (!this.comment.trim()) {
                this.$toast.add({ severity: 'error', summary: 'Please enter a comment', life: 3000 });
                valid = false;
            }

            if (valid) {
                this.addReview();
            }
        },
        async addReview() {
            const response = await AuthService.addReview(this.$store.state.user.email, this.photographer_id, this.rating, this.comment, this.$store.state.token);
            console.log(response);
            if (response.status == 201) {
                this.$toast.add({ severity: 'success', summary: 'Review Added!', detail: '', life: 3000 });
                this.rating = null;
                this.comment = null;
                this.$emit('reloadReviews'); // Emit event to parent
            }
        }
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

/* Custom styles for the Rating component */
.custom-rating .pi-star {
    font-size: 5rem;
    /* Increase the font size to make stars larger */
}

.custom-rating .pi-star-o {
    font-size: 2rem;
    /* Ensure the outline stars are the same size */
}
</style>
