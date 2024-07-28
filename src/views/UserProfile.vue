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
                    <p class="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.
                    </p>
                </TabPanel>
                <TabPanel value="Bookings">
                    <p class="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                        beatae vitae dicta sunt explicabo. Nemo enim
                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                        dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non
                        numquam eius modi.
                    </p>
                </TabPanel>
                <TabPanel value="Favorites">
                    <Favorites :user="userData.email"></Favorites>
                </TabPanel>
                <TabPanel value="Password">
                    <p class="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                        deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                        provident, similique sunt in culpa
                        qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
                        facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
                        cumque nihil impedit quo minus.
                    </p>
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