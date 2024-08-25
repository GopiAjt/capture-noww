<template>
    <NavBar></NavBar>

    <h2>Contact Us</h2>
    <input type="radio" id="photographer" name="fav_language" value="Photographer" />
    <label for="photographer">Photographer</label>

    <input type="radio" id="customer" name="fav_language" value="Customer" />
    <label for="customer">Customer</label>

    <input type="text" class="field" placeholder="Your Name" />
    <input type="text" class="field" placeholder="Your Email" />
    <input type="text" class="field" placeholder="Phone" />
    <textarea placeholder="Message" class="field"></textarea>
    <button class="send-btn">Send</button>

    <!-- <Footer></Footer> -->
</template>

<script>
import AuthService from '@/services/AuthService';
import NavBar from '../NavBar.vue';
// import Footer from '@/components/Footer.vue';
export default {
    components: {
        NavBar,
    }
}

</script>


<style scoped></style>