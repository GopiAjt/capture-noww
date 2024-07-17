<template>
    <div v-if="photographers" class="card">
        <Card v-for="photographer in photographers">
            <template #header>
                <div class="header-img">
                    <img :src="photographer.profilePhoto ? `data:image/jpeg;base64,${photographer.profilePhoto}` : 'src/assets/images/default_profile.png'"
                        class="card-img-top" alt="Photographer Image" @click="photographerProfile(photographer.email)" style="cursor: pointer;" />
                </div>
            </template>

            <template #title>
                <a @click.prevent="photographerProfile(photographer.email)" style="text-decoration: none; color: white; cursor: pointer;">
                    {{ photographer.name }}
                </a>
                <div class="rating-div">
                    <i class="pi pi-star-fill" style="font-size: 1.5rem; color: yellow; margin-right: 5px;"></i>{{ photographer.avgRating }}
                </div>
            </template>
            <template #subtitle>{{ photographer.experience }}</template>
            <template #content>
                <div class="card-info-style">{{ photographer.serviceLocation }}</div>
                <div class="card-info-style">{{ photographer.services }}</div>
                <div class="card-info-style">{{ photographer.languages }}</div>
            </template>
            <template #footer>
                <div class="footer-div">
                    <div class="price-range">Starts with: {{ photographer.startsWith }}</div>
                    <Toast />
                    <Button label="Book Me" class="p-button-sm p-button-dark" @click="bookMe"  raised outlined/>
                </div>
            </template>
        </Card>

    </div>
</template>

<script>
import Api from '@/services/Api';

export default {
    mounted() {
        this.fetchPhotographers(0, 10); // Call the fetchPhotographers method on mounted
    },
    methods: {
        async fetchPhotographers(offset, pageSize) {
            try {
                const response = await Api().get(`/customer/getPhotographersIndex/${offset}/${pageSize}`);
                console.log(response.data.content);
                this.photographers = response.data.content; // Update the data property
            } catch (error) {
                console.error('Error fetching photographers:', error);
                // Handle error gracefully (e.g., display error message to user)
            }
        },
        photographerProfile(id) {
            if(this.$store.state.isLogedIn){
                this.$router.push(`/photorapherProfile/${id}`);
            }else{
                this.$toast.add({ severity: 'error', summary: 'Please Login!', life: 3000 });
            }
        },
        bookMe(){

        },
        
    },
    data() { // Optional: Define initial data state for photographers and error
        return {
            photographers: null,
            error: null,
        };
    },
};
</script>
<style scoped>
.card {
    padding-top: 5%;
    padding-bottom: 5%;
    padding-left: 8vw;
    padding-right: 8vw;
}

.p-card {
    flex-direction: row;
    width: 100%;
    overflow: hidden;
    margin-bottom: 20px;
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
.rating-div{
    display: flex;
    justify-content: center;
    align-items: center;
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


}
</style>
<style>
.p-card-body {
    width: 80vw;
}
.p-card-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media (max-width: 575px) {
    .p-card-body {
        padding: 5px;
        width: 80vw;
    }
}
</style>