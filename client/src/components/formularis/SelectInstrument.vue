<template>
    <b-form-group label="Instrument" label-for="input-x" >
        <b-form-select v-model="corda" :options="cordes" required></b-form-select>
    </b-form-group>
</template>

<script>
    export default {
        name: 'selectInstrument',
        props: ['corda'],
        data() {
            return {
                cordes: [
                    {text: 'Clarinet', value: 'Clarinets'},
                    {text: 'Flauta', value: 'Flautes'},
                    {text: 'Oboes', value: 'Oboes'},
                    {text: 'Saxo', value: 'Saxos'},
                    {text: 'Tuba', value: 'Tubes'},
                    {text: 'Trombo', value: 'Trombons'},
                    {text: 'Trompeta', value: 'Trompetes'},
                    {text: 'Pecusió', value: 'Percusionistes'},
                    {text: 'Trompa', value: 'Trompes'},
                    {text: 'Fagot', value: 'Fagotos'},
                    {text: 'Bombardí', value: 'Bombardins'}
                ],
            }
        }
    }
</script>