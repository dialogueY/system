import axios from "axios";
import sdkEditWin from "@/components/sdkEditWin/index.vue"
export default {
    name:'sdk',
    components:{sdkEditWin},
    data(){
        return {
            name:'',
            headerData:[{
                name:"Client name"
            },{
                name:"Board name"
            },{
                name:"Tags"
            },{
                name:"Requestor",
                class:"fd-w15"
            },{
                name:"SDK script",
                class:"fd-w10"
            },{
                name:"Actions",
                class:"fd-center fd-w10"
            }],
            listData:[],
            listTotal:0,
            // 弹窗相关
            winTitle:"Create SDk",
            showWin:false,
            editData:null,
            editIndex:0,
            // 筛选
            searchText:"",
            // 虚拟列表
            virtualHtml:'',
            startIndex:0,
            endIndex:0,
            startOffset:0
        }
    },
    computed:{
        showListData(){
            let data = JSON.parse(JSON.stringify(this.listData));
            if(data.length){
                if(this.searchText){
                    const searchName = ['Clientname','Boardname','Tags','Requestor'];
                    data = data.filter((item)=>{
                        const searchIndex = searchName.map((name)=>{
                            let str = name === 'Tags' ? item[name].join('') : item[name];
                            const index = str.indexOf(this.searchText);
                            if(index !== -1){
                                item[name] = this.addtarg(item[name],name)
                            }
                            return index;
                        })
                        return searchIndex.some(index => index !== -1);
                    });
                }
                this.chListHeiht(data);
                this.listTotal = data.length;
                return data.slice(this.startIndex,this.endIndex)
            }
            return [];
        },
        getTransform(){
            return `translate3d(0,${this.startOffset}px,0)`;
        }
    },
    created(){
        this.name = this.$route.query.name;
    },
    mounted(){
        this.initData();
    },
    methods:{
        initData(){
            axios
            .get('/json/sdkList.json')
            .then(response => {
                // 先判断是否需要用虚拟列表
                this.setSomeHeight(response.data);
                this.listData = response.data || [];
            })
        },
        setSomeHeight(data){
            // itemSize*2是头部和总数占地位置，应该去获取
            this.itemSize = 40;
            this.boxHeight = this.$refs.listBox.clientHeight - this.itemSize*2;
            this.visibleCount = Math.ceil(this.boxHeight / this.itemSize);
            this.endIndex = this.visibleCount;
            this.chListHeiht(data);
        },
        // 计算列表高度
        chListHeiht(data) {
            this.itemHeight = data.length * this.itemSize;
            // 数字
            const NUM = 10000;
            const _howCountDiv = Math.ceil(this.itemHeight / NUM);
            const _residue = this.itemHeight % NUM;
            const _html = [];
            for (let i = 0; i < _howCountDiv; i++) {
                if (i < (_howCountDiv - 1)) {
                    _html.push(`<div style="height:${NUM}px"></div>`);
                } else {
                    _html.push(`<div style="height:${_residue !== 0 ? _residue : NUM}px"></div>`);
                }
            }
            this.virtualHtml =  _html.join('');
        },
        openWin(data,index){
            if(data){
                this.winTitle = 'Edit SDk';
                this.editData = data;
                this.editIndex = index;
            }else {
                this.winTitle = 'Create SDk';
                this.editData = null;
            }
            this.showWin = true;
        },
        closeWin(){
            this.showWin = false;
            this.editData = null;
        },
        submitSdk(data,type){
            if(type === 'add'){
                this.listData.unshift(data);
            }else {
                this.listData.splice(this.editIndex,1,data)
            }
        },
        // 滚动事件
        scrollEvent(event){
            //当前滚动位置
            let scrollTop = event.srcElement.scrollTop;
            this.startIndex = Math.floor(scrollTop / this.itemSize);
            this.endIndex = this.startIndex + this.visibleCount;
            //此时的偏移量
            this.startOffset = scrollTop - (scrollTop % this.itemSize);
        },
        addtarg(text,name){
            if(name === 'Tags'){
                const newText = [];
                for (let i = 0; i < text.length; i++) {
                    let element = text[i];
                    newText.push(element.replace(this.searchText,`<text style="color:red">${this.searchText}</text>`))
                }
                return newText;
            }else {
                return text.replace(this.searchText,`<text style="color:red">${this.searchText}</text>`)
            }
        }
    }
}