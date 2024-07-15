<template>
    <div class="card">
        <div style="position: absolute; height: 500px">
            <SpeedDial :model="items" direction="down" style="position: absolute; left: calc(50% - 2rem); top: -20px">
                <template #button="{ toggleCallback }">
                    <Button outlined class="border-2" @click="toggleCallback">

                    </Button>
                </template>
                <template #item="{ item, toggleCallback }">
                    <div class="custom-flex"
                        @click="toggleCallback">
                        <span :class="item.icon" />
                        <span>
                            {{ item.label }}
                        </span>
                    </div>
                </template>
            </SpeedDial>
            <Toast />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    label: 'Add',
                    icon: 'pi pi-pencil',
                    command: () => {
                        this.$toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added', life: 3000 });
                    }
                },
                {
                    label: 'Update',
                    icon: 'pi pi-refresh',
                    command: () => {
                        this.$toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated', life: 3000 });
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-trash',
                    command: () => {
                        this.$toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                    }
                },
                {
                    label: 'Upload',
                    icon: 'pi pi-upload',
                    command: () => {
                        this.$router.push('/fileupload');
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
    /* 8px */
    padding: 0.5rem;
    /* 8px */
    border-width: 1px;
    border-radius: 0.25rem;
    /* 4px */
    /* border-color: #e5e7eb; */
    /* Adjust this color to match your theme */
    width: 5rem;
    /* 80px */
    cursor: pointer;
    border-color: #374151;
}
</style>