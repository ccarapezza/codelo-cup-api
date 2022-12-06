const db = require("../models");
const Param = db.param;

class SystemParamsPrivate {
    constructor() {
        this.params = [];
        this.setParam = async (key, value) => {
            let param = await Param.findOne({ where: { key: key }});
            if(param){
                param.value = value;
                await param.save();
            }else{
                await Param.create({ key: key, value: value });
            }
            this.params[key] = value;
        }
        this.getParam = async (key) => {
            if(!this.params[key]){
                let param = await Param.findOne({ where: { key: key }});
                if(param){
                    this.params[param.key] = param.value;
                }
            }
            return this.params[key];
        }
        this.initialize = async () => {
            const allParams = await Param.findAll();
            for (const param of allParams) {
                this.params[param.key] = param.value;
            }
        }
        this.initialize();
    }
}
class SystemParams {
    constructor() {
        throw new Error('Use SystemParams.getInstance()');
    }
    static getInstance() {
        if (!SystemParams.instance) {
            SystemParams.instance = new SystemParamsPrivate();
        }
        return SystemParams.instance;
    }
}
module.exports = SystemParams;