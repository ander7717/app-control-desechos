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
const validate = ref('needs-validation');

const remember = () => {
    if (checked.value == true || checked.value == undefined && local) {
        localStorage.setItem('email', email.value);
    }

    else if (checked.value == false || checked.value == undefined && !local) {
        localStorage.removeItem('email');
    }
};

const submitData = async () => {
    if(document.querySelector('form').checkValidity()) {
        res.value = await userStore.login(email.value, pass.value);
        remember();
        timer(res, 5000);
    }

    validate.value = 'was-validated';
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col d-none d-sm-block"></div>
            <div class="col">
                <img src="../assets/green.svg" alt="Logo" width="300" height="250" class="mt-3 mt-sm-5 mx-auto d-block">

                <form @submit.prevent="submitData" novalidate>
                    <div :class="`mb-3 ${validate}`">
                        <input type="email" class="form-control mt-4 mt-sm-5" placeholder="Email" v-model.trim="email" required>
                    </div>
                    <div :class="`mb-3 ${validate}`">
                        <input type="password" class="form-control mb-4" placeholder="Contraseña" v-model.trim="pass" required>
                    </div>
                    <div class="row mb-4">
                        <div class="col-5 d-flex justify-content-center">
                            <div class="form-check">
                                <input class="form-check-input mt-2" type="checkbox" id="checkbox" v-model="checked" :checked="local">
                                <label class="form-check-label mt-1" for="checkbox">Recuérdame</label>
                            </div>
                        </div>
                        <div class="col-7">
                            <button type="button" class="btn btn-link py-0 py-xl-1"><RouterLink to="/recuperacion">¿Olvidaste la contraseña?</RouterLink></button>
                        </div>
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary mb-3 mb-sm-4 mt-sm-3" :disabled="userStore.loadingUser">Entrar</button>
                    </div>
                    <div class="text-center d-none d-sm-none d-md-block">
                        <p>¿No eres un usuario? <RouterLink to="/registro">Regístrate</RouterLink></p>
                    </div>
                </form>
                <div :class="`alert alert-danger mt-4 text-center`" role="alert" v-if="res">{{ res }}</div>
            </div>
            <div class="col d-none d-sm-block"></div>
        </div>
    </div>
</template>