<script setup>
import { useUserStore } from '../stores/user';
import { ref } from 'vue';
import { useMix } from '../composables/mix';

const userStore = useUserStore();
const { res, timer } = useMix();
const email = ref();
const validate = ref('needs-validation')

const changePassword = async () => {
    if(document.querySelector('form').checkValidity()) {
        res.value = await userStore.changePass(email.value);
        timer(res, 7000);
        if(userStore.auth.currentUser && res.value === 'Se ha enviado un correo.'){
            setTimeout(() => {
                userStore.logout();
            }, 7000);
        };
    };
    
    validate.value = 'was-validated';
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col d-none d-sm-block"></div>
            <div class="col">
                <img v-if="userStore.userData" :src="`${userStore.userData.photo}`" alt="Logo" width="300" height="250" class="mt-3 mt-sm-5 mx-auto d-block rounded-circle">
                <img v-else src="../assets/green.svg" alt="Logo" width="300" height="250" class="mt-3 mt-sm-5 mx-auto d-block">

                <form :class="`${validate}`" @submit.prevent="changePassword" novalidate>
                    <div class="mb-4">
                        <input type="email" class="form-control mt-4 mt-sm-5" placeholder="Email" v-model.trim="email" required>
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary mt-3" :disabled="userStore.loadingUser">Cambiar Contraseña</button>
                    </div>
                    <div :class="`alert ${res == 'Se ha enviado un correo.' ? 'alert-success' : 'alert-danger'} mt-4 text-center`" role="alert" v-if="res">{{ res }}</div>
                </form>
            </div>
            <div class="col d-none d-sm-block"></div>
        </div>
    </div>
</template>