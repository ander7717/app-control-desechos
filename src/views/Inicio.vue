<script setup>

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
                        <label for="inputDesecho" class="form-label">Desecho</label>
                        <select id="inputDesecho" class="form-select">
                        <option selected>...</option>
                        <option>...</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="inputTratamiento" class="form-label">Tratamiento</label>
                        <select id="inputTratamiento" class="form-select">
                        <option selected>...</option>
                        <option>...</option>
                        </select>
                    </div>
                    <div class="row mt-4">
                        <div class="col-3">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked>
                                <label class="form-check-label" for="gridRadios1">
                                    Cantidad
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                                <label class="form-check-label" for="gridRadios2">
                                    Peso
                                </label>
                            </div>
                        </div>
                        <div class="col-6 mt-2">
                            <input type="number" class="form-control">
                        </div>
                        <div class="col-3 mt-2">
                            <select class="form-select">
                            <option selected>und.</option>
                            <option>und.</option>
                            </select>
                        </div>
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
            <td>16 unid</td>
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