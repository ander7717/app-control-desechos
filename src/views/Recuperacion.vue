<script setup>
import { useUserStore } from '../stores/user';
import { ref } from 'vue';
import { useMix } from '../composables/mix';

const userStore = useUserStore();
const { res, timer } = useMix();
const email = ref();

const emailRecPass = async () => {
    res.value = await userStore.emailCambioPass(email.value);
    timer(res, 7000);
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-4"></div>
            <div class="col">
                <img src="../assets/green.svg" alt="Logo" width="300" height="250" class=" mt-5 mx-auto d-block">

                <form @submit.prevent="emailRecPass">
                    <div class="mb-3 mt-5">
                        <input type="email" class="form-control" id="email" placeholder="Email" v-model.trim="email" required>
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary mt-3" :disabled="!email">Recuperar</button>
                    </div>
                    <div :class="`alert ${res == 'Se ha enviado un correo de recuperación.' ? 'alert-success' : 'alert-danger'} mt-4 text-center`" role="alert" v-if="res">{{ res }}</div>
                </form>
            </div>
            <div class="col-4"></div>
        </div>
    </div>
</template>