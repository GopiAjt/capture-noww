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

                <p class="m-0">
                    <strong style="font-weight: 500;">Description:</strong><br>{{ packages.description }}
                </p>
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
                        <Button label="Book" class="p-button-sm p-button-dark" @click="bookDrawer(packages.id)" raised outlined />
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
            <Booking :package="selectedPackage" />
        </Drawer>
    </div>
</template>

<script>
import Booking from '@/components/Booking.vue';
import { ref } from 'vue';

export default {
    props: {
        packageDetails: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            visible: false,
            selectedPackage: null
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

@media (max-width: 575px) {
    .p-footer {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
    }
}
</style>