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
                <h5>{{ b.bookedDateTime }}</h5>
                <Tag value="created" rounded></Tag>
            </div>
            <Accordion value="0">
                <AccordionPanel value="0">
                    <AccordionHeader>package details</AccordionHeader>
                    <AccordionContent>
                        <p class="m-0">{{ b.bookedPackage.description }}</p>
                        <br>
                        <div style="display: flex; justify-content: space-between;">
                            <p>Event Price: {{ b.bookedPackage.eventRate }}</p>
                            <p>Video Price: {{ b.bookedPackage.videoRate }}</p>
                        </div>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
            <div style="display: flex; justify-content: space-between;">
                <h5>From: {{ b.startDate }}</h5>
                <h5>Till: {{ b.endDate }}</h5>
            </div>
            <br>
            <div style="display: flex; gap: 2rem;">
                <Button label="Pay" fluid outlined></Button>
                <Button label="cancel" text raised ></Button>
            </div>

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