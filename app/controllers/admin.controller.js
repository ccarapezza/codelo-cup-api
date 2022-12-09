const SystemParams = require("../config/system.params");
const SystemParamsKeys = require("../enum/SystemParamsKeys");

exports.updateMesaRestricted = (req, res) => {
  if(req.body?.value==="true"||req.body?.value==="false"){
    SystemParams.getInstance().setParam(SystemParamsKeys.RESTRICTED_BY_MESA, req.body?.value)
    .then(() => {
      res.send({ value: req.body?.value, message: "Parámetro actualizado correctamente!" });
    }).catch((err) => {
      res.status(500).send({ message: err.message });
    });
  }else{
    res.status(400).send({ message: "Bad Request"});
  }
};

exports.getMesaRestricted = (req, res) => {
  SystemParams.getInstance().getParam(SystemParamsKeys.RESTRICTED_BY_MESA)
  .then((param) => {
    res.send({ value: param });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};
