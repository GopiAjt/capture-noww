<template>
    <div style="display: flex; justify-content: center; margin-top: 20px;">
        <router-link to="/"><img src="/CaptureNow.svg" width="50px" alt="CaptureNoww.in"></router-link>
    </div>
    <Panel>
        <div class="stepper-container">
            <Stepper :value="currentStep" class="stepper">
                <StepList>
                    <Step value="1">Email Id</Step>
                    <Step value="2">OTP</Step>
                    <Step value="3">New Password</Step>
                </StepList>
                <StepPanels>
                    <StepPanel v-slot="{ activateCallback }" value="1">
                        <div class="step-panel">
                            <!-- email id inoput -->
                            <div class="input-container">
                                <label for="email">Email Id</label>
                                <InputText id="email" v-model="email_id" aria-describedby="email-help" />
                                <small id="email-help">Enter your Email Id to reset your password.</small>
                            </div>
                        </div>
                        <!-- button to send otp -->
                        <div class="button-group">
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                                @click="validateEmail(activateCallback)" />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="2">
                        <!-- otp input -->
                        <div class="step-panel">
                            <InputOtp v-model="otp" :length="6" integerOnly />
                            <small id="email-help">Enter otp sent on mail to reset your password.</small>
                        </div>
                        <!-- back and next -->
                        <div class="button-group">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                @click="activateCallback('1')" />
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                                @click="validateOtp(activateCallback)" />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="3">
                        <!-- password input -->
                        <div class="step-panel">
                            <Password v-model="newPassword" toggleMask fluid />
                            <Password v-model="confirmPassword" :feedback="false" fluid />
                            <Button label="Reset" @click="validatePassword" severity="secondary" fluid />
                        </div>
                        <!-- back btn -->
                        <div class="button-group">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                @click="activateCallback('2')" />
                        </div>
                    </StepPanel>
                </StepPanels>
            </Stepper>
        </div>
    </Panel>
    <Toast position="bottom-center" />
    <LoadingScreen :isVisible="isLoading"></LoadingScreen>
</template>

<script>
import AuthService from '@/services/AuthService';
import LoadingScreen from '@/components/LoadingScreen.vue'
export default {
    components: {
        LoadingScreen,
        // other components
    },
    data() {
        return {
            currentStep: '1',
            email_id: null,
            otp: null,
            newPassword: null,
            confirmPassword: null,
            isLoading: false
        };
    },
    methods: {
        async sendOtp() {
            this.isLoading = true;
            console.log('sending');
            try {
                const response = await AuthService.sendForgotPasswordOtp(this.email_id);
                console.log(response);
                if (response.data) {
                    this.$toast.add({ severity: 'info', summary: 'Otp Sent', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'info', summary: 'Invalid Email Id', life: 3000 });
                }
            } catch (error) {
                console.log(error);

            } finally {
                this.isLoading = false; // Reset loading state
            }
        },
        async resetPassword() {
            console.log('reseting');
            try {
                const response = await AuthService.forgotPassword(this.email_id, this.newPassword, this.otp);
                console.log(response);
                if (response.status == 200) {
                    this.showToast('success', 'password set', 'password set');
                    this.$router.push('/')
                }
            } catch (error) {
                if (error.response) {
                    const status = error.response.status;
                    if (status === 403) {
                        this.confirm1();
                        this.$toast.add({ severity: 'info', summary: 'Invalid Otp', life: 3000 });
                    } else if (status === 401 || status === 403) {
                        this.$toast.add({ severity: 'warn', summary: 'Invalid Credentials!', life: 3000 });
                    } else {
                        this.$toast.add({ severity: 'error', summary: 'Error!', life: 3000 });
                    }
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Network Error', life: 3000 });
                }
                console.log(error);
            } finally {
                this.isLoading = false; // Reset loading state
            }
        },
        showToast(severity, summary, detail) {
            // Use $toast to show messages
            this.$toast.add({
                severity: severity,
                summary: summary,
                detail: detail,
                life: 3000
            });
        },
        validateEmail(activateCallback) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.email_id) {
                this.showToast('error', 'Validation Error', 'Email is required');
            } else if (!emailPattern.test(this.email_id)) {
                this.showToast('error', 'Validation Error', 'Invalid Email format');
            } else {
                this.sendOtp();
                activateCallback('2');
            }
        },
        validateOtp(activateCallback) {
            if (!this.otp || this.otp.length !== 6) {
                this.showToast('error', 'Validation Error', 'OTP must be 6 digits');
            } else {
                activateCallback('3');
            }
        },
        validatePassword() {
            if (!this.newPassword) {
                this.showToast('error', 'Validation Error', 'New Password is required');
            } else if (this.newPassword.length < 6) {
                this.showToast('error', 'Validation Error', 'Password must be at least 6 characters long');
            } else if (this.newPassword !== this.confirmPassword) {
                this.showToast('error', 'Validation Error', 'Passwords do not match');
            } else {
                this.resetPassword();
            }
        },
    }
};
</script>

<style scoped>
.stepper-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
}

.stepper {
    width: 100%;
}

.step-panel {
    display: flex;
    flex-direction: column;
    height: 200px;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    gap: 10px;
}

.input-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.input-container label {
    font-weight: bold;
    margin-bottom: 5px;
}

.input-container input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 100%;
}

.button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.button-group button {
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 4px;
}


@media (max-width: 575px) {
    .stepper-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px;
    }
}
</style>
