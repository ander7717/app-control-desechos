<script setup>
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
</script>

<template>
    <nav class="navbar navbar-expand bg-light">
      <div class="container-fluid">
        <RouterLink class="navbar-brand d-none d-md-block" to="/">Green Company</RouterLink>
          <div class="navbar-nav ms-auto">
            <img class="me-2" v-if="userStore.userData && userStore.emailVerified" :src="`${userStore.userData.photo}`" alt="Company Image" width="50" height="40" >
            <span class="navbar-text me-5" v-if="userStore.userData && userStore.emailVerified">{{userStore.userData.name}}</span>
            <RouterLink class="nav-link" to="/" v-if="userStore.userData">Inicio</RouterLink>
            <RouterLink class="nav-link" to="/autenticacion" v-if="!userStore.userData">Iniciar Sesión</RouterLink>
            <RouterLink class="nav-link" to="/usuario" v-if="userStore.userData">Usuario</RouterLink>
            <button class="btn btn-link nav-link" @click="userStore.logout" v-if="userStore.userData">Salir</button>
          </div>
      </div>
    </nav>
</template>