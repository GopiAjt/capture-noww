<template>
    <NavBar></NavBar>

    <div class="container">
        <h2>Contact Us</h2>
        <div id="category">
            <RadioButton v-model="value" inputId="photographer" name="pizza" value="photographer" />
            <label for="ingredient1" class="ml-2">Photographer</label>
            <RadioButton v-model="value" inputId="customer" name="pizza" value="customer" />
            <label for="ingredient1" class="ml-2">Customer</label>
        </div>
        <InputText v-model="name" type="text" placeholder="Your Name" fluid />
        <InputText v-model="emailId" type="text" placeholder="Your Email" fluid />
        <InputText v-model="phoneNo" type="text" placeholder="Phone" fluid />
        <Textarea v-model="msg" rows="5" cols="30" placeholder="message" fluid />
        <Button label="Submit" />
    </div>
    <!-- <Footer></Footer> -->
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
</script>
<script>
import NavBar from '../NavBar.vue';
// import Footer from '@/components/Footer.vue';
export default {
    components: {
        NavBar,
    }
}

</script>


<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding-left: 15vw;
    padding-right: 15vw;
}

#category {
    display: flex;
    gap: 10px;
}

@media (max-width: 575px) {
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding-left: 5vw;
        padding-right: 5vw;
    }
}
</style>