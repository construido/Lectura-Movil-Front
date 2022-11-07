<template>
    <div id="app">
        <footer class="bg-light fixed-bottom">
        <!--<footer style="position: sticky; bottom: 0;" class="bg-light fixed-bottom">-->
            <div class="text-center p-3">
                <div class="d-grid gap-2">
                    <b-button @click="$router.go(-1)" variant="danger"> Volver </b-button>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'BtnAtras',
}
</script>