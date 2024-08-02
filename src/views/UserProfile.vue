<template>
    <header>
        <Navbar />
    </header>
    <div style="display: flex; align-items: center; padding: 3%; flex-direction: column;">
        <img src="/public/CaptureNow.svg" alt="" width="100px">
        <h3>{{ userData.name }}</h3>
    </div>
    <div class="card-panel">
        <Tabs value="0">
            <TabList>
                <Tab value="Account"><i class="pi pi-user" style="font-size: 1rem"></i>
                    <p style="font-weight: bold;">Account</p>
                </Tab>
                <Tab value="Bookings"><i class="pi pi-book" style="font-size: 1rem"></i>
                    <p style="font-weight: bold;">Bookings</p>
                </Tab>
                <Tab value="Favorites"><i class="pi pi-heart" style="font-size: 1rem"></i>
                    <p style="font-weight: bold;">Favorites</p>
                </Tab>
                <Tab value="Password"><i class="pi pi-cog" style="font-size: 1rem"></i>
                    <p style="font-weight: bold;">Password</p>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="Account">
                    <Account></Account>
                </TabPanel>
                <TabPanel value="Bookings">
                    <Booking></Booking>
                </TabPanel>
                <TabPanel value="Favorites">
                    <Favorites :user="userData.email"></Favorites>
                </TabPanel>
                <TabPanel value="Password">
                    <Password></Password>             
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
    <Footer></Footer>
</template>

<script setup>
import Navbar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import Favorites from '@/components/userComponents/Favorites.vue'
import Account from '@/components/userComponents/Account.vue'
import Booking from '@/components/userComponents/Bookings.vue'
import Password from '@/components/userComponents/Password.vue'

</script>
<script>
export default {
    data() {
        return {
            userData: this.$store.state.user
        }
    },
    mounted() {
        console.log(this.userData.name);
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
    padding: 0% 10%;
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