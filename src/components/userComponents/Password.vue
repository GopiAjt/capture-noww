<template>
    <div class="pass-div">
        <div style="display: flex; flex-direction: column; justify-content: center;">
            <label for="oldPass">Old Password</label>
            <Password v-model="oldPass" :feedback="false" fluid />
            <span v-if="errors.oldPass" class="error">{{ errors.oldPass }}</span>
        </div>
        <div style="display: flex; flex-direction: column; justify-content: center;">
            <label for="newPass">New Password</label>
            <Password v-model="newPass" toggleMask fluid />
            <span v-if="errors.newPass" class="error">{{ errors.newPass }}</span>
        </div>
        <div style="display: flex; flex-direction: column; justify-content: center;">
            <label for="confirmPass">Confirm Password</label>
            <Password v-model="confirmPass" :feedback="false" fluid />
            <span v-if="errors.confirmPass" class="error">{{ errors.confirmPass }}</span>
        </div>
    </div>
    <br>
    <div style="display: flex; justify-content: center;">
        <div style="display: flex; align-items: center; flex-direction: column;">
            <div class="font-bold text-xl mb-2">Authenticate Your Account</div>
            <p class="text-surface-500 dark:text-surface-400 block mb-8">Please enter the code sent to your email.</p>
            <InputOtp v-model="otp" :length="6" style="gap: 0">
                <template #default="{ attrs, events, index }">
                    <input type="text" v-bind="attrs" v-on="events" class="custom-otp-input" />
                    <div v-if="index === 3" class="px-4">
                        <i class="pi pi-minus" />
                    </div>
                </template>
            </InputOtp>
            <span v-if="errors.otp" class="error">{{ errors.otp }}</span>
            <div style="display: flex; flex-direction: column;">
                <Button label="Send Otp" link @click="sendVerificationOtp"></Button>
                <Button label="Update" fluid @click="resetPassword"></Button>
            </div>
        </div>
    </div>
    <LoadingScreen :isVisible="isLoading"></LoadingScreen>
</template>

<script>
import AuthService from '@/services/AuthService';
import LoadingScreen from '@/components/LoadingScreen.vue';

export default {
    data() {
        return {
            oldPass: null,
            newPass: null,
            confirmPass: null,
            otp: null,
            errors: {}, // Object to store validation errors
            isLoading: false
        }
    },
    components: {
        LoadingScreen,
    },
    methods: {
        validateFields() {
            this.errors = {}; // Reset errors

            // Old password validation
            if (!this.oldPass) {
                this.errors.oldPass = 'Old password is required.';
            }

            // New password validation
            if (!this.newPass) {
                this.errors.newPass = 'New password is required.';
            } else if (this.newPass === this.oldPass) {
                this.errors.newPass = 'New password must be different from old password.';
            }

            // Confirm password validation
            if (this.confirmPass !== this.newPass) {
                this.errors.confirmPass = 'Confirm password must match the new password.';
            }

            // OTP validation
            if (!this.otp || this.otp.length !== 6 || isNaN(this.otp)) {
                this.errors.otp = 'OTP must be exactly 6 digits.';
            }

            // Return true if no errors
            return Object.keys(this.errors).length === 0;
        },
        async resetPassword() {
            if (!this.validateFields()) {
                return; // If validation fails, do not proceed
            }

            this.isLoading = true;
            const resetData = {
                emailId: this.$store.state.user.email,
                oldPassword: this.oldPass,
                newPassword: this.newPass,
                otp: this.otp,
            };

            try {
                const response = await AuthService.resetPassword(resetData, this.$store.state.token);
                console.log(response.data);
                this.oldPass = null;
                this.newPass = null;
                this.confirmPass = null;
                this.otp = null;
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
        async sendVerificationOtp() {
            this.isLoading = true;

            try {
                const response = await AuthService.sendOtp(this.$store.state.user.email, this.$store.state.token);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        }
    }
};
</script>


<style scoped>
.pass-div {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.custom-otp-input {
    width: 48px;
    height: 48px;
    font-size: 24px;
    appearance: none;
    text-align: center;
    transition: all 0.2s;
    border-radius: 0;
    border: 1px solid var(--p-inputtext-border-color);
    background: transparent;
    outline-offset: -2px;
    outline-color: transparent;
    border-right: 0 none;
    transition: outline-color 0.3s;
    color: var(--p-inputtext-color);
}

.custom-otp-input:focus {
    outline: 2px solid var(--p-focus-ring-color);
}

.custom-otp-input:first-child,
.custom-otp-input:nth-child(5) {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
}

.custom-otp-input:nth-child(3),
.custom-otp-input:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    border-right-width: 1px;
    border-right-style: solid;
    border-color: var(--p-inputtext-border-color);
}

@media (max-width: 575px) {
    .pass-div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
    }
}
</style>

<style scoped>
.error {
    color: red;
    font-size: 12px;
    margin-top: 4px;
}

.pass-div {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.custom-otp-input {
    width: 48px;
    height: 48px;
    font-size: 24px;
    appearance: none;
    text-align: center;
    transition: all 0.2s;
    border-radius: 0;
    border: 1px solid var(--p-inputtext-border-color);
    background: transparent;
    outline-offset: -2px;
    outline-color: transparent;
    border-right: 0 none;
    transition: outline-color 0.3s;
    color: var(--p-inputtext-color);
}

.custom-otp-input:focus {
    outline: 2px solid var(--p-focus-ring-color);
}

@media (max-width: 575px) {
    .pass-div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
    }
}
</style>
