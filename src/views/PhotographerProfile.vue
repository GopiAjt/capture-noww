<template>
    <header>
        <Navbar />
    </header>

    <div class="card-container" v-if="photographer">
        <Card style="width: 100%; overflow: hidden">
            <template #header class="profile-img">
                <img :src="photographer.profilePhoto ? `data:image/jpeg;base64,${photographer.profilePhoto}` : '../src/assets/images/default_profile.png'"
                    class="card-img-top" alt="Photographer Image" />
            </template>
            <template #title>
                <div class="p-info">
                    <i class="pi pi-user" style="font-size: 1rem"></i>
                    <h3> {{ photographer.name }}</h3>
                </div>
                <div class="p-info">
                    <div>
                        <!-- Add to Favorites Button -->
                        <Button @click="toggleFavorite"  :icon="isFavorite ? 'pi pi-heart-fill' : 'pi pi-heart'" outlined/>
                    </div>
                    <div>
                        <div class="rating-div">
                            <i class="pi pi-star-fill"
                                style="font-size: 1.5rem; color: yellow; margin-right: 5px;"></i>{{
                                    photographer.avgRating }}
                        </div>
                    </div>
                </div>
            </template>
            <template #subtitle>
                <div class="p-info">
                    <i class="pi pi-map-marker" style="font-size: 1rem"></i> {{ photographer.serviceLocation }}
                </div>
            </template>

            <template #content>
                <p class="p-info">
                    <strong><i class="pi pi-face-smile" style="font-size: 1rem"></i></strong> {{ photographer.experience
                    }} year(s)
                </p>
                <p class="p-info">
                    <strong><i class="pi pi-language" style="font-size: 1rem"></i></strong> {{ photographer.languages }}
                </p>
                <p class="p-info">
                    <strong><i class="pi pi-camera" style="font-size: 1rem"></i></strong> {{ photographer.services }}
                </p>
                <p class="p-info">
                    <i class="pi pi-info-circle" style="font-size: 1rem"></i> {{ photographer.aboutMe }}
                </p>
            </template>
            <template #footer>

            </template>
        </Card>
    </div>

    <div class="card" v-if="photographer">
        <Tabs v-model:value="activeTab">
            <TabList>
                <Tab value="Albums"><i class="pi pi-images" style="font-size: 1rem"></i><span
                        style="font-weight: bold; font-size: smaller;">Albums</span></Tab>
                <Tab value="Packages"><i class="pi pi-list-check" style="font-size: 1rem"></i><span
                        style="font-weight: bold; font-size: smaller;">Packages</span></Tab>
                <Tab value="Equipments"><i class="pi pi-briefcase" style="font-size: 1rem"></i><span
                        style="font-weight: bold; font-size: smaller;">Equipments</span></Tab>
                <Tab value="Reviews"><i class="pi pi-star" style="font-size: 1rem"></i><span
                        style="font-weight: bold; font-size: smaller;">Reviews</span></Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="Albums">
                    <PhotographerAlbums :photographer_id="photographer.pid" />
                </TabPanel>
                <TabPanel value="Packages">
                    <PackageDetails :packageDetails="package" :photographer_id="photographer.pid" />
                </TabPanel>
                <TabPanel value="Equipments">
                    <PhotographerEquipments :photographer_id="photographer.pid" />
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
import { useStore } from 'vuex';
import AuthService from '@/services/AuthService';

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
            isFavorite: false
        };
    },
    computed: {
        store() {
            return useStore();
        }
    },
    mounted() {
        const id = this.$route.params.id;
        const token = this.$store.state.token;
        this.fetchPhotographerDetails(id, token);
        this.checkIfFavorite(id);
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
                if (response.status == 200) {
                    this.photographer = response.data;
                    this.package = response.data.packages;
                }
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching photographer:', error);
            }
        },
        checkIfFavorite(id){
            console.log(this.store.state.user.favorites.includes(id));
            
            if(this.store.state.user.favorites.includes(id)){
                this.isFavorite = true;
            }else{
                this.isFavorite = false;
            }
        },
        async toggleFavorite(){
            if(this.isFavorite){
                console.log(this.store.state.user.email);
                console.log(this.$route.params.id);
                
                console.log(this.store.state.token);
                
                const response = await AuthService.removeFav(this.store.state.token, this.store.state.user.email, this.$route.params.id);
                if(response.data)
                    console.log(true);
                    
                this.isFavorite = false;    
            }else{
                const response = AuthService().addFav();
                this.isFavorite = true;
                console.log(this.isFavorite);
                
            }
        }
    }
};
</script>

<style scoped>
img {
    width: 20vw;
}

.p-info {
    display: flex;
    align-items: center;
    gap: 10px;
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