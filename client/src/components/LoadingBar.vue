<template>
    <div class="loading-bar">
        <!-- <div class="filler coffe"></div> -->
        <div class="filler orange"></div>
        <div class="filler green"></div>
    </div>
</template>

<script>
    export default {
        name: 'LoadingBar',
    }
</script>

<style lang="scss" scoped>
    @import '../sass/colors';

    @keyframes loading {
        0% {
            width: 0;
        }
        100% { 
            width: 100%;
        }
    }
    .loading-bar {
        position: relative;
        width: 100%;
        background-color: white;
    }
    .filler {
        height: 6px;
        position: absolute;
    }
    .coffe {
        background-color: $coffe;
        animation: loading 2s linear infinite;
        animation-delay: 1.5s;
    }
    .orange {
        background-color: $atomic-orange;
        animation: loading .5s linear infinite;
        animation-delay: .5s;
    }
    .green {
        background-color: $medium-green;
        animation: loading 1s linear infinite;
    }

    .spin-wheel::after {
        content: '';
        border-width: 9px;
        border-style: solid;
        border-color: $coffe !important; /* Light grey */
        border-top-color: $tufts-blue !important; /* Blue */
        border-right-color: $atomic-orange !important; /* Blue */
        border-bottom-color: $atomic-orange !important; /* Blue */

        animation: spin 2s linear infinite;
        border-radius: 50%;
        position: absolute !important;
        width: 30px;
        height: 30px;
        margin: 0 auto;
        top: calc(50% - 15px);
        left: calc(50% - 15px);
        z-index: 99;
        background-color: #d3d3d366;
    }
</style>