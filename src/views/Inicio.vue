<script setup>
import { onMounted, ref } from 'vue';
import { db } from '../firebaseConfig';
import { getDocs, query, orderBy, where, collection, addDoc } from 'firebase/firestore'; 
import { useUserStore } from '../stores/user';
import VueMultiselect from 'vue-multiselect';

const userStore = useUserStore();

const selectedMaterial = ref(null);
const selectedTreatment = ref(null);
const selectedCP = ref(null);
const cp = ref(null);
const empTrans = ref(null);
const racdaTrans = ref(null)
const racdaTrat = ref(null);
const empTrat = ref(null);
const validate = ref('needs-validation');
const inputData = ref(null);
const sm = ref('');
const st = ref('');
const scp = ref('');
const adding = ref(false);

const materialOptions = ['Pantalla', 'Teléfono', 'Computadora', 'Disco Duro (HDD)', 'Disco Sólido (SSD)', 'Ram', 'Tarjeta Madre', 'Procesador (CPU)', 'Tarjeta de Video (GPU)', 'Fuente de Poder (PSU)', 'Mouse'];
const treatmentOptions = ['Reciclaje', 'Reutilización/Reparación', 'Re-Valorización Energética', 'Eliminación'];
const cpOptions = ['uds', 'g', 'kg', 'tn'];

const getData = async () => {
  const getForm = document.querySelector('form')

  if(selectedMaterial.value !== null && selectedTreatment.value !== null && selectedCP.value !== null){
    sm.value = 'valid';
    st.value = 'valid';
    scp.value = 'valid';
  }
  else if(selectedMaterial.value === null && selectedTreatment.value === null && selectedCP.value === null){
    sm.value = 'invalid';
    st.value = 'invalid';
    scp.value = 'invalid';
  }
  else if(selectedMaterial.value === null && selectedTreatment.value === null){
    sm.value = 'invalid';
    st.value = 'invalid';
    scp.value = 'valid';
  }
  else if (selectedMaterial.value === null && selectedCP.value === null){
    sm.value = 'invalid';
    st.value = 'valid';
    scp.value = 'invalid';
  }
  else if (selectedTreatment.value === null && selectedCP.value === null){
    sm.value = 'valid';
    st.value = 'invalid';
    scp.value = 'invalid';
  }
  else if (selectedMaterial.value === null){
    sm.value = 'invalid';
    st.value = 'valid';
    scp.value = 'valid';
  }
  else if (selectedTreatment.value === null){
    sm.value = 'valid';
    st.value = 'invalid';
    scp.value = 'valid';
  }
  else if (selectedCP.value === null){
    sm.value = 'valid';
    st.value = 'valid';
    scp.value = 'invalid';
  }

  if(getForm.checkValidity()) {
    if(selectedMaterial.value !== null && selectedTreatment.value !== null && selectedCP.value !== null){
      adding.value = true;
      inputData.value = {desecho: selectedMaterial.value, tratamiento: selectedTreatment.value, cp: cp.value, selectedCP: selectedCP.value, empTrans: empTrans.value, racdaTrans: racdaTrans.value, empTrat: empTrat.value, racdaTrat: racdaTrat.value, uid: userStore.userData.uid};
      sm.value = st.value = scp.value = '';
      validate.value = 'needs-validation';

      await addItem(inputData.value);
      selectedMaterial.value = selectedTreatment.value = cp.value = selectedCP.value = empTrans.value = racdaTrans.value = empTrat.value = racdaTrat.value = null;
      adding.value = false;
    }
  }
  else{
    validate.value = 'was-validated';
  }
};

const addItem = async data => {
  try {
    await addDoc(collection(db, "item"), data)
    await getItems()
  } catch (error) {
    console.log(error.code, error.message);
  };
};

const getItems = async () => {
  const tabCont = document.getElementById('table-content');

  try {
    const q = query(collection(db, "item"), where("uid", "==", userStore.userData.uid), orderBy("desecho"));
    tabCont.innerHTML = '';
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      showData(tabCont, doc.data())
    });    
  } catch (error) {
    console.log(error.code, error.message);
  }
};

