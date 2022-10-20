<script setup>
import { useUserStore } from '../stores/user';
import { useMix } from '../composables/mix';
import { ref } from 'vue';

const userStore = useUserStore();
const { res, timer } = useMix();

const email = ref(userStore.userData.email);
const nombre = ref(userStore.userData.nombre);
const validate = ref('needs-validation')

const envioDatos = async () => {
    if(document.querySelector('form').checkValidity()){
        try {
            res.value = await userStore.updateName(nombre.value);
        
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
            <div class="col-4"></div>
            <div class="col">
                <img src="../assets/green.svg" alt="Logo" width="300" height="250" class=" mt-5 mx-auto d-block">

                <form :class="`${validate}`" @submit.prevent="envioDatos" novalidate>
                    <div class="mb-3 mt-5">
                        <input type="email" class="form-control" v-model.trim="email" disabled required>
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control" v-model.trim="nombre" required>
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary mt-3">Actualizar</button>
                    </div>
                    <div class="d-flex justify-content-center mb-3 mt-5">
                        <button type="button" class="btn btn-link" :disabled="userStore.cargandoUsuario"><RouterLink to="/recuperacion">¿Desea cambiar la contraseña?</RouterLink></button>
                    </div>
                    <div :class="`alert ${res == 'Informacion actualizada.' ? 'alert-success' : 'alert-danger'} mt-4 text-center`" role="alert" v-if="res">{{ res }}</div>
                </form>
            </div>
            <div class="col-4"></div>
        </div>
    </div>
</template>