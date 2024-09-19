<template>
    <div v-if="!favoritesData || favoritesData.length === 0" style="text-align: center;">
        <h3>No Favorite Photographers Found!</h3>
    </div>
    <div class="card" v-for="fav in favoritesData" :key="fav.pid">
        <Panel>
            <div style="display: flex; align-items: center; gap: 15px;">
                <img :src="fav.profilePhoto ? `data:image/jpeg;base64,${fav.profilePhoto}` : '/default_profile.png'"
                    alt="" width="50px" @click="navigatTo(fav.pid)">
                <h2 @click="navigatTo(fav.pid)">{{ fav.name }}</h2>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                <h3>Starts with: {{ fav.startsWith }}</h3>
                <div class="rating-div">
                    <i class="pi pi-star-fill" style="font-size: 1.5rem; color: yellow; margin-right: 5px;"></i>
                    <p>{{ fav.avgRating }}</p>
                </div>
            </div>
        </Panel>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
    props: {
        user: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            favoritesData: null
        }
    },
    methods: {
        async getFevorites(u_id, token) {
            try {
                const response = await AuthService.getFevorites(u_id, token);
                console.log((await response).data);
                this.favoritesData = (await response).data;
                console.log(this.favoritesData);
            } catch (error) {
                console.log(error);
            }

        },
        navigatTo(id) {
            this.$router.push(`/photorapherProfile/${id}`);
        }
    },
    mounted() {
        console.log(this.$store.state.token);
        console.log(this.user);
        this.getFevorites(this.user, this.$store.state.token);
    }
}

</script>

<style scoped>
h2 {
    cursor: pointer;
    font-weight: bold;
}

img {
    cursor: pointer;
}
</style>