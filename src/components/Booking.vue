<template>
    <div class="card flex flex-wrap gap-4">
        <div class="flex-auto">
            <label for="datepicker-24h" class="font-bold block mb-2"> 24h Format </label>
            <DatePicker id="datepicker-24h" v-model="datetime24h" showTime hourFormat="24"  />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            datetime24h: null
        };
    }
};
</script>
