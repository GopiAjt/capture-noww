<template>
    <footer class="footer">
        <img src="/CaptureNowLogo.svg" alt="CaptureNoww" srcset="" width="50px" style="">
        <p>Every Movement Maters</p>
        <div class="f-links">
            <div class="p-col-12 p-md-4">
                <ul class="footer-links">
                    <li><router-link to="/terms-and-conditions">Terms & Conditions</router-link></li>
                    <li><router-link to="/join-as-photographer">Join As Photographer</router-link></li>
                    <li><router-link to="/contact-us">Contact Us</router-link></li>
                    <li><router-link to="/about-us">About Us</router-link></li>
                </ul>
            </div>
            <div class="social-icons">
                <Button icon="pi pi-facebook" class="p-button-rounded p-button-text" />
                <Button icon="pi pi-twitter" class="p-button-rounded p-button-text" />
                <Button icon="pi pi-linkedin" class="p-button-rounded p-button-text" />
                <Button icon="pi pi-instagram" class="p-button-rounded p-button-text" />
            </div>
        </div>
        <div class="p-text-center p-mt-4">
            <small>&copy; {{ new Date().getFullYear() }} XnorLink PVT LTD. All rights reserved.</small>
        </div>
    </footer>
</template>

<script>

export default {
    name: 'FooterComponent',

}
</script>

<style scoped>
.footer {
    padding: 1rem 1rem;
    text-align: center;
    font-size: smaller;
    margin-top: 5rem;
}

.footer h3,
.footer h4 {
    color: #343a40;
    margin-bottom: 1rem;
}

.footer-links {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: space-evenly;
}

.footer-links li {
    margin-bottom: 0.5rem;
    font-size: x-small;
}

.footer-links a {
    text-decoration: none;
}

.footer-links a:hover {
    text-decoration: underline;
}

.social-icons {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}

.f-links {
    display: flex;
    flex-direction: column;
    padding: 1rem 1rem;
}

@media (max-width: 768px) {

    .social-icons {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
    }

    .social-icons {
        justify-content: center;
    }


    .footer-links li {
        margin-bottom: 0.5rem;
        font-size: xx-small;
    }
}
</style>