<script setup>
import { useUserStore } from '../stores/user';
import { useMix } from '../composables/mix';
import { ref } from 'vue';

const userStore = useUserStore();
const { res, timer } = useMix();

const email = ref(userStore.userData.email);
const nombre = ref(userStore.userData.nombre);

const envioDatos = async () => {
    if (nombre.value.length < 3) {
        res.value = "El nombre debe tener al menos 3 letras.";
        timer(res, 5000);
    }
    
    else {
        try {
            res.value = await userStore.updateName(nombre.value);
        
        } catch (error) {
            res.value = 'Hubo un problema.';
            console.log(error.code, error.message);

        } finally {
            timer(res, 5000);
        }
    }
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-4"></div>
            <div class="col">
                <h1 class="text-center my-5">Perfil de usuario</h1>

                <form @submit.prevent="envioDatos">
                    <div class="mb-3">
                        <label for="email" class="form-label">Correo Electrónico</label>
                        <input type="email" class="form-control" id="email" v-model.trim="email" disabled required>
                    </div>
                    <div class="mb-3">
                        <label for="text" class="form-label">Nombre de la empresa</label>
                        <input type="text" class="form-control" id="text" v-model.trim="nombre" required>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary mt-3">Actualizar</button>
                    </div>
                    <div :class="`alert ${res == 'Informacion actualizada.' ? 'alert-success' : 'alert-danger'} mt-4 text-center`" role="alert" v-if="res">{{ res }}</div>
                </form>
            </div>
            <div class="col-4"></div>
        </div>
    </div>
</template>