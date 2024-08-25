<template>
    <NavBar></NavBar>
    <section class="about-us">
        <div class="text">
            <h2>About Us</h2>
            <h5>Hire Photographers & <span>Videograpers from us</span></h5>
            <div class="data">
                <p>
                    Welcome to CaptureNoww, where we capture your precious moments! We're not just any
                    photography startup; we're your go-to destination for custom bookings that blend skill,
                    style, and budget effortlessly. With our curated selection of talented photographers,
                    finding the perfect match for your occasion is a breeze. Transparency is our motto—check
                    out photographer profiles, portfolios, and stellar reviews to make your decision
                    confidently. Let's weave your story into timeless memories, the Indian way, one frame at
                    a time!
                </p>
                <div class="data">
                    <!-- <a href="#" class="hire"></a> -->
                </div>
            </div>
        </div>
    </section>

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


<style scoped>
.about-us{
    margin-left: 25px;
    margin-right: 25px;
}
</style>