<template>
    <div v-if="!bookings || bookings.length === 0" style="text-align: center;">
        <h3>You Don't Have Any Bookings Found!</h3>
    </div>
    <div class="card" v-for="b in bookings" :key="b.bookingId">
        <Fieldset>
            <template #legend>
                <div style="display: flex; align-items: center; gap: 5px">
                    <Avatar image="/default_profile.png" shape="circle" />
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
                <Button label="Cancel" @click="confirmCancel($event, b.bookingId)" text raised />
            </div>
        </Fieldset>
    </div>
    <ConfirmDialog></ConfirmDialog>
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
    computed: {
        store() {
            return useStore();
        }
    },
    methods: {
        async getBookingData() {
            try {
                const response = await AuthService.getBookings(this.user, this.store.state.token);
                this.bookings = response.data;
                console.log(response.data);
                
            } catch (error) {
                console.error('Error fetching bookings:', error);
                this.$toast.add({ severity: 'error', summary: 'Failed to load bookings', life: 3000 });
            }
        },
        confirmCancel(event, bookingId) {
            this.$confirm.require({
                target: event.currentTarget,
                message: 'Do you want to cancel this booking?',
                icon: 'pi pi-info-circle',
                position: 'bottom',
                rejectProps: {
                    label: 'No',
                    severity: 'secondary',
                    outlined: true
                },
                acceptProps: {
                    label: 'Yes',
                    severity: 'danger',
                    outlined: true
                },
                accept: async () => {
                    await this.cancelBooking(bookingId);
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Cancelled', detail: 'You rejected the cancellation', life: 3000 });
                }
            });
        },
        async cancelBooking(bookingId) {
            try {
                await AuthService.cancelBooking(bookingId, this.store.state.token);
                this.getBookingData(); // Refresh bookings after cancellation
                this.$toast.add({ severity: 'success', summary: 'Cancelled', detail: 'Booking has been cancelled', life: 3000 });
            } catch (error) {
                console.error('Error cancelling booking:', error);
                this.$toast.add({ severity: 'error', summary: 'Failed', detail: 'Failed to cancel booking', life: 3000 });
            }
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
        this.getBookingData();
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