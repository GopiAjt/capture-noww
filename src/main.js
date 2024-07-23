import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css'; // Import PrimeIcons CSS
import store from './stores/store';
import { definePreset } from '@primevue/themes';


import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import SplitButton from 'primevue/splitbutton';
import Dialog from 'primevue/dialog';
import Card from 'primevue/card';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import AutoComplete from 'primevue/autocomplete';
import InputNumber from 'primevue/inputnumber';
import Password from 'primevue/password';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import MultiSelect from 'primevue/multiselect';
import Divider from 'primevue/divider'; 
import SpeedDial from 'primevue/speeddial';
import Rating from 'primevue/rating';
import Textarea from 'primevue/textarea';
import Panel from 'primevue/panel';
import Avatar from 'primevue/avatar';
import Paginator from 'primevue/paginator';
import Galleria from 'primevue/galleria';


import Ripple from 'primevue/ripple';



const app = createApp(App)
app.directive('ripple', Ripple);
// app.use(PrimeVue, { ripple: true });
const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{yellow.50}',
            100: '{yellow.100}',
            200: '{yellow.200}',
            300: '{yellow.300}',
            400: '{yellow.400}',
            500: '{yellow.500}',
            600: '{yellow.600}',
            700: '{yellow.700}',
            800: '{yellow.800}',
            900: '{yellow.900}',
            950: '{yellow.950}'
        }
    }
});
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    }
});

app.use(store);
app.use(createPinia());
app.use(router);
app.use(ToastService);
app.component('Toolbar', Toolbar);
app.component('Button', Button);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('InputText', InputText);
app.component('SplitButton', SplitButton);
app.component('Dialog', Dialog);
app.component('Card', Card);
app.component('Tabs', Tabs);
app.component('TabList', TabList);
app.component('Tab', Tab);
app.component('TabPanels', TabPanels);
app.component('TabPanel', TabPanel);
app.component('AutoComplete', AutoComplete);
app.component('InputNumber', InputNumber);
app.component('Password', Password);
app.component('Toast', Toast);
app.component('MultiSelect', MultiSelect);
app.component('Divider', Divider);
app.component('SpeedDial', SpeedDial);
app.component('Rating', Rating);
app.component('Textarea', Textarea);
app.component('Panel', Panel);
app.component('Avatar', Avatar);
app.component('Paginator', Paginator);
app.component('Galleria', Galleria);
app.mount('#app')