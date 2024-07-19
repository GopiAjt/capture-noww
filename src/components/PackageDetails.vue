<template>
    <Card v-for="packages in packageDetails" :key="packages.id">
        <template #title>{{ packages.packageName }}</template>
        <template #content>
            <p>{{ packages.description }}</p>
            <ul>
                <li>Category: {{ packages.category }}</li>
                <li>Event Rate: {{ packages.eventRate }}</li>
                <li>One Day Rate: {{ packages.oneDayRate }}</li>
                <li>One Hour Rate: {{ packages.oneHourRate }}</li>
                <li>Video Rate: {{ packages.videoRate }}</li>
            </ul>
            <p>Contact us for more information!</p>
        </template>
    </Card>
</template>

<script>
export default {
    props: {
        packageDetails: {
            type: Array,
            required: true
        }
    }
}

</script>

<style scoped>
/* Add your styles here */
</style>