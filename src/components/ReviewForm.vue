<template>
    <div class="review-container">
        <center>
            <label for="exampleFormControlTextarea1" class="form-label" style="font-weight: 500;">Add
                Review
            </label>
        </center>
        <div class="card flex justify-center">
            <Rating v-model="rating" />
        </div>
        <div class="card flex justify-center">
            <Textarea v-model="comment" autoResize rows="5" cols="80" />
        </div>
        <Button label="Submit" text raised @click="addReview" />
    </div>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
    props: {
        p_id: {
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
            const response = await AuthService.addReview(this.$store.state.user.email, this.p_id, this.rating, this.comment, this.$store.state.token);
            console.log(response);
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
}
</style>