<template>
    <div v-if="isVisible" class="loading-container">
        <div class="card flex justify-center">
            <ProgressSpinner />
        </div>
    </div>
</template>


<script>


export default {
    props: {
        isVisible: {
            type: Boolean,
            required: true
        }
    }
};

// Default values shown

</script>
<style scoped>
.loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9999;
}
</style>
