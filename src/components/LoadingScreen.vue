<template>
    <div class="loading-container ">
        <div class="card flex justify-center">
            <ProgressSpinner />
        </div>

    </div>
</template>

<script>
</script>
<style scoped>
.loading-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    filter: blur(50%);
    z-index: 9999;
}
</style>