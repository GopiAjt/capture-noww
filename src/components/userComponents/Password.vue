<template>
    <div style="display: flex; justify-content: center; gap: 20px;">
        <div style="display: flex; flex-direction: column; justify-content: center;">
            <label for="username">Old Password</label>
            <Password v-model="oldPass" :feedback="false" />
        </div>
        <div  style="display: flex; flex-direction: column; justify-content: center;">
            <label for="username">New Password</label>
            <Password v-model="newPass" toggleMask />
        </div>
        <div  style="display: flex; flex-direction: column; justify-content: center;">
            <label for="username">Confirm Password</label>
            <Password v-model="confirmPass" :feedback="false" />
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
            <div style="display: flex; flex-direction: column;">
                <Button label="Send Code" link class="p-0"></Button>
                <Button label="Update" fluid></Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: null
        }
    }
};
</script>

<style scoped>
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
</style>