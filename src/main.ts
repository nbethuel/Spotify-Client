import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Divider from "primevue/divider";
import Tag from "primevue/tag";
import Skeleton from "primevue/skeleton";
import Paginator from "primevue/paginator";
import DataView from "primevue/dataview";

// PrimeVue v4 theme import
import Lara from '@primevue/themes/lara';
import "primeicons/primeicons.css";
import "primeflex/primeflex.css"; // PrimeFlex

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Lara
    }
});
app.use(createPinia());
app.use(router);
app.component("Card", Card);
app.component("InputText", InputText);
app.component("Button", Button);
app.component("Menubar", Menubar);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Divider", Divider);
app.component("Tag", Tag);
app.component("Skeleton", Skeleton);
app.component("Paginator", Paginator);
app.component("DataView", DataView);

app.mount("#app");
