<script setup>
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">Green Company</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ms-auto">
            <img class="me-2" v-if="userStore.userData && userStore.emailVerified" :src="`${userStore.userData.foto}`" alt="Company Image" width="50" height="40" >
            <span class="navbar-text me-5" v-if="userStore.userData && userStore.emailVerified">{{userStore.userData.nombre}}</span>
            <RouterLink class="nav-link" to="/" v-if="userStore.userData">Inicio</RouterLink>
            <RouterLink class="nav-link" to="/autenticacion" v-if="!userStore.userData">Iniciar Sesión</RouterLink>
            <RouterLink class="nav-link" to="/usuario" v-if="userStore.userData">Usuario</RouterLink>
            <button class="btn btn-link nav-link" @click="userStore.salirUsuario" v-if="userStore.userData">Salir</button>
          </div>
        </div>
      </div>
    </nav>
</template>