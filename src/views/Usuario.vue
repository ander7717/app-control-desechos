<script setup>
import { useUserStore } from '../stores/user';
import { useMix } from '../composables/mix';
import { ref } from 'vue';

const userStore = useUserStore();
const { res, timer } = useMix();

const email = ref(userStore.userData.email);
const name = ref(userStore.userData.name);
const validate = ref('needs-validation')

const submitData = async () => {
    if(document.querySelector('form').checkValidity()) {
        try {
            res.value = await userStore.updateName(name.value);
        
        } catch (error) {
            res.value = 'Hubo un problema.';
            console.log(error.code, error.message);

        } finally {
            timer(res, 5000);
        }
    }

    validate.value = 'was-validated';
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col d-none d-sm-block"></div>
            <div class="col">
                <img src="../assets/green.svg" alt="Logo" width="300" height="250" class=" mt-3 mt-sm-5 mx-auto d-block">

                <form :class="`${validate}`" @submit.prevent="submitData" novalidate>
                    <div class="mb-3">
                        <input type="email" class="form-control mt-4 mt-sm-5" v-model.trim="email" disabled required>
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control" v-model.trim="name" required>
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary mt-3" :disabled="userStore.loadingUser">Actualizar</button>
                    </div>
                    <div class="d-flex justify-content-center mb-2 mb-sm-3 mt-5">
                        <button type="button" class="btn btn-link"><RouterLink to="/recuperacion">¿Desea cambiar la contraseña?</RouterLink></button>
                    </div>
                    <div :class="`alert ${res == 'Informacion actualizada.' ? 'alert-success' : 'alert-danger'} mt-4 text-center`" role="alert" v-if="res">{{ res }}</div>
                </form>
            </div>
            <div class="col d-none d-sm-block"></div>
        </div>
    </div>
</template>