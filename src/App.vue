<template>
  <div>
    <pop-up/>
    <router-view/>
  </div>
</template>

<script>
import PopUp from './components/template/popUp.vue'

export default {
  components: {PopUp  },
    name : "App",
    data(){
        return{
            user : {}
        }
    }
}
</script>

<style lang="scss">
$colorValid : rgb(65, 143, 65);
$colorDanger : rgb(170, 79, 63);
*{
  font-family: "liberta sans-serif";
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  font-size: 18px;
  input{
    display: inline-block;
  }
  button{
    border: none;
  }
}
h1{
  font-size: 1.6em;
}
.button{
  padding: 10px 15px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  
  &_valid{
    background: $colorValid ;
    color: white;

    &:hover{
      background: darken($colorValid , 10%);
      transform: scale(1.05);
      transition: .3s;
      box-shadow: 0 0 30px 2px rgb(215, 213, 213);
    }
  }
  &_danger{
    background: $colorDanger ;
    color: white;

    &:hover{
      background: darken($colorDanger , 10%);
      transform: scale(1.05);
      transition: .3s;
      box-shadow: 0 0 30px 2px rgb(215, 213, 213);
    }
  }
}
h2{
  font-size: 1.5em;
  margin: 20px 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.error{
  color: $colorDanger;
  font-weight: bold;
}
@media screen and (max-width : 500px){
	*{
        font-size: 14px;
        h2{
          font-size: 1.2em;
        }
	}
        
}



</style>
