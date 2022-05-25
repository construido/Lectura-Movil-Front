<template>
    <div id="app">
        <footer class="bg-light text-center text-lg-start fixed-bottom">
            <!-- Copyright -->
            <div class="text-center p-3">
                <div class="d-grid gap-2">
                    <b-button @click="$router.go(-1)" variant="danger"> Volver </b-button>
                </div>
            </div>
            <!-- Copyright -->
        </footer>
    </div>
</template>

<script>
export default {
    name: 'BtnAtras',
}
</script>