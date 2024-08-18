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
                        <TabPanel value="0">
                            <div class="flex-auto">
                                <InputText v-model="LoginEmailId" type="text" placeholder="Email Id" fluid />
                            </div><br>
                            <div class="card flex justify-center">
                                <Password v-model="LoginPassword" placeholder="Password" :feedback="false" fluid />
                            </div><br>
                            <Button label="Log In" @click="handleLogin" fluid />
                        </TabPanel>
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
                                    <Password v-model="password2" placeholder="Re Enter Password" :feedback="false"
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
    <Toast position="bottom-center" />
</template>

<script>
import Api from '@/services/Api';

export default {
    data() {
        return {
            LoginEmailId: null,
            LoginPassword: null,
            name: null,
            emailId: null,
            phoneNo: null,
            password1: null,
            password2: null,
            visible: false,
        };
    },
    methods: {
        async handleLogin() {
            try {
                const tokenResponse = await Api().get(`/customer/authtoken?email=${this.LoginEmailId}&password=${this.LoginPassword}`);
                const response = await Api().get(`/customer/signin?email=${this.LoginEmailId}&password=${this.LoginPassword}`);

                if (response.status === 400) {
                    this.$toast.add({ severity: 'info', summary: 'Please verify your Email', life: 3000 });
                    window.alert('');
                } else if (response.status === 200) {
                    const user = response.data;
                    const token = response.data.authToken;
                    console.log(response.data);
                    this.$toast.add({ severity: 'success', summary: 'Loged in', life: 3000 });
                    localStorage.setItem('user', JSON.stringify(response.data));

                    this.$store.dispatch('login', { user, token })
                } else {
                    this.$toast.add({ severity: 'warn', summary: 'Invalid Credentials!', life: 3000 });
                }
            } catch (error) {
                this.$toast.add({ severity: 'error', summary: 'Error!', life: 3000 });
                console.error('Error during login:', error);
            }
        },
        async handleSignup() {
            console.log("signing up");

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

            console.log(response.status);

            if (response.status === 201) {
                console.log("Please Verify your Email!");
                this.$toast.add({ severity: 'error', summary: 'Error!', life: 3000 });
                window.alert("Please Verify your Email!");
            } else if (response.status === 400) {
                console.log("Email Already existes please verify otp to login");

                window.alert("Email Already existes");
            } else {
                console.error("Error signing up:", response);
            }

        },
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
