<template>
  <div class="contBase">
    <h2>Historique  </h2>
    <div class="userNom"> {{ prof.nom }} {{ prof.prenom }} </div>
    <div class="userNom"> {{ saisonString }} </div>
    <!-- ! ******  APPELLE POUR LE CHOIX DES SAISONS !! ATTENTION LE SALAIRE DOIT ETRE POUR CHAQUE ANNEE DIFFERENT   ******* -->
    <!-- ! POUR L'INSTANT SANS HISTORIQUE -->
    <!-- <select @change="callForHistorique(this.saisonChoice)" v-model="this.saisonChoice">
        <option  v-for="item in allSaison" :key="item._idSaison" :value="item._idSaison"> {{ item.saison }}</option>
    </select> -->

    <div v-for="(datesDuCours , nomCours) in allCours" :key="nomCours[datesDuCours]">
        <div class="nomCours">{{ nomCours}} <span class="jour" >( {{ datesDuCours[0].cours.jour}} ) </span></div>
        <div class="header">
            <div class="celluleDate">Date</div>
            <div class="celluleNomCours">Cours</div>
            <div class="celluleDuree">Durée /H</div>
        </div>
        <div v-for="item in datesDuCours" :key="item.nom">
            <div class="row">
                <div class="celluleDate">{{ parseDate(item.date) }}</div>
                <div class="celluleNomCours">{{ item.cours.nom }}</div>
                <div class="celluleDuree">{{ item.cours.duree }}</div>
            </div>
        </div>
        <hr>
        
        <div class="contTotalCours">
            <div class="boxTotalDuCours">
                <div class="calculCours"><div>Nbr de cours :</div> <div>{{ datesDuCours.length }}</div></div>
                <div class="calculCours"><div>Nbr d'heure : </div><div>{{ nbrHeureParsCours(datesDuCours) }}</div></div>
                <div class="calculCours"><div>Tarif heure : </div><div>{{ prof.tarifHeure }}</div></div>
                <hr>
                <div>Total CHF : {{ totalCHFCours(datesDuCours) }} </div>
            </div>
        </div>
    </div>
    <hr>
    <hr>
    <div class="contTotal">
        <div class="totalName">TOTAL SAISON :</div>
        <div class="boxTotal">
            <div>
                <div> Prof : {{ prof.nom }} {{ prof.prenom }}</div>
                <div> Tarif Horaire : {{ prof.tarifHeure }}</div>
            </div>
            <div>
                <div>Nbr de cours : {{ totalCoursAnne }} </div>
                <div>Nbr heure : {{ totalHeureAnne() }} </div>
                <div>Total CHF : {{ this.prof.tarifHeure * this.totalHeure }}</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
"use strict"

export default {
    name : "historique",
    data(){
        return{
            prof : {},
            allCours : {},
            allDates : [],
            allSaison : [],
            saisonChoice : "",
            totalCoursAnne : 0,
            totalHeure : 0,
            saisonString : ""
        }
    },
    methods : {
        async callForHistorique(idSaison){
            // clean
            this.allCours = {}

            const token = sessionStorage.getItem("token")
            const res = await fetch(`${this.$store.state.HOST}/prof/historique?token=${token}&idSaison=${idSaison || ""}`)
            const response = await res.json()
            const {message, saisons, prof, allDates , saisonString } = response
            if(res.ok){
                this.allSaison = saisons
                this.prof = prof
                this.totalCoursAnne = allDates.length
                this.allDates = allDates
                this.saisonString = saisonString
                for (let date of allDates){
                    this.allCours[date.cours.nom] ? "" : this.allCours[date.cours.nom] = []
                    this.allCours[date.cours.nom].push(date)
                 }

            }else {this.$store.commit("popUpClass",{succes : false, message : message})}
        },
        parseDate(date){
            let dateParse = new Date(date)
            return dateParse.toLocaleDateString("fr-FR",{month : "long", day:"numeric", year:"numeric"})
        },
        nbrHeureParsCours(tabDate){
            let nbrHeure = 0
            for (let item of tabDate){
                nbrHeure += item.cours.duree
            }

            return nbrHeure
        },
        totalCHFCours(tabDates){
            let nbrHeure = 0
            for (let item of tabDates){
                nbrHeure += item.cours.duree
            }

            return nbrHeure * this.prof.tarifHeure

        },
        totalHeureAnne(){
            let heure = 0
            for(let date of this.allDates){
                heure += date.cours.duree
            }
            this.totalHeure = heure
            return heure
        }
       
    },
    mounted(){
        this.callForHistorique()
    }
}
</script>

<style lang="scss" scoped>
    h2{
        text-align: center;
        font-weight: bold;
        font-size: 2.8em;
        margin-bottom: 0;
    }
    .contBase{
        padding: 20px;
    }
    .header{
        display: flex;
        background: gray;
        color: white;
    }
    .nomCours{
        font-weight: bold;
        margin: 20px 0;
        font-size: 1.5em;
    }
    .row{
        display: flex;
    }
    .celluleDate{
        width: 130px;
    }
    .celluleNomCours{
        width: 100px;
    }
    .celluleDuree{
        width: 80px;
    }
    .boxTotalDuCours{
        text-align: right;
    }
    .contTotalCours{
        display: flex;
        justify-content: right;
        padding: 10px;
        hr{
            margin: 5px 0;
        }
    }
    .userNom{
        text-align: center;
        font-style: italic;
        font-weight: 500;
    }
    .contTotal{
        margin: 40px 0;
        background: rgb(229, 229, 229);
        padding: 20px;
    }
    .boxTotal{
       
        display: flex;
        justify-content: space-between;
    }
    .totalName{
        font-weight: bold;
        font-size: 1.5em;
        margin-bottom: 30px;
        font-style: italic;
        text-decoration: underline;
    }
    .calculCours{
        min-width: 120px;
        display: flex;
        justify-content: space-between;
    }
    @media screen and (min-width : 500px){
        .celluleNomCours{
            width: 150px;
        }
        .celluleDate{
            width: 150px;
     }
     .jour{
        font-size: 0.7em;
        font-weight: 200;
     }
        
}
</style>