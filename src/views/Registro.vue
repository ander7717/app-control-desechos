<script setup>
import { useUserStore } from '../stores/user';
import { ref } from 'vue';

const userStore = useUserStore();
const nombre = ref();
const email = ref();
const pass = ref();
const res = ref();
const respSwitch = ref(false);

const envioDatos = async () => {
    if (nombre.value.length < 3 || !email.value || password.value.length < 6) {
        res.value = 'Ingresa los datos correctamente';
        respSwitch.value = true;
    }

    else {
        try {
            res.value = await userStore.crearUsuario(nombre.value, email.value, pass.value);
            setTimeout(() => {
                userStore.router.push("/autenticacion");
            }, 4000);
        
        } catch (error) {
            res.value = 'Hubo un problema.';
            console.log(error.code, error.message);
        } finally {
            respSwitch.value = true;
        }
    }
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-4"></div>
            <div class="col">
                <img src="../assets/green.svg" alt="Logo" width="300" height="250" class=" mt-5 mx-auto d-block">

                <form @submit.prevent="envioDatos">
                    <div class="mb-3">
                        <input type="text" class="form-control mt-5" id="text" placeholder="Nombre de la empresa" v-model.trim="nombre" required>
                    </div>
                    <div class="mb-3">
                        <input type="email" class="form-control" id="email" placeholder="Email" v-model.trim="email" required>
                    </div>
                    <div class="mb-3">
                        <input type="password" class="form-control mb-4" id="password" placeholder="Contraseña" v-model.trim="pass" required>
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary mt-3" :disabled="userStore.cargandoUsuario">Registrarse</button>
                    </div>
                    <div :class="`alert ${res == 'Se ha enviado un correo de verificación.' ? 'alert-success' : 'alert-danger'} mt-4 text-center`" role="alert" v-if="respSwitch">{{ res }}</div>
                </form>
            </div>
            <div class="col-4"></div>
        </div>
    </div>
</template>