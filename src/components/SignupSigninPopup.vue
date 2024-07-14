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

                        </TabPanel>
                        <TabPanel value="1">
                            <div class="card flex flex-col items-center gap-4">
                                <div class="flex-auto">
                                    <InputText v-model="value2" type="text" placeholder="Name" fluid />
                                </div>
                                <div class="flex-auto">
                                    <InputText v-model="value2" type="text" placeholder="Email Id" fluid />
                                </div>
                                <div class="flex-auto">
                                    <InputNumber v-model="value2" inputId="withoutgrouping" placeholder="Phone Number"
                                        :useGrouping="false" fluid />
                                </div>
                                <div class="card flex justify-center">
                                    <Password v-model="value" toggleMask />
                                </div>
                                <div class="flex-auto">

                                </div>
                            </div>
                        </TabPanel>

                    </TabPanels>
                </Tabs>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";


const password = ref(null);

const visible = ref(false);
</script>

<style scoped>
#login-btn {
    height: 35px;
}

.p-tablist-tab-list {
    justify-content: space-between;
}
</style>