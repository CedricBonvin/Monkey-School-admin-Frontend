<template>
    <div class="cont">
        <h1>{{ user.prenom }} {{ user.nom }}</h1>
        <h2>Mes infos :</h2>

        <div class="boxCreate">
            <div class="info">
                <div class="field">
                    <label >Nom :</label>
                    <input type="text" v-model="user.nom">
                </div>
                <div class="field">
                    <label >Prénom :</label>
                    <input type="text" v-model="user.prenom">
                </div>
                <div class="field">
                        <label >Date de naissance :</label>
                        <input type="date" v-model="user.dateNaissance">
                </div>
                <div class="field">
                        <label >Npa :</label>
                        <input type="number" v-model="user.npa">
                </div>
                <div class="field">
                        <label >Ville :</label>
                        <input type="text" v-model="user.ville">
                </div>
                <div class="field">
                        <label >Adresse :</label>
                        <input type="text" v-model="user.adresse">
                </div>
                <div class="field">
                        <label >Nationalité :</label>
                        <input type="text" v-model="user.nationalite">
                </div>
                <div class="field">
                        <label >permis :</label>
                        <input type="text" v-model="user.permis">
                </div>
                <div class="field">
                        <label >Télépnonne :</label>
                        <input type="text" v-model="user.telephonne">
                </div>
                <div class="field">
                        <label >E-mail :</label>
                        <input type="text" v-model="user.mail">
                </div>
                <div class="field">
                        <label >Banque :</label>
                        <input type="text" v-model="user.banque">
                </div>
                <div class="field">
                        <label >IBAN :</label>
                        <input type="text" v-model="user.iban">
                </div>
                <div class="field">
                        <label >No AVS :</label>
                        <input type="text" v-model="user.avs">
                </div>
                <div class="field">
                        <label>Tarif/heure :</label>
                        <input type="number" :value="tarifHeure" disabled>
                </div>
            </div>
            <button @click="modifierInfo" class="button button_valid">Modifier mes infos</button>
        </div>
        <div class="contPw">
            <h2>Password :</h2>
            <div class="boxModifierPw">
                <div class="field fieldPw">
                    <label for="oldPw">Mot de passe actuel :</label>
                    <input type="text" v-model="pw.oldPw">
                </div>
                <div class="field fieldPw">
                    <label for="newPw">Nouveau password :</label>
                    <input type="text" v-model="pw.newPw">
                </div>
                <button @click="modifierPw()" class="button button_valid">Modifier password</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : "adminProf",
    data(){
        return{
            user : {},
            pw : {},
            tarifHeure : 0
        }
    },
    methods: {
        async callUser(){
            const token = sessionStorage.getItem("token")
            const res = await fetch(`${this.$store.state.HOST}/prof/info?token=${token}`)
            const response = await res.json()
            const {message , prof, tarifHeure} = response
            if (res.ok){
                this.user = prof
                this.tarifHeure = tarifHeure
            }else{ this.$store.commit("popUpClass",{succes : false, message : message})}
        },
        async modifierInfo(){
            const token = sessionStorage.getItem("token")
            const res = await fetch(`${this.$store.state.HOST}/prof/info/modifierInfo?token=${token}`,{
                method : "put",
                body : JSON.stringify(this.user),
                headers : {"content-type" : "application/json"}
            })
            const response = await res.json()
            const { message, prof } = response
            if (res.ok){
                this.$store.commit("popUpClass", {succes : true, message : message})
                this.user = prof
            }else{this.$store.commit("popUpClass", {succes : false, message : message})}
        },
        async modifierPw(){
            const token = sessionStorage.getItem("token")
            const res = await fetch(`${this.$store.state.HOST}/prof/info/modifierPw?token=${token}`,{
                method : "put",
                body : JSON.stringify(this.pw),
                headers : {"content-type" : "application/json"}
            })
            const response = await res.json()
            const {message, prof} = response
            if(res.ok){
                this.$store.commit("popUpClass", {succes : true, message : message})
                this.user = prof
            }else{this.$store.commit("popUpClass", {succes : false, message : message})}
        }
    },
    mounted(){
        this.callUser()
    }
}
</script>

<style lang="scss" scoped>

    .field{
        width: 400px;
        display: flex;
        justify-content: space-between;
        margin: 15px 0;
        padding: 0 20px;
    }
    .fieldPw{
        flex-flow: column;
        input{
            width: 200px;
        }
    }
    .boxCreate{
        border: solid 1px gray;
        padding: 20px;
        border-radius: 5px;
        background: #cbd8e5;
        max-width: 600px;
    }
    h1{
        padding: 20px;
        padding-left: 0;
        font-size: 2em;
        font-style: italic;
        text-align: left;
    }
    .info{
        display: flex;
        flex-flow: row wrap;
    }
    .contPw{
        margin-top: 50px;
        max-width: 600px;
    }
    .boxModifierPw{
        padding: 20px ;
        border : solid 1px gray;
        background: rgb(226, 226, 226);
    }
    button{
        margin-top: 30px;
    }

    @media screen and (max-width : 500px) {
       
        .cont{
            padding: 10px;
            .field{
                input{
                    width: 200px;
                    padding: 2px;
                }
                flex-flow: column;
            }
        }
        .fieldPw{
            width: 100px;
            label{
                width: 150px;
            }
           
        }
        h2{
            font-size: 23px;
        }
    }
</style>