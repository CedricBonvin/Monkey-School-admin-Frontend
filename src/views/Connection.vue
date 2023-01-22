<template>
    <div class="cont">
        <h2>Connection</h2>
        <div class="box">
            <div class="litteBox">
                <label for="name">Prénom :</label>
                <input name="name" type="text" v-model="user.user">
            </div>

            <div class="litteBox">
                <label for="password">Password :</label>
                <input name="password" type="text" v-model="user.pw">
            </div>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
        <button @click="connection()" class="button button_valid">Connection</button>
    </div>
</template>

<script>
export default {
    name : "Connection",
    data(){
        return{
            user : {},
            error : ""
        }
    },methods : {
        async connection(){
            try {
                let res = await fetch(`${this.$store.state.HOST}/connection`,{
                        method : "post",
                        body : JSON.stringify(this.user),
                        headers : {"content-type" : "application/json"}
                    })
                let response = await res.json()
                if(res.ok){
                    const {token, prof } = response
                    sessionStorage.setItem("token",token)
                    if(prof.role === "Super-Admin"){
                        this.$router.push("/admin")
                    }else if (prof.role === "prof"){
                        this.$router.push("/profs")
                    }
                }else{ this.error = response.message}             
            }    
            catch (error) {
                this.$store.commit("popUpClass", {succes : false, message : "Un problème est survenu"})
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .cont{

        position: absolute;
        top: 40%;
        left: 50%;
        padding: 20px 30px;
        width: 300px;
        border: solid 1px gray;
        border-radius: 5px;
        box-shadow: 0 0 15px 3px gray;
        transform: translate(-50%, -50%);
    }
    .litteBox{
        display: flex;
        flex-flow: column;
        margin-top: 10px;
    }
    input{
        width: 200px;
    }
    button{
        margin-top: 20px;
    }
    h2{
        text-decoration: underline;
        padding: 0;
        margin: 0;
        margin-bottom: 20px;
    }
    button{
        margin-top: 40px;
    }
</style>