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
            userData: this.$store.state.user,
            isLoading: false // Loading state
        }
    },
    methods: {
        async updateDetails() {
            // Basic validation before making the API call
            if (!this.userName || !this.email || !this.phNo) {
                this.$toast.add({ severity: 'warn', summary: 'Please fill out all fields.', life: 3000 });
                return;
            }

            // Create DTO for updating user details
            const customerUpdateDto = {
                name: this.userName,
                email: this.email,
                phoneNo: this.phNo
            }

            this.isLoading = true; // Set loading state

            try {
                // Send the update request to the API
                const response = await AuthService.updateDetails(customerUpdateDto, this.$store.state.token);
                console.log(response.data);

                // Update the user details in the Vuex store
                this.$store.commit('setUser', {
                    ...this.userData,
                    name: this.userName,
                    email: this.email,
                    phoneNo: this.phNo
                });

                // Display success toast
                this.$toast.add({ severity: 'success', summary: 'Updated!', life: 3000 });
                console.log('Updated..');
            } catch (error) {
                // Handle any errors that occur during the update
                console.error('Error updating details:', error);
                this.$toast.add({ severity: 'error', summary: 'Update failed', life: 3000 });
            } finally {
                this.isLoading = false; // Reset loading state
            }
        }
    },
    mounted() {
        // Initialize input fields with user data from the store
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