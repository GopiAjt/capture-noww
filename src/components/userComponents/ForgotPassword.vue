<template>
    <Panel header="Forgot Password">
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
                            <div class="input-container">
                                <label for="email">Email Id</label>
                                <InputText id="email" v-model="email_id" aria-describedby="email-help" />
                                <small id="email-help">Enter your Email Id to reset your password.</small>
                            </div>
                        </div>
                        <div class="button-group">
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                                @click="activateCallback('2')" />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="2">
                        <div class="step-panel">
                            <InputOtp v-model="value" integerOnly />
                        </div>
                        <div class="button-group">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                @click="activateCallback('1')" />
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                                @click="activateCallback('3')" />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="3">
                        <div class="step-panel">
                            <Password v-model="value" toggleMask fluid/>
                            <Password v-model="value" :feedback="false" fluid/>
                            <Button label="Reset" severity="secondary" fluid/>
                        </div>
                        <div class="button-group">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                @click="activateCallback('2')" />
                        </div>
                    </StepPanel>
                </StepPanels>
            </Stepper>
        </div>
    </Panel>
</template>

<script>
export default {
    data() {
        return {
            currentStep: '1', // Reactive data to manage current step
        };
    },
};
</script>

<style scoped>
.p-panel-content{
    padding: 0%;
}
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
</style>
