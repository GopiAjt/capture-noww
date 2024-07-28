<template>
    <div class="card flex flex-wrap gap-4">
        <div class="flex-auto">
            <label for="datepicker-24h" class="font-bold block mb-2"> From </label>
            <DatePicker id="datepicker-24h" v-model="fromDate" showTime hourFormat="24" fluid />
        </div>

        <div class="flex-auto">
            <label for="datepicker-24h" class="font-bold block mb-2"> Till </label>
            <DatePicker id="datepicker-24h" v-model="tillDate" showTime hourFormat="24" fluid />
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            fromDate: null,
            tillDate: null
        };
    }
};
</script>
