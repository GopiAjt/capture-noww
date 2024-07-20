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
        <Button label="Submit" text raised />
    </div>
</template>

<script>
export default {
    data() {
        return {
            rating: null,
            comment: ''
        };
    },
    methods: {

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