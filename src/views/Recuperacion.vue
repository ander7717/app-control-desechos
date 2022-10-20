<script setup>
import { useUserStore } from '../stores/user';
import { ref } from 'vue';
import { useMix } from '../composables/mix';

const userStore = useUserStore();
const { res, timer } = useMix();
const email = ref();
const validate = ref('needs-validation')

const emailRecPass = async () => {
    if(document.querySelector('form').checkValidity()){
        res.value = await userStore.emailCambioPass(email.value);
        timer(res, 7000);
        if(userStore.auth.currentUser && res.value === 'Se ha enviado un correo.'){
            setTimeout(() => {
                userStore.salirUsuario();
            }, 7000);
        };
    };
    
    validate.value = 'was-validated';
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-4"></div>
            <div class="col">
                <img src="../assets/green.svg" alt="Logo" width="300" height="250" class=" mt-5 mx-auto d-block">

                <form :class="`${validate}`" @submit.prevent="emailRecPass" novalidate>
                    <div class="mb-3 mt-5">
                        <input type="email" class="form-control mb-4" placeholder="Email" v-model.trim="email" required>
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary mt-3">Cambiar Contraseña</button>
                    </div>
                    <div :class="`alert ${res == 'Se ha enviado un correo.' ? 'alert-success' : 'alert-danger'} mt-4 text-center`" role="alert" v-if="res">{{ res }}</div>
                </form>
            </div>
            <div class="col-4"></div>
        </div>
    </div>
</template>