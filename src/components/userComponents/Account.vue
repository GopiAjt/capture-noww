<template>
    <div class="main-card">
        <div style="display: flex; flex-direction: column; gap: 2px;">
            <label for="username">Username</label>
            <InputText id="username" v-model="userName" aria-describedby="username-help" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 2px;">
            <label for="Emial">Emial Id</label>
            <InputText id="Emial" v-model="email" aria-describedby="username-help" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 2px;">
            <label for="number-input">Number</label>
            <InputNumber id="number-input" v-model="phNo" />
        </div>
    </div>
    <br>
    <div class="main-card">
        <Button label="Update" class="p-button-sm p-button-dark" @click="updateDetails" outlined />
    </div>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
    data() {
        return {
            userName: null,
            email: null,
            phNo: null,
            userData: this.$store.state.user
        }
    },
    methods: {
        async updateDetails() {
            const customerUpdateDto = {
                name: this.userName,
                email: this.email,
                phoneNo: this.phNo
            }
            const resposne = await AuthService.updateDetails(customerUpdateDto, this.$store.state.token);
            console.log(resposne.data);
            
            console.log('updated..');
        }
    },
    mounted() {
        this.userName = this.userData.name;
        this.email = this.userData.email;
        this.phNo = this.userData.phoneNo;
    }
}
</script>

<style scoped>
.main-card {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1%;
}

@media (max-width: 575px) {
    .main-card {
        display: flex;
        justify-content: center;
        gap: 1rem;
        padding: 1%;
        flex-direction: column;
        padding-left: 10px;
        padding-right: 10px;
    }

}
</style>