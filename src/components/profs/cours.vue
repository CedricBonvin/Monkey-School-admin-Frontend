<template>
    <div>       
        <h2>Saison {{ saisonString }}</h2>
        <div class="clickToGo">click to go !!</div>

        <!-- BOX SAISON -->
        <div class="contSaisonCours">
            <div class="itemCours" v-for="(item, nomCours) in allCours" :key="item._idCours">
                <div @click="goTo(nomCours)">
                    <div class="nomCours">{{ nomCours}} :</div>
                    <div>
                         {{ item[0].cours.jour }} <span class="coursHeure"> ( {{ item[0].cours.heure }} ) </span>
                        
                    </div>
                </div>    
            </div>
        </div>

        <!-- BOX DATES -->
        <div class="coursName" v-for="(datesCours , nameCours) in allCours" :key="nameCours.nomCours">
            <div class="coursNom" :id="nameCours">{{ nameCours }} :</div>
            <div class=" row header">
                <div class="celluleDate celluleDateHeader ">Date</div>
                <div class=" colProfHeader">Prof 1</div>
                <div class=" colProfHeader">Prof 2</div>
                <div class=" colProfHeader">Prof 3</div>
                <div class=" colProfHeader">Prof 4</div>
            </div>
            <div class="row" v-for="item in datesCours" :key="item._idCours">
                <div class="celluleDate">{{ parseDate(item.date)  }}</div>
                <div :class="classObject(item.idProf_1)" @click="ajouterProf(item._idDatesCours, 'idProf_1')" class="colProf "> {{ nomProf( item.prof_1)}}</div>
                <div :class="classObject(item.idProf_2)" @click="ajouterProf(item._idDatesCours, 'idProf_2')" class="colProf "> {{ nomProf( item.prof_2)}}</div>
                <div :class="classObject(item.idProf_3)" @click="ajouterProf(item._idDatesCours, 'idProf_3')" class="colProf "> {{ nomProf( item.prof_3)}}</div>
                <div :class="classObject(item.idProf_4)" @click="ajouterProf(item._idDatesCours, 'idProf_4')" class="colProf "> {{ nomProf( item.prof_4)}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : "coursProf",
    data(){
        return{
            saison : "",
            allCours : {}, // objet trié depuis coursSaison 
            coursSaison : [],
            user : {},
            saisonString : ""
        }
    },
    methods : {
        async callSaisonUser(){
            const token = sessionStorage.getItem("token")
            const res = await fetch(`${this.$store.state.HOST}/prof/cours?token=${token}`)
            const response = await res.json()
            const {coursSaison , prof, message, saisonString } = response
            if (res.ok){
                console.log(response)
                 // NETOYAGE
                this.coursSaison = []
                this.allCours = {}
                // INSERTION
                this.saisonString = saisonString
                this.coursSaison = coursSaison
                this.prof = prof
                // TRIAGE DES COURS RÉCUPERÉ
                for (let item of coursSaison){
                    this.allCours[item.cours.nom] ? "" : this.allCours[item.cours.nom] = []
                    this.allCours[item.cours.nom].push(item)
                }
                console.log(this.allCours)
            }else{
                this.$store.commit("popUpClass", { succes : false, message : message})
            }
        },
        parseDate(date){
            let newDate = new Date(date)
            return newDate.toLocaleDateString("fr-FR",{month :"long",day:"numeric"})
        },
        goTo(target){
            console.log(target)
            let div =  document.getElementById(target)
            div.scrollIntoView({behavior: "smooth", block : "center"})
        },
        async ajouterProf(idCours,colonne){
            console.log(idCours)
            const token = sessionStorage.getItem("token")
            const res = await fetch(`${this.$store.state.HOST}/prof/cours/update?token=${token}`,{
                method : "put",
                body : JSON.stringify({idCours : idCours, colonne : colonne}),
                headers : {"content-type" : "application/json"}
            })
            const response = await res.json()
            let {message} = response
            if (res.ok){
                this.$store.commit("popUpClass",{succes: true, message: message})
                this.callSaisonUser()
            }else {this.$store.commit("popUpClass", {succes: false, message: message })}
        },
        classObject(id){
            return {
                celluleLibre : !id ,
                cellulePrise : id != this.prof._idProf ,
                celluleDuProf : id === this.prof._idProf ,
            }
        },
        nomProf(prof) {
            if(prof) return prof.prenom 
        }
        
    },
    mounted(){
        this.callSaisonUser()
    }
}
</script>

<style lang="scss" scoped>
    $colorVide : rgb(173, 75, 173);
    .row{
        display: flex;
        padding: 10px 0;
        text-align: center;
    }
    .coursName{
        margin: 50px 0;
        overflow: scroll;
       
    }
    .nomCours{
        font-weight: bold;
        padding-right: 10px;
        font-size: 1.2em;
    }
    .coursHeure{
        padding-right: 20px;
        font-size: 0.8em;
    }
    .itemCours{      
        margin: 20px 0;
        cursor: pointer;
        &:hover{
            color: blue;
            transform: scale(1.1);
            transition: .3s;
        }
    }
    h2{
        font-size: 1.8em;
        text-decoration: underline;
        font-style: italic;

    }
    .contSaisonCours{
        width: 95%;
        margin: auto;
        display: flex;
        overflow: auto;
        white-space: nowrap;
        position: sticky;
        z-index: 100;
        top: 0;
        background: #a6cbee;
        padding: 10px 30px;
        border-radius: 10px;
    }
    .coursNom{
        position: relative;
        display: inline-block;
        font-weight: bold;
        font-style: italic;
        font-size: 1.8em;
        margin-bottom: 20px;
        &::before{
            content: "";
            position: absolute;
            bottom: -5px;
            width: 50%;
            border: solid 2px teal;
  
        }
    }
    .header{
        color: white;
        font-weight: bold;
        color: black;
        .colProf{
            padding: 0 25px;
            min-width: 100px;
        }
    }
    .colProf{
        min-width: 100px;
        background: $colorVide;
        border-radius: 10px;
        padding: 25px;
        color: rgb(33, 33, 33);
        font-weight: bold;
        cursor: pointer;
        &:hover{
            background: rgb(103, 103, 103);
        }
    }
    .colProfHeader{
        min-width: 100px;
        border-radius: 10px;
        padding: 10px;
        font-weight: bold;
        background: gray;
        border-radius: 0px;
        color: white;
        
        cursor: pointer;
        &:hover{
            background: rgb(103, 103, 103);
        }
    }
    .celluleDate{
        display: flex;
        padding-right: 10px;
        min-width: 100px;
        justify-content: center;
        align-items: center;  
        background: #e4e4e4;  
    }
    .celluleDateHeader{
        background: gray;
        color: white;
    }
    .clickToGo{
        font-weight: bold;
        color: $colorVide;
    }

    .cellulePrise{
        background: #f7c17d;
    }
    .celluleLibre{
        background: #ade8ad;
    }
    .celluleDuProf{
        background: #8888f5;
        color: white;
    }
    @media screen and(max-width : 500px){
        .coursNom{
            font-size: 35px;
        }
        .itemCours{
            margin: 10px;
        }
        .link{
            margin-bottom: 0px !important;
        }
        .clickToGo{
            text-align: center;
            font-size: 20px;
        }
        .coursNom{
            padding-left: 10px;
        }
        h2{
            font-size: 30px;
            text-align: center;
            font-weight: 900;
            margin-bottom: 40px;
            margin-top: 30px;
        }
    }
</style>