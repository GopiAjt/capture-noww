<template>
    <header>
        <Navbar />
    </header>
    <div style="display: flex; align-items: center; padding: 3%; flex-direction: column; gap: 1rem;">
        <img src="/src/assets/images/default_profile.png" alt="" width="150px">
        <h2>{{ userData.name }}</h2>
    </div>
    <div class="card-panel">
        <Tabs v-model:value="activeTab">
            <TabList>
                <Tab value="Bookings"><i class="pi pi-book" style="font-size: 1rem"></i>
                    <p style="font-weight: bold; font-size: smaller;">Bookings</p>
                </Tab>
                <Tab value="Favorites"><i class="pi pi-heart" style="font-size: 1rem"></i>
                    <p style="font-weight: bold; font-size: smaller;">Favorites</p>
                </Tab>
                <Tab value="Account"><i class="pi pi-user" style="font-size: 1rem"></i>
                    <p style="font-weight: bold; font-size: smaller;">Account</p>
                </Tab>
                <Tab value="Password"><i class="pi pi-cog" style="font-size: 1rem"></i>
                    <p style="font-weight: bold; font-size: smaller;">Password</p>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="Bookings">
                    <Booking :user="userData.email"></Booking>
                </TabPanel>
                <TabPanel value="Favorites">
                    <Favorites :user="userData.email"></Favorites>
                </TabPanel>
                <TabPanel value="Account">
                    <Account></Account>
                </TabPanel>
                <TabPanel value="Password">
                    <Password></Password>
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
import Footer from '@/components/Footer.vue'
import Favorites from '@/components/userComponents/Favorites.vue'
import Account from '@/components/userComponents/Account.vue'
import Booking from '@/components/userComponents/Bookings.vue'
import Password from '@/components/userComponents/Password.vue'

const activeTab = ref('Bookings'); // Set the default active tab

</script>
<script>
export default {
    data() {
        return {
            userData: this.$store.state.user,

        }
    },
    mounted() {
        this.userData = this.$store.state.user;
        console.log(this.userData);
    }
}

</script>

<style scoped>
.p-tab {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: small;
}

.card-panel {
    padding: 0% 15%;
}

@media (max-width: 575px) {
    .p-tab {
        display: flex;
        align-items: center;
        gap: 5px;
        flex-direction: column;
    }

    .card-panel {
        padding: 0% 2%;
    }
}
</style>