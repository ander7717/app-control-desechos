<script setup>
import { ref } from 'vue';
import VueMultiselect from 'vue-multiselect';

const selectedMaterial = ref(null);
const selectedTreatment = ref(null);
const selectedCP = ref(null);

const materialOptions = ['Pantalla', 'Teléfono', 'Computadora', 'Disco Duro (HDD)', 'Disco Sólido (SSD)', 'Ram', 'Tarjeta Madre', 'Procesador (CPU)', 'Tarjeta de Video (GPU)', 'Fuente de Poder (PSU)', 'Mouse'];
const treatmentOptions = ['Reciclaje', 'Reutilización/Reparación', 'Re-Valorización Energética', 'Eliminación'];
const cpOptions = ['uds', 'g', 'kg', 'tn'];
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
                <form class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label">Desecho</label>
                        <VueMultiselect
                        v-model="selectedMaterial"
                        :options="materialOptions"
                        :allow-empty="false"
                        :show-labels="false"
                        placeholder="..."
                        />
                    </div>
                    <div class="col-md-6">
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
                        <input type="number" class="form-control" id="CP">
                    </div>
                    <div class="col-3 mt-3">
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
                        <input type="text" class="form-control" id="inputAddress" placeholder="">
                    </div>
                    <div class="col-4">
                        <label for="inputAddress" class="form-label">Venc. RACDA</label>
                        <input type="date" class="form-control" id="inputAddress">
                    </div>
                    <div class="col-8">
                        <label for="inputAddress2" class="form-label">Empresa Tratante</label>
                        <input type="text" class="form-control" id="inputAddress2" placeholder="">
                    </div>
                    <div class="col-4">
                        <label for="inputAddress" class="form-label">Venc. RACDA</label>
                        <input type="date" class="form-control" id="inputAddress">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary">Registrar</button>
            </div>
            </div>
        </div>
        </div>

        <table class="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Desecho</th>
            <th scope="col">Cantidad o peso</th>
            <th scope="col">Tratamiento</th>
            <th scope="col">Emp. Transporte</th>
            <th scope="col">Emp. Tratamiento</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <th scope="row">1</th>
            <td>Pantallas</td>
            <td>16 uds</td>
            <td>Reciclaje</td>
            <td>Transporte Rodriguez C.A.</td>
            <td>Venezuela Limpia C.A.</td>
            </tr>
            <tr>
            <th scope="row">2</th>
            <td>Teclados</td>
            <td>900 kg</td>
            <td>Reciclaje</td>
            <td>Transporte Guzman C.A.</td>
            <td>Tratamientos Venezuela C.A.</td>
            </tr>
        </tbody>
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
  min-height: 10px;
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
</style>