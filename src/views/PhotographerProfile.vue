<template>
    <header>
        <Navbar />
    </header>

    <div class="card-container">
        <Card style="width: 100%; overflow: hidden">
            <template #header class="profile-img">
                <img :src="photographer.profilePhoto ? `data:image/jpeg;base64,${photographer.profilePhoto}` : '../src/assets/images/default_profile.png'"
                    class="card-img-top" alt="Photographer Image" />
            </template>
            <template #title>
                <div class="">
                    <i class="pi pi-user" style="font-size: 1rem"></i> {{ photographer.name }}
                </div>
                <div>
                    <div class="rating-div">
                        <i class="pi pi-star-fill" style="font-size: 1.5rem; color: yellow; margin-right: 5px;"></i>{{
                            photographer.avgRating }}
                    </div>
                </div>
            </template>
            <template #subtitle><i class="pi pi-map-marker" style="font-size: 1rem"></i> {{ photographer.serviceLocation
                }}</template>
            <template #content>
                <p class="m-0">
                    <strong><i class="pi pi-face-smile" style="font-size: 1rem"></i></strong> {{ photographer.experience
                    }} year(s)
                </p>
                <p class="m-0">
                    <strong><i class="pi pi-language" style="font-size: 1rem"></i></strong> {{ photographer.languages }}
                </p>
                <p class="m-0">
                    <strong><i class="pi pi-camera" style="font-size: 1rem"></i></strong> {{ photographer.services }}
                </p>
                <p class="m-0">
                    <i class="pi pi-info-circle" style="font-size: 1rem"></i> {{ photographer.aboutMe }}
                </p>
            </template>
            <template #footer>

            </template>
        </Card>
    </div>

    <div class="card">
        <Tabs v-model:value="activeTab">
            <TabList>
                <Tab value="Albums"><i class="pi pi-images" style="font-size: 1rem"></i><span style="font-weight: bold; font-size: smaller;">Albums</span></Tab>
                <Tab value="Packages"><i class="pi pi-list-check" style="font-size: 1rem"></i><span style="font-weight: bold; font-size: smaller;">Packages</span></Tab>
                <Tab value="Equipments"><i class="pi pi-briefcase" style="font-size: 1rem"></i><span style="font-weight: bold; font-size: smaller;">Equipments</span></Tab>
                <Tab value="Reviews"><i class="pi pi-star" style="font-size: 1rem"></i><span style="font-weight: bold; font-size: smaller;">Reviews</span></Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="Albums">
                    <PhotographerAlbums :photographer_id="photographer.pid" />
                </TabPanel>
                <TabPanel value="Packages">
                    <PackageDetails :packageDetails="package" :photographer_id="photographer.pid"  />
                </TabPanel>
                <TabPanel value="Equipments">
                    <PhotographerEquipments :photographer_id="photographer.pid"/>
                </TabPanel>
                <TabPanel value="Reviews">
                    <ReviewForm :photographer_id="photographer.pid" />
                    <AllReviews :p_id="photographer.pid" />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
    <Toast position="bottom-center" />
    <Footer></Footer>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from '@/components/NavBar.vue'
import Api from '@/services/Api';
import PackageDetails from '@/components/PackageDetails.vue'
import ReviewForm from '@/components/ReviewForm.vue'
import AllReviews from '@/components/AllReviews.vue'
import PhotographerAlbums from '@/components/PhotographerAlbums.vue'
import PhotographerEquipments from '@/components/PhotographerEquipments.vue'
import Footer from '@/components/Footer.vue'

const activeTab = ref('Albums'); // Set the default active tab

</script>
<script>
export default {
    components: {
        PackageDetails
    },
    data() {
        return {
            photographer: {},
            package: {},
            photographerId: null
        };
    },
    mounted() {
        const id = this.$route.params.id;
        const token = this.$store.state.token;
        this.fetchPhotographerDetails(id, token);
    },
    methods: {
        async fetchPhotographerDetails(id, token) {

            try {
                const response = await Api().get(`/customer/getPhotographerById?id=${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.photographer = response.data;
                this.photographerId = response.data.id;
                this.package = response.data.packages;
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching photographer:', error);
            }
        }
    }
};
</script>

<style scoped>
img {
    width: 20vw;
}

.p-card {
    flex-direction: row;
}

.card-container {
    padding-left: 5vw;
    padding-right: 5vw;
    padding-top: 3vw;
}

.card {
    margin-top: 15px;
    margin-left: 10vw;
    margin-right: 10vw;
}

.p-tab {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: small;
}

@media (max-width: 575px) {
    img {
        width: 15rem;
        border-radius: 100%;
    }

    .p-card {
        flex-direction: column;
    }

    .card-container {
        padding-left: 3vw;
        padding-right: 3vw;
        padding-top: 3vw;
    }

    .card {
        margin-top: 15px;
        margin-left: 3vw;
        margin-right: 3vw;
    }

    .p-card-body {
        width: 100%;
    }
    .p-tab {
        display: flex;
        align-items: center;
        gap: 5px;
        flex-direction: column;
        padding: 1rem;
    }

}
</style>