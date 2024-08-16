<template>
    <div class="loading-container ">
        <div class="card flex justify-center">
            <ProgressSpinner />
        </div>

        <l-infinity size="55" stroke="4" stroke-length="0.15" bg-opacity="0.1" speed="1.3" color="black"></l-infinity>

    </div>
</template>

<script>




// Default values shown

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