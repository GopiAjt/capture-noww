<template>
    <div>
        <div v-if="packageDetails.length == 0" style="display: flex; justify-content: center;">
            <h3>No Packages Found!</h3>
        </div>
        <div class="card" v-for="packages in packageDetails" :key="packages.id">
            <Panel>
                <template #header>
                    <strong style="font-weight: bold;">{{ packages.packageName }}</strong>
                </template>
                <strong style="font-weight: 500;">Description:</strong><br>
                <pre class="formatted-text-display">{{ packages.description }}</pre>
                <br>
                <div class="p-footer">
                    <p>
                        <strong>Event Price:</strong> {{ packages.eventRate }}
                    </p>
                    <p>
                        <strong>One Day Price:</strong> {{ packages.oneDayRate }}
                    </p>
                    <p>
                        <strong>One Hour Price:</strong> {{ packages.oneHourRate }}
                    </p>
                    <p>
                        <strong>Video Price:</strong> {{ packages.videoRate }}
                    </p>
                </div>
                <template #footer>
                    <div class="p-footer">
                        <p>
                            <strong>Total Price:</strong> {{ packages.eventRate + 100 }}
                        </p>
                        <Button label="Book" class="p-button-sm p-button-dark" @click="bookDrawer(packages.id)" raised
                            outlined />
                    </div>
                </template>
            </Panel>
        </div>
    </div>
    <div class="card flex justify-center">
        <Drawer v-model:visible="visible" header="Drawer" position="bottom" style="height: auto">
            <template #header>
                <h3>Book Package</h3>
            </template>
            <Booking :package="selectedPackage" :photographer_id="photographer_id" />
        </Drawer>
    </div>
</template>

<script>
import Booking from '@/components/Booking.vue';
// import { ref } from 'vue';
import HelperService from '@/services/HelperService';

export default {
    props: {
        packageDetails: {
            type: Array,
            required: true
        },
        photographer_id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            visible: false,
            selectedPackage: null,
            HelperService
        }
    },
    components: {
        Booking
    },
    methods: {
        bookDrawer(packageId) {
            this.visible = true;
            this.selectedPackage = packageId;
            console.log(this.selectedPackage);
            console.log(this.packageDetails.id);
        }
    }
};
</script>

<style scoped>
.p-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.formatted-text-display {
    white-space: pre-wrap;
    /* This will ensure text wraps within the container */
    word-wrap: break-word;
    /* This ensures long words break and wrap */
    width: 100%;
    /* Ensure the text stays within the container width */
    overflow-wrap: break-word;
    /* Fallback for older browsers */
}

@media (max-width: 575px) {
    .p-footer {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
    }
}
</style>