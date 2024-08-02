<template>
    <div class="card">
        <Fieldset>
            <template #legend>
                <div style="display: flex; align-items: center; gap: 5px">
                    <Avatar image="/CaptureNow.svg" shape="circle" />
                    <span style="font-weight: bold;">Amy Elsner</span>
                </div>
            </template>
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
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
        
        async getBookingData(store){
            const response = await AuthService.getBookings(this.user, store.state.token);
            console.log(response.data);
        }
    },
    mounted() {
        const store = useStore();
        this.getBookingData(store);
    }
}
</script>
