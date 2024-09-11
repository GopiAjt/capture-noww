<template>
    <div class="card flex justify-center">
        <Button label="Log In" @click="visible = true" raised />
        <Dialog v-model:visible="visible" header="CaptureNoww" modal :style="{ width: '25rem' }">
            <div class="card">
                <Tabs value="0">
                    <TabList>
                        <Tab value="0">Log In</Tab>
                        <Tab value="1">Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <!-- Login -->
                        <TabPanel value="0">
                            <div>
                                <InputText v-model="emailId" type="text" placeholder="Email Id" fluid />
                            </div><br>
                            <div>
                                <Password v-model="password1" placeholder="Password" :feedback="false" fluid />
                            </div><br>
                            <Button label="Log In" @click="handleLogin" fluid />
                            <br><br>
                            <p style="text-align: center; cursor: pointer" @click="drawerVisible = true">
                                Forgot Password</p>
                        </TabPanel>
                        <!-- Sign up -->
                        <TabPanel value="1">
                            <div class="card flex flex-col items-center gap-4">
                                <div class="flex-auto">
                                    <InputText v-model="name" type="text" placeholder="Name" fluid />
                                </div><br>
                                <div class="flex-auto">
                                    <InputText v-model="emailId" type="text" placeholder="Email Id" fluid />
                                </div><br>
                                <div class="flex-auto">
                                    <InputNumber v-model="phoneNo" inputId="withoutgrouping" placeholder="Phone Number"
                                        :useGrouping="false" fluid />
                                </div><br>
                                <div class="card flex justify-center">
                                    <Password v-model="password1" placeholder="Enter Password" toggleMask fluid>
                                        <template #header>
                                            <div class="font-semibold text-xm mb-4">Pick a password</div>
                                        </template>
                                        <template #footer>
                                            <Divider />
                                            <ul class="pl-2 ml-2 my-0 leading-normal">
                                                <li>At least one lowercase</li>
                                                <li>At least one uppercase</li>
                                                <li>At least one numeric</li>
                                                <li>Minimum 8 characters</li>
                                            </ul>
                                        </template>
                                    </Password>
                                </div><br>
                                <div class="card flex justify-center">
                                    <Password v-model="password2" placeholder="Re-enter Password" :feedback="false"
                                        fluid />
                                </div><br>
                                <Button label="Sign Up" @click="handleSignup" class="mt-2" fluid />
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </Dialog>
    </div>
    <Drawer v-model:visible="drawerVisible" header="Forgot Password" position="full">
        <ForgotPassword></ForgotPassword>
    </Drawer>
    <!-- OTP Verification Dialog -->
    <Dialog v-model:visible="otpVisible" header="Verify OTP" modal :style="{ width: '20rem' }">
        <div class="p-fluid">
            <p>Enter the OTP sent to your email:</p>
            <div class="card flex justify-center">
                <InputOtp v-model="otp" :length="6" />
            </div>
            <br>
            <Button label="Verify" @click="verifyOtp" fluid />
        </div>
    </Dialog>
    <LoadingScreen :isVisible="isLoading"></LoadingScreen>
</template>

<script>
import Api from '@/services/Api';
import LoadingScreen from '@/components/LoadingScreen.vue'
import ForgotPassword from '@/components/userComponents/ForgotPassword.vue'

