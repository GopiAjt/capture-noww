<template>
    <div class="card">
        <div class="flex-auto">
            <label for="datepicker-24h" class="font-bold block mb-2"> From </label>
            <DatePicker id="datepicker-24h" v-model="fromDate" showTime hourFormat="24" fluid />
        </div>

        <div class="flex-auto">
            <label for="datepicker-24h" class="font-bold block mb-2"> Till </label>
            <DatePicker id="datepicker-24h" v-model="tillDate" showTime hourFormat="24" fluid />
        </div>
    </div>
    <Button @click="book" label="Book" outlined fluid></Button>
    <Toast position="bottom-center" />
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
    props: {
        package: {
            type: String,
            required: true
        },
        photographer_id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            fromDate: null,
            tillDate: null
        };
    },

    methods: {
        async book() {
            console.log(this.fromDate);
            console.log(this.tillDate);
            console.log(this.package);
            console.log(this.photographer_id);
            console.log(this.$store.state.token);

            try {
                const response = await AuthService.bookPackage(this.fromDate, 
                                                                this.tillDate, 
                                                                this.package,
                                                                this.$store.state.user.email, 
                                                                this.photographer_id, 
                                                                this.$store.state.token);

                this.$toast.add({ severity: 'success', summary: 'Booked successfully!', life: 3000 });
                console.log(response);
            } catch (error) {
                this.$toast.add({ severity: 'error', summary: 'Error! please try again later', life: 3000 });
                console.log(error);
            }

            console.log("booked");
        }
    }
};
</script>
<style scoped>
.card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
}
</style>

<style>
.p-drawer-content {
    padding: 5% 10%;
    display: flex;
    flex-direction: column;
    gap: 40px;
}
</style>