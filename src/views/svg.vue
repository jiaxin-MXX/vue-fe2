<template>
  <div>
    <div class="contain">
      <header>
        <h1 class="title slide-bar">I'm alphardex.</h1>
        <p class="subtitle slide-bar">A CSS Wizard</p>
      </header>
    </div>
    <div class="contain2">
      <div class="button">
        <div class="border left"></div>
        <div class="border top"></div>
        <div class="border right"></div>
        <div class="border bottom"></div>
        <div class="text" style="color:rgb(0, 209, 178)">Start</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    async beforeCreate(){
        await new Promise((res)=>{
            setTimeout(()=>{
                res('beforeCreate')
            },5000)
        }).then((res)=>{
            console.log(res)
        })
    },
    async created(){
        await new Promise((res)=>{
            setTimeout(()=>{
                res('created')
            },4000)
        }).then((res)=>{
            console.log(res)
        })
    },
    async beforeMount(){
        await new Promise((res)=>{
            setTimeout(()=>{
                res('beforeMount')
            },3000)
        }).then((res)=>{
            console.log(res)
        })
    },
    async mounted(){
        await new Promise((res)=>{
            setTimeout(()=>{
                res('mounted')
            },2000)
        }).then((res)=>{
            console.log(res)
        })
    }
}
</script>
<style lang="stylus" scoped>
.contain,.contain2{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background: #222;
}

.slide-bar {
  position: relative;
  color: transparent;
  animation: fill-text-white 2s 1.6s forwards;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #35b9f1;
    transform: scaleX(0);
    transform-origin: left;
    animation: slide-in-out 2s cubic-bezier(0.75, 0, 0, 1) forwards;
  }
}

@keyframes slide-in-out {
  50% {
    transform: scaleX(1);
    transform-origin: left;
  }

  50.1% {
    transform-origin: right;
  }

  100% {
    transform: scaleX(0);
    transform-origin: right;
  }
}

@keyframes fill-text-white {
  to {
    color: white;
  }
}

header {
  .title,
  .subtitle {
    width: 250px;
    height: 30px;
  }

  .title {
    margin: 0;
    font-family: Lora, serif;
    font-size: 32px;
    line-height: 30px;

    &::before {
      background: #FF4081;
    }
  }

  .subtitle {
    margin: 10px 0 0 0;
    font-family: Lato, sans-serif;
    font-size: 12px;
    line-height: 30px;
    letter-spacing: 5px;
    text-transform: uppercase;
    animation-delay: 3.2s;

    &::before {
      background: #03A9F4;
      animation-delay: 2s;
    }
  }
}
.button{
  width 130px
  height 56px
  border 1px solid rgba(0, 209, 178, 0.35)
  display flex
  position relative
  align-items center
  justify-content center
}
.button::after {
  position: absolute;
  color rgb(0, 209, 178)
  content: "鑫♥";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateY(35%);
  transition: 0.25s ease-out;
}
.text{
  opacity: 1;
  transform: translateY(0);
  transition: 0.25s ease-in;
}
.button:hover{
  .top,.bottom {
    transform: scaleX(1);
  }
  .left,.right {
    transform: scaleY(1);
  }
  .left,.bottom{
    transition: 0.25s  ease
  }
  .top,.right{
    transition: 0.25s ease
  }
  .text {
    opacity: 0;
    transform: translateY(-25%);
    transition: 0.25s ease-out;
  }
}
.button:hover::after{
    opacity: 1;
    transform: translateY(0);
    transition: 0.25s  ease-in;
}
.border{
  position absolute
}
.left{
  left: -1px;
  width 1px;
  height 100%
  background: rgb(0,209,178);
  transform-origin: top;
  transform: scaleY(0);
  transition: 0.25s  ease
}
.top{
  top: -1px
  left: 0
  height: 1px
  width calc(100% + .5px)
  background: rgb(0, 209, 178)
  transform-origin: right  ;
  transform: scaleX(0);
  transition: 0.25s  ease
}
.right{
  right: -.5px
  width: 1px
  height 100%
  background: rgb(0, 209, 178)
  transform-origin: bottom ;
  transform: scaleY(0);
  transition: 0.25s  ease
}
.bottom{
  top: 100%
  left: -1px
  height: 1px
  width calc(100% + .5px)
  background: rgb(0, 209, 178)
  transform-origin: left ;
  transform: scaleX(0);
  transition: 0.25s ease
}
</style>