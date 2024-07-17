<template>
    <div class="card">
        <div style="position: absolute; height: 500px">
            <SpeedDial :model="items" direction="down" style="position: absolute; left: calc(50% - 3.5rem); top: -20px; cursor: pointer;">
                <template #button="{ toggleCallback }">
                    <img src="/src/assets/images/default_profile.png" alt="profile" outlined class="border-2"
                        @click="toggleCallback" width="40px">
                </template>
                <template #item="{ item, toggleCallback }">
                    <div class="custom-flex" @click="toggleCallback">
                        <span :class="item.icon" />
                        <span>
                            {{ item.label }}
                        </span>
                    </div>
                </template>
            </SpeedDial>
            <Toast position="bottom-center" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    command: () => {
                        this.$toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added', life: 3000 });
                    }
                },
                {
                    label: 'Log Out',
                    icon: 'pi pi-external-link',
                    command: () => {
                        this.$toast.add({ severity: 'success', summary: 'Log Out', detail: 'You have been logged out', life: 3000 });
                        this.$store.dispatch('logout');
                    }
                }
            ]
        }
    }
};
</script>
<style scoped>
.custom-flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem;
    border-width: 1px;
    border-radius: 0.25rem;
    border-color: #e5e7eb;
    width: 4rem;
    cursor: pointer;
    background-color: black;
    font-size: small;
}
</style>