export default {
    components: {
        LoadingScreen,
        ForgotPassword
    },
    data() {
        return {
            name: null,
            emailId: null,
            phoneNo: null,
            password1: null,
            password2: null,
            visible: false,
            isLoading: false, // new state for loading
            drawerVisible: false,
            otpVisible: false,
            otp: null,
        };
    },
    methods: {
        confirm1() {
            this.otpVisible = true;
            this.$confirm.require({
                message: 'An OTP has been sent to your email. Please verify.',
                header: 'Verify OTP',
                icon: 'pi pi-exclamation-triangle',
                rejectProps: {
                    label: 'Cancel',
                    severity: 'secondary',
                    outlined: true
                },
                acceptProps: {
                    label: 'Verify'
                },
                accept: () => {
                    // Show the OTP verification dialog
                    this.otpVisible = true;
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Cancelled', detail: 'OTP verification cancelled', life: 3000 });
                }
            });
        },
        async handleLogin() {
            this.isLoading = true;
            try {
                const tokenResponse = await Api().get(`/customer/authtoken?email=${this.emailId}&password=${this.password1}`);
                const response = await Api().get(`/customer/signin?email=${this.emailId}&password=${this.password1}`);

                const user = response.data;
                const token = user.authToken;

                // Successful login (status 200)
                this.$toast.add({ severity: 'success', summary: 'Logged in', life: 3000 });
                localStorage.setItem('user', JSON.stringify(user));
                this.$store.dispatch('login', { user, token });
            } catch (error) {
                if (error.response) {
                    const status = error.response.status;
                    if (status === 400) {
                        this.confirm1();
                        this.$toast.add({ severity: 'info', summary: 'Please verify your Email', life: 3000 });
                    } else if (status === 401 || status === 403) {
                        this.$toast.add({ severity: 'warn', summary: 'Invalid Credentials!', life: 3000 });
                    } else {
                        this.$toast.add({ severity: 'error', summary: 'Error!', life: 3000 });
                    }
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Network Error', life: 3000 });
                }
                console.error('Error during login:', error);
            } finally {
                this.isLoading = false;
            }
        },
        async handleSignup() {
            if (this.password1 !== this.password2) {
                this.$toast.add({ severity: 'warn', summary: 'Passwords do not match!', life: 3000 });
                return;
            }

            this.isLoading = true;
            try {
                const options = {
                    name: this.name,
                    email: this.emailId,
                    phoneNo: this.phoneNo,
                    password: this.password1,
                };

                const response = await Api().post(`/customer/signup`, options, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                // Successful signup (status 201)
                if (response.status === 201) {
                    this.confirm1();
                    this.$toast.add({ severity: 'success', summary: 'Signup successful!', detail: 'Please verify your email to activate your account.', life: 3000 });
                }
            } catch (error) {
                if (error.response) {
                    const status = error.response.status;
                    if (status === 400) {
                        this.confirm1();
                        this.$toast.add({ severity: 'warn', summary: 'Email already exists', detail: 'Please verify your email to login.', life: 3000 });
                    } else {
                        this.$toast.add({ severity: 'error', summary: 'Error!', detail: 'An unexpected error occurred during signup.', life: 3000 });
                    }
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Network Error', life: 3000 });
                }
                console.error('Error signing up:', error);
            } finally {
                this.isLoading = false;
            }
        },
        async verifyOtp() {
            try {
                const response = await Api().get(`/customer/validate?email=${this.emailId}&otp=${this.otp}`);

                // OTP verification successful (status 202)
                if (response.status === 202) {
                    const tokenResponse = await Api().get(`/customer/authtoken?email=${this.emailId}&password=${this.password1}`);
                    const response = await Api().get(`/customer/signin?email=${this.emailId}&password=${this.password1}`);

                    const user = response.data;
                    const token = user.authToken;

                    this.$toast.add({ severity: 'success', summary: 'Logged in', life: 3000 });
                    localStorage.setItem('user', JSON.stringify(user));
                    this.$store.dispatch('login', { user, token });
                }
            } catch (error) {
                if (error.response) {
                    const status = error.response.status;
                    if (status === 400) {
                        this.$toast.add({ severity: 'warn', summary: 'Invalid OTP', life: 3000 });
                    } else {
                        this.$toast.add({ severity: 'error', summary: 'Error!', life: 3000 });
                    }
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Network Error', life: 3000 });
                }
                console.error('Error verifying OTP:', error);
            }
        }

    },
};
</script>

<style scoped>
.p-tablist-tab-list {
    justify-content: space-between;
}

.p-tabpanels {
    padding-left: 4%;
    padding-right: 4%;
}
</style>