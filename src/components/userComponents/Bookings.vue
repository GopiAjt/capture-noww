<template>
    <div class="card" v-for="b in bookings">
        <Fieldset>
            <template #legend>
                <div style="display: flex; align-items: center; gap: 5px">
                    <Avatar image="/CaptureNow.svg" shape="circle" />
                    <span style="font-weight: bold;">{{ b.photographerName }}</span>
                </div>
            </template>
            <div class="b-header">
                <p style="font-weight: bold;">{{ b.bookedPackage.category }}</p>
                <p>{{ b.bookedDateTime }}</p>
            </div>
            <Accordion value="0">
                <AccordionPanel value="0">
                    <AccordionHeader>package details</AccordionHeader>
                    <AccordionContent>
                        <p class="m-0">{{ b.bookedPackage.description }}</p>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
            <Tag value="created" rounded></Tag>
        </Fieldset>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import { useStore } from 'vuex';

export default {
    props: {
        user: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            bookings: null
        }
    },
    methods: {

        async getBookingData(store) {
            const response = await AuthService.getBookings(this.user, store.state.token);
            console.log(response.data);
            this.bookings = response.data;
        }
    },
    mounted() {
        const store = useStore();
        this.getBookingData(store);
    }
}
</script>

<style scoped>
.b-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>