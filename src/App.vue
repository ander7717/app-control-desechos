<script setup>
import { useUserStore } from "./stores/user";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';

const userStore = useUserStore();
</script>

<template>
  <div v-if="userStore.loading " class="d-flex flex-column min-vh-100">
    <div class="spinner-border my-auto mx-auto" style="width: 4rem; height: 4rem;" role="status">
      <span class="visually-hidden">Cargando...</span>
    </div>
  </div>
  <div v-else class="d-flex flex-column min-vh-100" >
    <Navbar></Navbar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>