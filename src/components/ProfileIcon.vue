<template>
    <div style="display: flex; justify-self: center;" class="card" >
        <img src="/src/assets/images/default_profile.png" width="35" alt="" 
        @click="toggle" aria-controls="overlay_menu" style="cursor: pointer;">
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </div>
    <!-- <Toast position="bottom-center" /> -->
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
                        this.$router.push('/userProfile');
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
        };
    },
    methods: {
        toggle(event) {
            this.$refs.menu.toggle(event);
        }
    }
};
</script>
<style>
.p-menu-item-link{
    padding: 5%;
}
.p-menu{
    min-width: 10rem;
}
.p-menu-item-label{
    color: rgb(114, 114, 114);
    font-weight: 600;
}
</style>