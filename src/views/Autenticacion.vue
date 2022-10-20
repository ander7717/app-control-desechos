<script setup>
import { useUserStore } from '../stores/user';
import { useMix } from '../composables/mix';
import { ref } from 'vue';

const userStore = useUserStore();
const { res, timer } = useMix();

const email = ref(localStorage.getItem('email'));
const local = localStorage.getItem('email');
const pass = ref();
const checked = ref();

const remember = () => {
    if (checked.value == true || checked.value == undefined && local) {
        localStorage.setItem('email', email.value);
    }

    else if (checked.value == false || checked.value == undefined && !local) {
        localStorage.removeItem('email');
    }
};

const envioDatos = async () => {
    if (!email.value || password.value.length < 6) {
        res.value = "Datos incorrectos.";
        timer(res, 5000);
    }
    
    else{
        res.value = await userStore.logearUsuario(email.value, pass.value);
        remember()
        timer(res, 5000);
    }
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-4">
            </div>
            <div class="col">
                <img src="../assets/green.svg" alt="Logo" width="300" height="250" class=" mt-5 mx-auto d-block">

                <form @submit.prevent="envioDatos">
                    <div class="mb-3">
                        <input type="email" class="form-control mt-5" id="email" placeholder="Email" v-model.trim="email" required>
                    </div>
                    <div class="mb-3">
                        <input type="password" class="form-control mb-4" id="password" placeholder="Contraseña" v-model.trim="pass" required>
                    </div>
                    <div class="row mb-4">
                        <div class="col-5 d-flex justify-content-center">
                            <div class="form-check">
                                <input class="form-check-input mt-2" type="checkbox" id="checkbox" v-model="checked" :checked="local" />
                                <label class="form-check-label mt-1" for="checkbox">Recuérdame</label>
                            </div>
                        </div>
                        <div class="col-7">
                            <button type="button" class="btn btn-link" :disabled="userStore.cargandoUsuario"><RouterLink to="/recuperacion">¿Olvidaste la contraseña?</RouterLink></button>
                        </div>
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary mb-4 mt-3" :disabled="userStore.cargandoUsuario">Entrar</button>
                    </div>

                    <div class="text-center">
                        <p>¿No eres un usuario? <RouterLink to="/registro">Regístrate</RouterLink></p>
                    </div>
                </form>
                <div :class="`alert alert-danger mt-4 text-center`" role="alert" v-if="res">{{ res }}</div>
            </div>
            <div class="col-4"></div>
        </div>
    </div>
</template>