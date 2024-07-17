<template>
    <header>
        <Navbar />
    </header>

    

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
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching photographer:', error);
            }
        }
    }
};
</script>
