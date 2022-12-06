export default {
    name:'sdkEditWin',
    props:{
        title:{
            type:String,
            default:''
        },
        editData:{
            type:Object,
            default:null
        }
    },
    data(){
        return {
            formData:{
                Clientname:"",
                Boardname:"",
                Tags:"",
                Requestor:""
            }
        }
    },
    watch:{
        editData(val){
            if(val){
                this.formData = {
                    ...val,
                    Tags:val.Tags.join(";")
                }
            }else {
                this.formData = {...this.formDataCopy};
            }
        }
    },
    created(){
        this.formDataCopy = {...this.formData};
        this.requiredName = ['Clientname','Boardname','Requestor'];
    },
    methods:{
        submit(){
            this.clearStyle();
            for (let i = 0; i < this.requiredName.length; i++) {
                const element = this.requiredName[i];
                if(!this.formData[element]){
                    this.$refs[element].style.borderColor = "red";
                    return;
                }
            }
            if(this.formData.Tags){
                const reg=/;$/gi;
                this.formData.Tags = this.formData.Tags.replace(reg,"").split(";");
            }
            this.$emit('submit',this.formData,this.editData ? 'edit' : 'add');
            this.close();
        },
        // 清除样式
        clearStyle(){
            for (let i = 0; i < this.requiredName.length; i++) {
                const element = this.requiredName[i];
                this.$refs[element].style.borderColor = "#cfd3d4";
            }
        },
        // 关闭弹窗
        close(){
            this.formData = {...this.formDataCopy};
            this.$emit('close')
        },
        blurInput(event){
            event.currentTarget.style.borderColor = "#cfd3d4";
        }
    }
}