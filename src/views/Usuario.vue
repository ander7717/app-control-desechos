<script setup>
import { useUserStore } from '../stores/user';
import { useMix } from '../composables/mix';
import { ref } from 'vue';
import { db, storage } from '../firebaseConfig';
import { ref as fileRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from "firebase/firestore"; 

const userStore = useUserStore();
const { res, timer } = useMix();

const email = ref(userStore.userData.email);
const name = ref(userStore.userData.name);
const validate = ref('needs-validation')
const image = ref(null);
const expDate = ref(userStore.userData.expDate);

const submitData = async () => {
    if(document.getElementById('main').checkValidity()) {
        try {
            res.value = await userStore.updateName(name.value);
            associateRacda();
        
        } catch (error) {
            res.value = 'Hubo un problema.';
            console.log(error.code, error.message);

        } finally {
            timer(res, 5000);
        }
    }

    validate.value = 'was-validated';
};

const selectPhoto = async e => {
    image.value = e.target.files[0];
    await uploadPhoto();
};

const uploadPhoto = async () => {
    try {
        if(image.value !== null && image.value !== undefined){
        const storageRef = fileRef(storage, `images/users/${image.value.name}`);
        const metaData = { contentType: 'image/png'};

        await uploadBytes(storageRef, image.value, metaData);
        await loadPhoto()
        };

    } catch (error) {
        console.log(error.code, error.message);
    };
};

const loadPhoto = async () => {
    try {
        const url = await getDownloadURL(fileRef(storage, `images/users/${image.value.name}`));
        await associatePhoto(url)
        await userStore.updatePhoto(url);

    } catch (error) {
        console.log(error.code, error.message);
    };
};

const associatePhoto = async url => {
    try {
        const docRef = doc(db, "user", userStore.userData.uid);

        await setDoc(docRef, {
            url
        }, { merge: true });

    } catch (e) {
        console.log(error.code, error.message);
    };
};

const associateRacda = async () => {
    try {
        const docRef = doc(db, "user", userStore.userData.uid);

        await setDoc(docRef, {
            expDate: expDate.value
        }, { merge: true });

        userStore.userData = {...userStore.userData, expDate: expDate.value};

    } catch (e) {
        console.log(error.code, error.message);
    };
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col d-none d-sm-block"></div>
            <div class="col">
                <form enctype="multipart/form-data" class="d-grid" @submit.prevent>
                    <label for="inputImg"><img :src= userStore.userData?.photo id="userImg" alt="Logo" width="300" height="250" style="cursor: pointer" class=" mt-3 mt-sm-5 mx-auto d-block rounded-circle"></label>
                    <input type="file" id="inputImg" class="form-control mb-3" accept="image/*" @change="selectPhoto($event)" style="display: none; visibility: none">
                </form>

                <form id="main" :class="`${validate}`" @submit.prevent="submitData" novalidate>
                    <div class="mb-3">
                        <input type="email" class="form-control mt-4 mt-sm-5" v-model.trim="email" disabled required>
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control" v-model.trim="name" required>
                    </div>
                    <div class="mb-3">
                        <input type="date" class="form-control" v-model="expDate" required>
                        <div class="form-text ms-1">Fecha de vencimiento del RACDA.</div>
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