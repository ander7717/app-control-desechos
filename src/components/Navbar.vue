<script setup>
import { useUserStore } from '../stores/user';
import { Tooltip } from "bootstrap";

const userStore = useUserStore();

new Tooltip(document.body, {
  selector: "[data-bs-toggle='tooltip']",
});
</script>

<template>
    <nav class="navbar navbar-expand bg-light">
      <div class="container-fluid">
        <RouterLink class="navbar-brand d-none d-md-block" to="/">Green Tree</RouterLink>
          <div class="navbar-nav ms-auto">
            <img class="me-1" v-if="new Date(userStore.userData?.expDate) > Date.now()" src="../assets/check-mark.png" alt="check-mark" width="40" height="40" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Racda Vigente">
            <img class="me-2 mt-2" v-else-if="new Date(userStore.userData?.expDate) < Date.now()" src="../assets/cross-mark.png"  alt="cross-mark" width="25" height="25" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Racda Vencido">
            <img class="me-2 rounded-circle" v-if="userStore.userData && userStore.emailVerified" :src= userStore.userData.photo alt="Company" width="50" height="40" >
            <span class="navbar-text me-5" v-if="userStore.userData && userStore.emailVerified">{{userStore.userData.name}}</span>
            <RouterLink class="nav-link" to="/" v-if="userStore.userData">Inicio</RouterLink>
            <RouterLink class="nav-link d-lg-none" to="/registro" v-if="!userStore.userData">Regístrate</RouterLink>
            <RouterLink class="nav-link" to="/autenticacion" v-if="!userStore.userData">Iniciar Sesión</RouterLink>
            <RouterLink class="nav-link" to="/usuario" v-if="userStore.userData">Usuario</RouterLink>
            <button class="btn btn-link nav-link" @click="userStore.logout" v-if="userStore.userData">Salir</button>
          </div>
      </div>
    </nav>
</template>