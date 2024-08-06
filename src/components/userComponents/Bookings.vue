<template>
    <div v-if="!bookings" style="text-align: center;">
        <h3>You Don't Have Any Bookings Found!</h3>
    </div>
    <div class="card" v-for="b in bookings" :key="b.bookingId">
        <Fieldset>
            <template #legend>
                <div style="display: flex; align-items: center; gap: 5px">
                    <Avatar image="/CaptureNow.svg" shape="circle" />
                    <span style="font-weight: bold;">{{ b.photographerName }}</span>
                </div>
            </template>
            <div class="b-header">
                <p style="font-weight: bold;">{{ b.bookedPackage.category }}</p>
                <h5>{{ HelperService.formatDateTime(b.bookedDateTime) }}</h5>
                <Tag :severity="getSeverity(b.status)" :value="b.status" rounded></Tag>
            </div>
            <Accordion value="0">
                <AccordionPanel>
                    <AccordionHeader>package details</AccordionHeader>
                    <AccordionContent>
                        <p class="m-0" v-html="HelperService.addLineBreaks(b.bookedPackage.description)"></p>

                        <br>
                        <div style="display: flex; justify-content: space-between;">
                            <p>Event Price: {{ b.bookedPackage.eventRate }}</p>
                            <p>Video Price: {{ b.bookedPackage.videoRate }}</p>
                        </div>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
            <div style="display: flex; justify-content: space-between;">
                <h5>From: {{ HelperService.formatDateTime(b.startDate) }}</h5>
                <h5>Till: {{ HelperService.formatDateTime(b.endDate) }}</h5>
            </div>
            <br>
            <div style="display: flex; gap: 2rem;">
                <Button label="Pay" fluid outlined></Button>
                <Button label="cancel" @click="cancelBooking(b.bookingId)" text raised></Button>
            </div>

        </Fieldset>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import { useStore } from 'vuex';
import HelperService from '@/services/HelperService';
import store from '@/stores/store';

export default {
    props: {
        user: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            bookings: [],
            HelperService
        }
    },
    methods: {
        async getBookingData(store) {
            console.log(HelperService, HelperService.formatDateTime);
            const response = await AuthService.getBookings(this.user, store.state.token);
            console.log(response.data);
            this.bookings = response.data;
        },
        async cancelBooking(bookingId) {
            console.log("canceled");
            const respose = await AuthService.cancelBooking(bookingId, this.$store.state.token);
            console.log(respose);
            this.getBookingData(store);
        },
        getSeverity(status) {
            switch (status) {
                case 'Created':
                    return 'Contrast'
                case 'Accepted':
                    return 'success';
                case 'Pending':
                    return 'warning';
                case 'Rejected':
                    return 'danger';
                default:
                    return 'secondary';
            }
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