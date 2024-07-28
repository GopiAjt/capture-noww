<template>
    <div>
        <div v-if="photographers" class="card">
            <Card v-for="photographer in photographers" :key="photographer.email">
                <template #header>
                    <div class="header-img">
                        <img :src="photographer.profilePhoto ? `data:image/jpeg;base64,${photographer.profilePhoto}` : 'src/assets/images/default_profile.png'"
                            class="card-img-top" alt="Photographer Image" @click="photographerProfile(photographer.id)"
                            style="cursor: pointer;" />
                    </div>
                </template>

                <template #title>
                    <h3 @click.prevent="photographerProfile(photographer.id)" style="cursor: pointer; font-weight: bold;">{{ photographer.name }}</h3>
                    <div class="rating-div">
                        <i class="pi pi-star-fill"
                            style="font-size: 1.5rem; color: yellow; margin-right: 5px;"></i>{{ photographer.avgRating }}
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
                        <Toast position="bottom-center" />
                        <Button label="Book Me" class="p-button-sm p-button-dark" @click="bookMe" raised outlined />
                    </div>
                </template>
            </Card>
        </div>
        <div>
            <Paginator :rows="pageSize" :totalRecords="totalPhotographers" :rowsPerPageOptions="[10, 20, 30]"
                @page="onPageChange">
            </Paginator>
        </div>
    </div>
</template>

<script>
import Api from '@/services/Api';

export default {
    data() {
        return {
            photographers: null,
            totalPhotographers: 0,
            error: null,
            page: 0,
            pageSize: 10,
        };
    },
    mounted() {
        this.fetchPhotographers(this.page, this.pageSize);
    },
    methods: {
        async fetchPhotographers(page, pageSize) {
            try {
                const offset = page * pageSize;
                const response = await Api().get(`/customer/getPhotographersIndex/${offset}/${pageSize}`);
                this.photographers = response.data.content;
                console.log(response.data.content);
                this.totalPhotographers = response.data.totalElements;
            } catch (error) {
                console.error('Error fetching photographers:', error);
                this.error = 'Failed to load photographers';
            }
        },
        photographerProfile(id) {
            if (this.$store.state.isLogedIn) {
                console.log(id);
                this.$router.push(`/photorapherProfile/${id}`);
            } else {
                this.$toast.add({ severity: 'error', summary: 'Please Login!', life: 3000 });
            }
        },
        bookMe() {
            // Implement the booking logic
        },
        onPageChange(event) {
            this.page = event.page;
            this.pageSize = event.rows;
            this.fetchPhotographers(this.page, this.pageSize);
        },
    }
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