const showData = (table, data) => {
  table.innerHTML += `
                      <tr>
                        <td>${data.desecho}</td>
                        <td>${data.cp} ${data.selectedCP}</td>
                        <td>${data.tratamiento}</td>
                        <td>${data.empTrans}</td>
                        <td>${data.empTrat}</td>
                      </tr>
                      `
};

onMounted(() => {
  getItems();
});

</script>

<template>
  <div>
    <div class="d-grid gap-2 d-flex justify-content-end me-3 mt-3">
      <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Nuevo Registro</button>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Nuevo Registro</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="getData" :class="`row g-3 ${validate}`" novalidate>
              <div :class="`col-md-6 ${sm}`">
                <label class="form-label">Desecho</label>
                <VueMultiselect
                v-model="selectedMaterial"
                :options="materialOptions"
                :allow-empty="false"
                :show-labels="false"
                placeholder="..."
                />
              </div>
              <div :class="`col-md-6 ${st}`">
                <label class="form-label">Tratamiento</label>
                <VueMultiselect
                v-model="selectedTreatment"
                :options="treatmentOptions"
                :allow-empty="false"
                :show-labels="false"
                placeholder="..."
                />
              </div>
              <div class="col-6 mt-3">
                <label for="CP" class="form-label">Cantidad/Peso</label>
                <input type="number" min="0.01" step="0.01" oninput="validity.valid||(value='')" class="form-control" id="CP" v-model="cp" required>
              </div>
              <div :class="`col-3 mt-3 ${scp}`">
                <label class="form-label">Unidades</label>
                <VueMultiselect
                v-model="selectedCP"
                :options="cpOptions"
                :allow-empty="false"
                :show-labels="false"
                placeholder="..."
                />
              </div>
              <div class="col-8">
                <label for="inputAddress" class="form-label">Empresa de Transporte</label>
                <input type="text" class="form-control" id="inputAddress" v-model="empTrans" required>
              </div>
              <div class="col-4">
                <label for="inputAddress" class="form-label">Venc. RACDA</label>
                <input type="date" class="form-control" id="inputAddress" v-model="racdaTrans" required>
              </div>
              <div class="col-8">
                <label for="inputAddress2" class="form-label">Empresa Tratante</label>
                <input type="text" class="form-control" id="inputAddress2" v-model="empTrat" required>
              </div>
              <div class="col-4">
                <label for="inputAddress" class="form-label">Venc. RACDA</label>
                <input type="date" class="form-control" id="inputAddress" v-model="racdaTrat" required>
              </div>
              <div class="modal-footer">
                <button v-if ="!adding" type="submit" class="btn btn-primary">Registrar</button>
                <button v-else class="btn btn-primary" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Registrando...
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Desecho</th>
          <th scope="col">Cantidad o peso</th>
          <th scope="col">Tratamiento</th>
          <th scope="col">Emp. Transporte</th>
          <th scope="col">Emp. Tratamiento</th>
        </tr>
      </thead>
      <tbody id="table-content"></tbody>
    </table>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style>
.multiselect__placeholder {
  display: inline-block !important;
  margin-bottom: 0px !important;
  padding-top: 0px !important;
}

.multiselect.invalid .multiselect__tags {
  border: 1px solid #f86c6b !important;
}

.multiselect__option--highlight {
  background: #428bca !important;
}

.multiselect__option--highlight:after {
  background: #428bca !important;
}

.multiselect__tags {
  border: 1px solid #ced4da !important;
}

.multiselect__placeholder{
  margin-left: 10px;
  margin-top: 2px;
}

.multiselect__tag {
  background: #f0f0f0 !important;
  border: 1px solid rgba(60, 60, 60, 0.26) !important;
  color: black !important;
  margin-bottom: 0px !important;
  margin-right: 5px !important;
}

.multiselect__tag-icon:after {
  color: rgba(60, 60, 60, 0.5) !important;
}

.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: #f0f0f0 !important;
}

.multiselect__tag-icon:focus:after,
.multiselect__tag-icon:hover:after {
  color: red !important;
}

.multiselect__select:before {
    color: black !important;
    border-top-color: black !important;
}

.invalid .multiselect__tags {
  border-color: #f04124!important;
}

.valid .multiselect__tags {
  border-color: #198754!important;
}
</style>