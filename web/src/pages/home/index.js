export default {
    name:'home',
    data(){
        return {
            navList:[{
                name:'User Profile',
                key:'user'
            },{
                name:'SDK Management',
                key:'sdk',
                path:'/sdk'
            },{
                name:'Dashboards',
                key:'dash'
            },{
                name:'Terms & Conditions',
                key:'terms'
            }],
            activeNav:{
                name:'SDK Management',
                key:'sdk',
                path:'/sdk'
            }
        }
    },
    creted(){

    },
    methods:{
        clickNav(item){
            if(item.key !== this.activeNav.key){
                this.activeNav = item;
                if(item.path){
                    this.$router.push({
                        path:item.path,
                        query:{
                            name:item.name
                        }
                    })
                }
            }
        }
    }
}