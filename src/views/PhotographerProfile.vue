<template>
    <header>
        <Navbar />
    </header>

    <div class="card-container">
        <Card style="width: 25rem; overflow: hidden">
            <template #header>
                <img :src="photographer.profilePhoto ? `data:image/jpeg;base64,${photographer.profilePhoto}` : '../src/assets/images/default_profile.png'"
                    class="card-img-top" alt="Photographer Image" />
            </template>
            <template #title>{{ photographer.name }}</template>
            <template #subtitle>{{ photographer.serviceLocation }}</template>
            <template #content>
                <p class="m-0">
                    {{ photographer.aboutMe }}
                </p>
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
                    <strong>Rating:</strong> {{ photographer.avgRating }}
                </p>
            </template>
            <template #footer>
                
            </template>
        </Card>
    </div>

    <div class="card">
        <Tabs value="0">
            <TabList>
                <Tab value="0">Albums</Tab>
                <Tab value="1">Packages</Tab>
                <Tab value="2">Equipments</Tab>
                <Tab value="3">Reviews</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">

                </TabPanel>
                <TabPanel value="1">

                </TabPanel>
                <TabPanel value="2">

                </TabPanel>
                <TabPanel value="3">

                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>

<script setup>
import Navbar from '@/components/NavBar.vue'
import Api from '@/services/Api';
</script>
<script>
export default {
    data() {
        return {
            photographer: {}
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
</style>