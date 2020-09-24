<template>
    <article>
        <div class="assumpte">
            <small>Assumpte</small>
            <h3>{{email.assumpte}}</h3>
        </div>
        <div v-html="email.html" class="body-email"></div>

        <div class="data-email">
            <small>Data</small> 
            <div>
                {{ email.data | moment("DD MMMM YYYY")}} 
            </div>
        </div>

        <div v-if="email.adjunts && email.adjunts.length > 0" class="adjunts-email padding-targeta">
            <small>Adjunts</small>
            <ul>
                <li v-for="(adjunt, index) in email.adjunts" :key="index">
                    <a :href="adjunt.uri">{{adjunt.nom}}</a>
                </li>
            </ul>
        </div>
    </article>
</template>

<script>
    export default {
        name: 'Email',
        props: ['email']
    }
</script>

<style lang="scss">
    .assumpte {
        padding: 5px 15px;
    }

    .body-email {
        background-color: lightgrey;
        min-height: 200px;
        padding: 5px 0px;
        p {
            padding: 0 15px;
        }
    }

    .data-email {
        padding: 5px 15px 10px 13px;
    }

    .adjunts-email {
        border-top: 1px solid lightgray;
        ul {
            width: 100%;
            list-style-type: circle;
            li {
                display: list-item;
                a:hover {
                    text-decoration: underline !important;
                }
            }
        }
    }

</style>