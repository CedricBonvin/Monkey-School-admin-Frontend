<template>
    <div>
        <banner />
        <body>
            <div class="navBody">
                <div @click="showsPage('prof', $event)" class="link">Prof</div>
                <div @click="showsPage('saison', $event)" class="link">Saison</div>
                <div @click="showsPage('cours', $event)" class="link">Cours</div>
                <div @click="showsPage('check', $event)" class="link">Check</div>
            </div>
            <div class="body">
                <Prof_create v-if="show.prof" />
                <cours  v-if="show.cours" />
                <saison v-if="show.saison" />
                <check v-if="show.check" />
            </div>
        </body>
    </div>
</template>

<script>
import Check from '../components/admin/check.vue'
import Cours from '../components/admin/cours.vue'
import Prof_create from '../components/admin/profs.vue'
import Saison from '../components/admin/saison.vue'
import banner from '../components/template/headers.vue'
export default {
    components : {banner, Prof_create, Cours, Saison, Check},
    name : "Admin",
    data(){
        return{
            show : {
                prof : true,
                cours : false,
                saison : false,
                dateCours : false,
                check : false
            }
        }
    },
    methods :{
        showsPage(page, e){
            const tabLink = document.querySelectorAll(".active")
            for (let item of tabLink){
                item.classList.remove("active")
            }
            e.target.classList.add("active")

            for(let item in this.show){
                this.show[item] = false
            }
            this.show[page] = true
        }
    }
}
</script>

<style lang="scss" scoped>
    body{
        display: flex;
        min-height: 100vh;
    }
    .body{
        padding: 30px;
        width: 100%;
        margin-bottom: 100px;
    }
    .navBody{
        width: 20%;
        background: lightgray;
        padding: 20px;
    }
    .link{
        font-weight: bold;
        margin-bottom: 20px;
        cursor: pointer;
    }
    .active{
        color: green;
        font-weight: bold;
        transform: scale(1.05);
        font-size: 1.2em;
    }
</style>