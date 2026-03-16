<template>
    <div class="card flex justify-center">
        <Button label="Log In" @click="visible = true" raised class="font-bold px-6" />
        
        <Dialog v-model:visible="visible" modal :style="{ width: '28rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #header>
                <div class="flex items-center gap-2">
                    <img src="/CaptureNow.svg" width="32" alt="Logo" class="animate-pulse" />
                    <span class="text-xl font-bold tracking-tight">CaptureNoww</span>
                </div>
            </template>

            <div class="p-2">
                <Tabs value="0">
                    <TabList class="mb-4">
                        <Tab value="0" class="flex-1 font-bold">Log In</Tab>
                        <Tab value="1" class="flex-1 font-bold">Sign Up</Tab>
                    </TabList>
                    
                    <TabPanels class="pt-2">
                        <!-- Login -->
                        <TabPanel value="0">
                            <div class="flex flex-col gap-5">
                                <div class="flex flex-col gap-2">
                                    <label for="login-email" class="text-sm font-semibold text-surface-600">Email Address</label>
                                    <IconField>
                                        <InputIcon class="pi pi-envelope" />
                                        <InputText id="login-email" v-model="emailId" type="text" placeholder="name@example.com" fluid class="bg-surface-50" />
                                    </IconField>
                                </div>
                                
                                <div class="flex flex-col gap-2">
                                    <div class="flex justify-between items-center">
                                        <label for="login-pass" class="text-sm font-semibold text-surface-600">Password</label>
                                        <a href="#" @click.prevent="navToForgotPassword" class="text-xs font-bold text-primary hover:underline transition-all">Forgot?</a>
                                    </div>
                                    <IconField>
                                        <InputIcon class="pi pi-lock" />
                                        <Password id="login-pass" v-model="password1" placeholder="••••••••" :feedback="false" toggleMask fluid class="bg-surface-50" />
                                    </IconField>
                                </div>
                                
                                <Button label="Sign In" @click="handleLogin" :loading="isLoading" fluid class="mt-2 font-bold py-3 shadow-lg hover:shadow-primary/20" />
                                
                                <Divider align="center">
                                    <span class="text-xs text-surface-400 uppercase tracking-widest">Welcome Back</span>
                                </Divider>
                            </div>
                        </TabPanel>

                        <!-- Sign up -->
                        <TabPanel value="1">
                            <div class="flex flex-col gap-4">
                                <div class="flex flex-col gap-1.5 text-center mb-2">
                                    <h2 class="text-lg font-bold">Create Account</h2>
                                    <p class="text-xs text-surface-500">Join our community of photography lovers</p>
                                </div>

                                <div class="grid grid-cols-1 gap-4">
                                    <div class="flex flex-col gap-1.5">
                                        <label class="text-xs font-bold uppercase tracking-wider text-surface-500">Full Name</label>
                                        <IconField>
                                            <InputIcon class="pi pi-user" />
                                            <InputText v-model="name" type="text" placeholder="John Doe" fluid class="bg-surface-50" />
                                        </IconField>
                                    </div>

                                    <div class="flex flex-col gap-1.5">
                                        <label class="text-xs font-bold uppercase tracking-wider text-surface-500">Email</label>
                                        <IconField>
                                            <InputIcon class="pi pi-envelope" />
                                            <InputText v-model="emailId" type="text" placeholder="john@example.com" fluid class="bg-surface-50" />
                                        </IconField>
                                    </div>

                                    <div class="flex flex-col gap-1.5">
                                        <label class="text-xs font-bold uppercase tracking-wider text-surface-500">Phone</label>
                                        <InputNumber v-model="phoneNo" inputId="withoutgrouping" placeholder="9876543210" :useGrouping="false" fluid class="bg-surface-50" />
                                    </div>

                                    <div class="flex flex-col gap-1.5">
                                        <label class="text-xs font-bold uppercase tracking-wider text-surface-500">Password</label>
                                        <Password v-model="password1" placeholder="Choose a secure password" toggleMask fluid class="bg-surface-50">
                                            <template #header>
                                                <div class="font-semibold text-xs mb-2">Password Requirements</div>
                                            </template>
                                            <template #footer>
                                                <Divider />
                                                <ul class="pl-2 ml-2 my-0 leading-normal text-xs list-disc">
                                                    <li>At least one lowercase</li>
                                                    <li>At least one uppercase</li>
                                                    <li>At least one numeric</li>
                                                    <li>Minimum 8 characters</li>
                                                </ul>
                                            </template>
                                        </Password>
                                    </div>

                                    <div class="flex flex-col gap-1.5">
                                        <label class="text-xs font-bold uppercase tracking-wider text-surface-500">Confirm Password</label>
                                        <IconField>
                                            <InputIcon class="pi pi-shield" />
                                            <Password v-model="password2" placeholder="Repeat password" :feedback="false" fluid class="bg-surface-50" />
                                        </IconField>
                                    </div>
                                </div>

                                <Button label="Create Account" @click="handleSignup" :loading="isLoading" class="mt-4 font-bold py-3 shadow-lg hover:shadow-primary/20" fluid />
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </Dialog>

        <!-- OTP Verification Dialog -->
        <Dialog v-model:visible="otpVisible" modal :style="{ width: '24rem' }" class="text-center">
            <template #header>
                <div class="w-full text-center">
                    <i class="pi pi-verified text-4xl text-primary mb-2 block mx-auto"></i>
                    <h3 class="text-xl font-bold">Email Verification</h3>
                </div>
            </template>
            
            <div class="flex flex-col items-center gap-6 p-2">
                <p class="text-surface-600 text-sm">
                    We've sent a 6-digit verification code to
                    <span class="font-bold text-surface-900">{{ emailId }}</span>
                </p>
                
                <InputOtp v-model="otp" :length="6" class="gap-2" />
                
                <div class="flex flex-col gap-3 w-full">
                    <Button label="Verify & Activate" @click="verifyOtp" :loading="isLoading" fluid class="font-bold py-3" />
                    <Button label="Resend Code" link class="text-xs font-bold uppercase tracking-widest text-surface-500 hover:text-primary transition-colors" />
                </div>
            </div>
        </Dialog>
    </div>
    <LoadingScreen :isVisible="isLoading"></LoadingScreen>
</template>


<script>
import Api from '@/services/Api';
import LoadingScreen from '@/components/LoadingScreen.vue'


export default {
    components: {
        LoadingScreen,
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
            otpVisible: false,
            otp: null,
        };
    },
    methods: {
        confirm1() {
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
                const { accessToken, token: refreshToken } = tokenResponse.data;

                const response = await Api().get(`/customer/signin?email=${this.emailId}&password=${this.password1}`);
                const user = response.data;
                
                console.log('Login successful', { user, accessToken, refreshToken });
                
                // Successful login
                this.$toast.add({ severity: 'success', summary: 'Logged in', life: 3000 });
                this.$store.dispatch('login', { user, token: accessToken, refreshToken });
                this.visible = false;
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
                    const { accessToken, token: refreshToken } = tokenResponse.data;

                    const signinResponse = await Api().get(`/customer/signin?email=${this.emailId}&password=${this.password1}`);
                    const user = signinResponse.data;

                    this.$toast.add({ severity: 'success', summary: 'Logged in', life: 3000 });
                    this.$store.dispatch('login', { user, token: accessToken, refreshToken });
                    this.visible = false;
                    this.otpVisible = false;
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
        },
        navToForgotPassword(){
            this.$router.push('/Forgot-Password');
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