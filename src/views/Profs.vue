<template>
    <div>
        <body>
            <div class="navBody">
                <div @click="showsPage('CoursProf', $event)" class="link active">Cours</div>
                <div @click="showsPage('Info', $event)" class="link ">Mes Infos</div>
                <div @click="showsPage('historique', $event)" class="link ">Historique</div>
            </div>
            <div class="body">
                    <cours v-if="this.show.CoursProf" />
                    <InfoPerso v-if="this.show.Info" />
                    <historique v-if="this.show.historique" />
            </div>
        </body>
    </div>
</template>

<script>
import InfoPerso from '../components/profs/infoPersonel.vue'
import Cours from '../components/profs/cours.vue'
import Historique from '../components/profs/historique.vue'

export default {
  components: { InfoPerso, Cours, Historique },
   
    data(){
        return{
            show : { 
                CoursProf : true,
                Info : false,
                historique : false
            }
        }
    },
    methods : {
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
    },
    mounted(){

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
        min-width: 150px;
        background: black;
        padding: 20px;
        color: white;
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
    @media screen and (max-width : 500px){
        body{
            width: 100%;
            flex-flow: column;
        }
        .body{
            width: 100%;
            padding: 0px;
        }
        .navBody{
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;     
        }
        .link{
            font-size: 16px;
            margin: 0px;
        }
        
    }
</style>