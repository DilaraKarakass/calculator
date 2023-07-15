<template>
    <div class="bg-black px-[18px] py-[22px]">
        <div class="text-right font-sans font-light text-[37px] text-gray-600">
            {{ viewActions }}
        </div>

        <div class="mb-7 font-worksans font-light text-[62px] leading-none text-right ">
            {{ current }}
        </div>

        <div class="grid gap-2.5 grid-cols-4">
            <Btn @click="clear()">C</Btn>
            <Btn @click="toggleSign()"><img src="/sign.svg" alt="Sign"></Btn>
            <Btn @click="addAction('%')">%</Btn>
            <Btn @click="addAction('/')" class="bg-orange-500 hover:bg-orange-800">÷</Btn>
            <Btn @click="addAction(7)">7</Btn>
            <Btn @click="addAction(8)">8</Btn>
            <Btn @click="addAction(9)">9</Btn>
            <Btn @click="addAction('*')" class="bg-orange-500 hover:bg-orange-800 pb-[7px]">x</Btn>
            <Btn @click="addAction(4)">4</Btn>
            <Btn @click="addAction(5)">5</Btn>
            <Btn @click="addAction(6)">6</Btn>
            <Btn @click="addAction('-')" class="bg-orange-500 hover:bg-orange-800 pb-[7px]">-</Btn>
            <Btn @click="addAction(1)">1</Btn>
            <Btn @click="addAction(2)">2</Btn>
            <Btn @click="addAction(3)">3</Btn>
            <Btn @click="addAction('+')" class="bg-orange-500 hover:bg-orange-800 pb-[7px]">+</Btn>
            <Btn @click="deleteItem()" class="text-[40px] indent-[-7px]"><img src="/sil.svg" alt="Sign"></Btn>
            <Btn @click="addAction(0)">0</Btn>
            <Btn @click="addAction('.')">,</Btn>
            <Btn @click="showResult()" class="bg-orange-500 hover:bg-orange-800 pb-[7px]">=</Btn>





        </div>
    </div>
</template>

<script>

    import Btn from './BtnComp.vue'
    export default{
        data(){
            return{
                current:'',
                actions:[],
                ended:false ,
                primary:['*','/']
            }
        },

        computed:{
            viewActions(){
                return this.actions.join(' ');
            }
        },
        methods:{
            addAction(val){
                const isNum=!isNaN(val);
                const current=this.current;

                if (this.ended)  this.clear();

                if (this.ended && !isNum){
                    this.current=current;
                    this.actions.push(current);
                }

                this.ended = false;

                if (!isNum && this.primary.includes(val) && this.actions.length>1){
                    this.actions.unshift('(');
                    this.actions.push(')');
                }


                const lastValue=this.actions[this.actions.length-1];

                if((isNum || val==='.') && !isNaN(lastValue)){
                    this.actions[this.actions.length-1] = val==='.'
                        ? '${lastValue}.'
                        : parseFloat('${lastValue} $ {val}');                
                }else {
                    this.actions.push(val);
                }

                if(isNum){
                    this.current=this.actions[this.actions.length-1];
                }
            },
            clear(){
                this.current='';
                this.actions=[];
            },
            deleteItem(){
                this.actions.pop();
                
                const lastValue= this.current=this.actions[this.actions.length-1];
                this.actions.pop();

                if (lastValue===")"){
                    const itemIndex= this.actions.lastIndexOf('(');
                    this.actions.splice(itemIndex);
                }
            },
            showResult(){
                this.current=eval(this.actions.join(''));
                this.ended=true;
                console.log(this.current);
            },
            toggleSign(){
                const lastValue=this.actions[this.actions.length-1];
                const newValue=lastValue> 0 ? -lastValue: -1 *lastValue;
                this.actions[this.actions.length-1] =newValue;

            }
        },


        components:{
            Btn        
        }
    }
</script>