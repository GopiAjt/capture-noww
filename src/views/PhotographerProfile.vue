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
                <div>
                    {{ photographer.name }}
                </div>
                <div>
                    <div class="rating-div">
                        <i class="pi pi-star-fill" style="font-size: 1.5rem; color: yellow; margin-right: 5px;"></i>{{
                            photographer.avgRating }}
                    </div>
                </div>
            </template>
            <template #subtitle>{{ photographer.serviceLocation }}</template>
            <template #content>
                <p class="m-0">
                    <strong>Email:</strong> {{ photographer.email }}
                </p>
                <p class="m-0">
                    <strong>Experience:</strong> {{ photographer.experience }} year(s)
                </p>
                <p class="m-0">
                    <strong>Languages:</strong> {{ photographer.languages }}
                </p>
                <p class="m-0">
                    <strong>Services:</strong> {{ photographer.services }}
                </p>
                <p class="m-0">
                    {{ photographer.aboutMe }}
                </p>
            </template>
            <template #footer>

            </template>
        </Card>
    </div>

    <div class="card">
        <Tabs value="0">
            <TabList>
                <Tab value="Albums">Albums</Tab>
                <Tab value="Packages">Packages</Tab>
                <Tab value="Equipments">Equipments</Tab>
                <Tab value="Reviews">Reviews</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="Albums">

                </TabPanel>
                <TabPanel value="Packages">
                    <PackageDetails :packageDetails="package" />
                </TabPanel>
                <TabPanel value="Equipments">

                </TabPanel>
                <TabPanel value="Reviews">

                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>

<script setup>
import Navbar from '@/components/NavBar.vue'
import Api from '@/services/Api';
import PackageDetails from '@/components/PackageDetails.vue'
</script>
<script>
export default {
    components: {
        PackageDetails
    },
    data() {
        return {
            photographer: {},
            package: {}
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
                const response = await Api().get(`/customer/getPhotographerByEmail?email=${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.photographer = response.data;
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
    margin: 3%;
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

    .p-card-body {
        width: 100%;
    }


}
</style>