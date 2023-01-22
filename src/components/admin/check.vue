<template>
  <div>
        <h2>VUE D'ENSEMBLE</h2>

        <!-- TRIE PAR PROF -->
        <h2>Choix de recherche: </h2>
        <div class="field">
            <label for="">prof : </label>
            <select v-model="recherche.idProf" >
                <option v-for="item in allProfs" :key="item._idProf" :value="item._idProf">{{ item.prenom }}</option>
            </select>
        </div>

        <div class="field">
            <label for="">Saison : </label>
            <select v-model="recherche.idSaison" >
                <option v-for="item in allSaisons" :key="item._idSaison" :value="item._idSaison">{{ item.saison }}</option>
            </select>
        </div>

        <button @click="CallRecherche()" class="button button_valid">RECHERCHE</button>

        <div class="resultat">
            <div>Nbr de cours : {{  this.allDates.length }}</div>
            <div>Nbr de heure : {{  NbrHeureTotalCHF() }}</div>
            <div><span class="total">TOTAL CHF : </span>{{  this.totalCHF}}.-</div>
        </div>

        <div class="boxDates">
            <h2>Date : {{ this.prof.nom }} {{ this.prof.prenom }}</h2>
            <div class="row" v-for="item in allDates" :key="item._idDatesCours">
                <div class="cellule">{{ item.cours.nom }}</div> 
                <div class="cellule"> {{ parseDate(item.date)}} </div>
            </div>
        </div>


  </div>
</template>

<script>
export default {
    name : "check",
    data(){
        return{
            allSaisons : [],
            allTypeCours : [],
            allProfs : [],
            allDates : [],
            recherche : {
                idSaison :null,
                idProf : null
            },
            totalCHF : 0,
            totalHeure : 0,
            prof : {}
            
        }
    },
    methods : {
        async call(){
            const token = sessionStorage.getItem("token")
            const res = await fetch(`${this.$store.state.HOST}/admin/check?token=${token}`)
            const response = await res.json()
            const { message , allSaisons, allTypeCours, profs } = response
            if (res.ok){
                this.allTypeCours = allTypeCours
                this.allSaisons = allSaisons
                this.allProfs = profs
            }else {this.$store.commit("popUpClass", {succes : false, message})}
        },
        async CallRecherche(){
            
            const token = sessionStorage.getItem("token")
            try {
                const res = await fetch(`${this.$store.state.HOST}/admin/check/recherche?token=${token}`,{
                    method : "post",
                    body : JSON.stringify(this.recherche),
                    headers : {"content-type" : "application/json"}
                })
                const response = await res.json()
                const {message ,body, prof} = response
                if(res.ok){
                    this.allDates = body
                    this.prof = prof
                }else {this.$store.commit("popUpClass", {succes : false , message : message })}
            } catch (error) {
                console.log(error)
            }
            
        },
        parseDate(date){
            let newDate = new Date(date)
            return newDate.toLocaleDateString("fr-FR")
        },
        NbrHeureTotalCHF(){
            let totalHeure = 0
            for (let item of this.allDates){
                console.log(item.cours.duree)
                totalHeure += item.cours.duree
            }
            this.totalCHF = totalHeure * this.prof.tarifHeure
            return totalHeure
        }
        
    },
    mounted(){
        this.call()
    }
}
</script>

<style lang="scss" scoped>

    .field{
        width: 300px;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        margin: 20px 0;
    }
    .choixDeRecherche{
        font-weight: bold;
        margin: 20px 0;
        cursor: pointer;
        &:hover{
            color: blue;font-size: 1.2em;

            transition:  .3s;
        }
    }
    .boxChoix{
        background: rgb(228, 228, 228);
        padding: 20px;
        
    }
    .cellule{
        padding: 10px;
        width: 150px;
    }
    .row{
        display: flex;
        flex-flow: row wrap;   
    }
    .resultat{
        border: solid 1px gray;
        padding: 10px;
        margin: 50px 0;
        div{
            margin: 10px;
        }
        .total{
            font-weight: bold;
        }
    }
  

</style>