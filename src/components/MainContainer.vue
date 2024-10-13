<template>
    <div>
        <div v-if="photographers" class="card">
            <Card v-for="photographer in photographers" :key="photographer.id">
                <template #header>
                    <div class="header-img">
                        <img :src="photographer.profilePhoto ? `data:image/jpeg;base64,${photographer.profilePhoto}` : '/default_profile.png'"
                            class="card-img-top" alt="Photographer Image" @click="photographerProfile(photographer.id)"
                            style="cursor: pointer;" />
                    </div>
                </template>
                <template #title>
                    <div class="card-info-style">
                        <i class="pi pi-user" style="font-size: 1rem"></i>
                        <h3 @click.prevent="photographerProfile(photographer.id)"
                            style="cursor: pointer; font-weight: bold;">{{ photographer.name }}
                        </h3>
                    </div>

                    <div class="rating-div">
                        <i class="pi pi-star-fill" style="font-size: 1.5rem; color: yellow; margin-right: 5px;"></i>
                        {{ photographer.avgRating }}
                    </div>
                </template>
                <template #subtitle>
                    <div class="card-info-style"><i class="pi pi-face-smile" style="font-size: 1rem"></i>
                        {{ photographer.experience }}
                    </div>
                </template>
                <template #content>
                    <div class="card-info-style"><i class="pi pi-map-marker" style="font-size: 1rem"></i> {{
                        photographer.serviceLocation }}</div>
                    <div class="card-info-style"><i class="pi pi-camera" style="font-size: 1rem"></i> {{
                        photographer.services }}</div>
                    <div class="card-info-style"><i class="pi pi-language" style="font-size: 1rem"></i> {{
                        photographer.languages }}</div>
                </template>
                <template #footer>
                    <div class="footer-div">
                        <div class="price-range">Starts with: {{ photographer.startsWith }}</div>
                        <Button label="Book Me" class="p-button-sm p-button-dark" @click="bookMe(photographer.id)"
                            raised outlined />
                    </div>
                </template>
            </Card>
        </div>
        <div style="display: flex; justify-content: center;">
            <ProgressSpinner v-if="isLoading" />
        </div>
        <div>
            <Paginator :rows="pageSize" :totalRecords="totalPhotographers" :rowsPerPageOptions="[10, 20, 30]"
                @page="onPageChange">
            </Paginator>
        </div>
    </div>
    <div class="card flex justify-center">
        <Drawer v-model:visible="visible" header="Drawer" position="full" style="height: auto">
            <template #header>
                <h3>Select Package</h3>
            </template>
            <div v-if="!packages || packages.length === 0">
                <p>No Packages Found!</p>
            </div>
            <Accordion :value="activeAccordion" @change="handleAccordionChange">
                <AccordionPanel v-for="p in packages" :key="p.id">
                    <AccordionHeader>{{ p.category }}
                        <RadioButton v-model="selectedPackage" :value="p.id" />
                    </AccordionHeader>

                    <AccordionContent>
                        <h3>{{ p.packageName }}</h3>
                        <span>Description: </span>
                        <p class="m-0" v-html="HelperService.addLineBreaks(p.description)"></p>
                        <br>
                        <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                            <p>Event Price: {{ p.eventRate }}</p>
                            <p>Video Price: {{ p.videoRate }}</p>
                            <p>One Day Price: {{ p.oneDayRate }}</p>
                            <p>One Hour Price: {{ p.oneHourRate }}</p>
                        </div>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>

            <Booking :package="selectedPackage" :photographer_id="photographer_id" />
        </Drawer>
    </div>
    <Toast position="bottom-center" />
</template>

<script>
import Api from '@/services/Api';
import Booking from '@/components/Booking.vue';
import AuthService from '@/services/AuthService';
import HelperService from '@/services/HelperService';
import { mapMutations, mapGetters } from 'vuex';

export default {
    data() {
        return {
            visible: false,
            totalPhotographers: 0,
            error: null,
            page: 0,
            pageSize: 10,
            isLoading: false,
            packages: [],
            HelperService,
            selectedPackage: null,
            photographer_id: null,
            activeAccordion: null,
        };
    },
    components: {
        Booking
    },
    computed: {
        ...mapGetters(['allPhotographers', 'photographersPage', 'photographersPageSize']),
        photographers() {
            return this.allPhotographers; // Use the getter to get photographers from Vuex state
        },
    },
    mounted() {
        if (!this.photographers.length || this.page !== this.photographersPage || this.pageSize !== this.photographersPageSize) {
            this.fetchPhotographers(this.page, this.pageSize);
        } else {
            this.totalPhotographers = this.photographers.length;
        }
    },
    methods: {
        ...mapMutations(['setPhotographers', 'setPhotographersPage', 'setPhotographersPageSize']),
        async fetchPhotographers(page, pageSize) {
            try {
                this.isLoading = true;
                const offset = page * pageSize;
                const response = await Api().get(`/customer/getPhotographersIndex/${offset}/${pageSize}`);

                this.setPhotographers(response.data.content); // Store fetched photographers in Vuex
                this.totalPhotographers = response.data.totalElements;
                this.setPhotographersPage(page); // Store current page in Vuex
                this.setPhotographersPageSize(pageSize); // Store page size in Vuex
                this.isLoading = false;
            } catch (error) {
                console.error('Error fetching photographers:', error);
                this.error = 'Failed to load photographers';
                this.isLoading = false;
            }
        },
        photographerProfile(id) {
            if (this.$store.state.isLogedIn) {
                this.$router.push(`/photorapherProfile/${id}`);
            } else {
                this.$toast.add({ severity: 'error', summary: 'Please Login!', life: 3000 });
            }
        },
        async bookMe(id) {
            if (this.$store.state.isLogedIn) {
                this.visible = true;
                try {
                    this.photographer_id = id;
                    const response = await AuthService.getPackages(id, this.$store.state.token);
                    if (response.status === 200) {
                        this.packages = response.data;
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                this.$toast.add({ severity: 'error', summary: 'Please Login!', life: 3000 });
            }
        },
        onPageChange(event) {
            this.page = event.page;
            this.pageSize = event.rows;
            this.fetchPhotographers(this.page, this.pageSize);
        },
        handleAccordionChange(index) {
            // Toggle the accordion: open if closed, close if open
            this.activeAccordion = this.activeAccordion === index ? null : index;
        }
    },
    watch: {
        selectedPackage(newPackage) {
            console.log('Selected Package ID:', newPackage);
        }
    }
};
</script>


<style scoped>
#s-p {
    width: 100%;
    height: 100px;
}

.card-info-style {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.card {
    padding-top: 5%;
    padding-bottom: 5%;
    padding-left: 15vw;
    padding-right: 15vw;
}

.p-card {
    flex-direction: row;
    width: 100%;
    overflow: hidden;
    margin-bottom: 5%;
}

.footer-div {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-img {
    display: grid;
    justify-content: center;
}

img {
    width: 15vw;
}

@media (max-width: 575px) {
    img {
        width: 70vw;
        padding: 10px;
    }

    .p-card {
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
        margin-bottom: 20px;
        align-items: center;
    }

    .card {
        padding-top: 5%;
        padding-bottom: 5%;
        padding-left: 15px;
        padding-right: 15px;
    }
}
</style>
<style>
.p-drawer-content {
    padding: 5% 5%;
    justify-content: space-between;
}
</style>