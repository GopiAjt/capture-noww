<template>
    <div class="card flex justify-center">
        <Button label="Log In" @click="visible = true" id="login-btn"
            :style="{ backgroundColor: 'yellow', borderColor: 'black' }" />
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
                            <Button label="Log In" @click="handleLogin" fluid/>
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
                    window.alert('Please verify your account');
                } else if (response.status === 200) {
                    const user = response.data;
                    const token = response.data.authToken;
                    
                    localStorage.setItem('user', JSON.stringify(response.data));

                    this.$store.dispatch('login', { user, token })
                } else {
                    window.alert('Invalid Credentials');
                }
            } catch (error) {
                console.error('Error during login:', error);
                window.alert('An error occurred. Please try again later.');
            }
        },
        async handleSignup() {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    name: this.name,
                    email: this.emailId,
                    phoneNo: this.phoneNo,
                    password: this.password1,
                },
            };

            try {
                const response = await Api().post(`/customer/signup`, options);

                if (response.data.status === 'success') {
                    window.alert("Please Verify your Email!");
                } else if (response.data.status === 'error') {
                    window.alert(response.data.message);
                } else {
                    console.error("Error signing up:", response);
                }
            } catch (error) {
                console.error("Error during signup:", error);
            }
        },
    },
};
</script>

<style scoped>
#login-btn {
    height: 35px;
}

.p-tablist-tab-list {
    justify-content: space-between;
}
.p-tabpanels{
    padding-left: 4%;
    padding-right: 4%;
}
</style>
