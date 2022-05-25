<template>
    <div class="container">
        <b-card-group deck>
            <b-card header="MENÚ MÓVIL" header-tag="header" footer-text-variant="center">
                <slot></slot>
                <!-- <div class="d-grid gap-2">
                    <router-link class="btn btn-success btn-lg" :to="{name: 'Tareas'}"> LECTURACIÓN </router-link>
                    <router-link class="btn btn-success btn-lg" :to="{name: 'LecturaInspeccion'}"> INSPECCIÓN </router-link>
                    <router-link class="btn btn-success btn-lg" :to="{name: 'CelularServidor'}"> EN SERVIDOR </router-link>
                    <router-link class="btn btn-success btn-lg" :to="{name: 'Anormalidades'}"> ANORMALIDADES DE MEDIDOR </router-link>
                </div> -->
            </b-card>
        </b-card-group>
    </div>
</template>