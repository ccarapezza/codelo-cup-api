
const { sequelize } = require("../models");
const db = require("../models");
const Mesa = db.mesa;
const Muestra = db.muestra;
const Participante = db.participante;
const Categoria = db.categoria;

exports.findAll = (req, res) => {
  Mesa.findAll({
    include: [ {
      model: Muestra,
      include: [Categoria],
    }, {
      model: Participante,
      include: [Muestra],
    },
    {
      model: Participante,
      as: "participantesSecundarios",
      include: [Muestra],
    },
    {
      model: Categoria
    } ]
  })
  .then((mesas) => {
    res.status(200).send(mesas);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.addParticipanteToMesa = (req, res) => {
  const idParticipante = req.body.idParticipante;
  const idMesa = req.body.idMesa;

  Mesa.findOne({
    where: {
      id: idMesa
    },
    include: [ Muestra, Participante ]
  })
  .then((mesa) => {
    Participante.findOne({
      include: [ Muestra ],
      where: {
        id: idParticipante
      }
    })
    .then((participante) => {
      let forbidden = false;
      const muestrasDelParticipante = participante.muestras;
      const muestrasDeLaMesa = mesa.muestras;
      for (const muestraDelParticipante of muestrasDelParticipante) {
          for (const muestraDeLaMesa of muestrasDeLaMesa) {
              forbidden = forbidden || muestraDeLaMesa.id === muestraDelParticipante.id;
          }
      }
      if(!forbidden){
        mesa.addParticipante(participante).then((newMesa) => {
          res.status(200).send({ message: "Participante agregado a la mesa" });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
      }else{
        res.status(401).send({ message: "No se puede agregar el participante a esta mesa." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.addParticipanteSecundarioToMesa = (req, res) => {
  const idParticipante = req.body.idParticipante;
  const idMesa = req.body.idMesa;

  Mesa.findOne({
    where: {
      id: idMesa
    },
    include: [ Muestra, {model: Participante, as: "participantesSecundarios"} ]
  })
  .then((mesa) => {
    Participante.findOne({
      include: [ Muestra ],
      where: {
        id: idParticipante
      }
    })
    .then((participante) => {
      let forbidden = false;
      const muestrasDelParticipante = participante.muestras;
      const muestrasDeLaMesa = mesa.muestras;
      for (const muestraDelParticipante of muestrasDelParticipante) {
          for (const muestraDeLaMesa of muestrasDeLaMesa) {
              forbidden = forbidden || muestraDeLaMesa.id === muestraDelParticipante.id;
          }
      }
      if(!forbidden){
        mesa.addParticipantesSecundario(participante).then((newMesa) => {
          res.status(200).send({ message: "Participante sec. agregado a la mesa" });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
      }else{
        res.status(401).send({ message: "No se puede agregar el participante sec. a esta mesa." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.removeParticipanteToMesa = (req, res) => {
  const idParticipante = req.body.idParticipante;
  const idMesa = req.body.idMesa;

  Mesa.findOne({
    where: {
      id: idMesa
    },
    include: [ Muestra, Participante ]
  })
  .then((mesa) => {
    Participante.findOne({
      where: {
        id: idParticipante
      }
    })
    .then((participante) => {
      mesa.removeParticipante(participante).then((newMesa) => {
        res.status(200).send({ message: "Participante eliminado de la mesa" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.removeParticipanteSecundarioToMesa = (req, res) => {
  const idParticipante = req.body.idParticipante;
  const idMesa = req.body.idMesa;

  Mesa.findOne({
    where: {
      id: idMesa
    },
    include: [ Muestra, {model: Participante, as: "participantesSecundarios"} ]
  })
  .then((mesa) => {
    Participante.findOne({
      where: {
        id: idParticipante
      }
    })
    .then((participante) => {
      mesa.removeParticipantesSecundario(participante).then((newMesa) => {
        res.status(200).send({ message: "Participante sec. eliminado de la mesa" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.addMuestraToMesa = (req, res) => {
  const idMuestra = req.body.idMuestra;
  const idMesa = req.body.idMesa;

  Mesa.findOne({
    where: {
      id: idMesa
    },
    include: [{
      model: Participante,
      include: [Muestra],
    },
    {
      model: Muestra
    }]
  })
  .then((mesa) => {
    Muestra.findOne({
      where: {
        id: idMuestra
      }
    })
    .then((muestra) => {
      let forbidden = false;
      const participantesDeLaMesa = mesa.participantes;
      for (const participanteDeLaMesa of participantesDeLaMesa) {
          for (const muestra of participanteDeLaMesa.muestras) {
              forbidden = forbidden || muestra.id===parseInt(idMuestra);
          }
      }
      if(!forbidden){
        mesa.addMuestra(muestra).then((newMesa) => {
          res.status(200).send({ message: "Muestra agregada a la mesa" });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
      }else{
        res.status(401).send({ message: "No se puede agregar la muestra a esta mesa." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.addCategoriaToMesa = (req, res) => {
  const idCategoria = req.body.idCategoria;
  const idMesa = req.body.idMesa;

  Mesa.findOne({
    where: {
      id: idMesa
    }
  })
  .then((mesa) => {
    Categoria.findOne({
      where: {
        id: idCategoria
      }
    })
    .then((categoria) => {
      mesa.addCategoria(categoria).then((newMesa) => {
        res.status(200).send({ message: "Categoría agregada a la mesa" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
      
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.removeMuestraToMesa = (req, res) => {
  const idMuestra = req.body.idMuestra;
  const idMesa = req.body.idMesa;

  Mesa.findOne({
    where: {
      id: idMesa
    },
    include: [ Muestra, Participante ]
  })
  .then((mesa) => {
    Muestra.findOne({
      where: {
        id: idMuestra
      }
    })
    .then((muestra) => {
      mesa.removeMuestra(muestra).then((newMesa) => {
        res.status(200).send({ message: "Muestra eliminada de la mesa" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.removeCategoriaToMesa = (req, res) => {
  const idCategoria = req.body.idCategoria;
  const idMesa = req.body.idMesa;

  Mesa.findOne({
    where: {
      id: idMesa
    }
  })
  .then((mesa) => {
    Categoria.findOne({
      where: {
        id: idCategoria
      }
    })
    .then((categoria) => {
      mesa.removeCategoria(categoria).then((newMesa) => {
        res.status(200).send({ message: "Categoría eliminada de la mesa" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.createMesa = (req, res) => {
  const name = req.body.name;

  Mesa.create({
    name: name
  }).then((mesa) => {
    res.status(200).send({ mesa });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.deleteMesa = (req, res) => {
  const id = req.body.id;

  Mesa.destroy({
    where: {
        id: id
    }
  }).then((mesa) => {
    res.status(200).send({ message: "Mesa eliminada correctamente" });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.updateMesa = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;

  Mesa.update({ name: name }, {
    where: {
      id: id
    }
  }).then((mesa) => {   
    res.status(200).send(mesa);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.randomizeEnable = async(req, res) => {
  var muestras = await Muestra.findAll({include: [Categoria, Participante]});
  var participantes = await Participante.findAll({
    where:{
      esJurado: false
    },
    include: [{
      model: Muestra,
      include: [Categoria],
    }]
  });
  var mesas = await Mesa.findAll({
    include: [ {
      model: Muestra,
      include: [Categoria],
    }, {
      model: Participante,
      include: [Muestra],
    },
    {
      model: Participante,
      as: "participantesSecundarios",
      include: [Muestra],
    },
    {
      model: Categoria
    }]
  })

  res.status(200).send({
    randomizeEnable: mesas.length > 10
    && participantes.length > 10
    && muestras.length > 10
    && mesas.filter(mesa => mesa.muestras.length !== 0).length === 0
    && mesas.filter(mesa => mesa.participantes.length !== 0).length === 0
    && mesas.filter(mesa => mesa.participantesSecundarios.length !== 0).length === 0
  });
}

exports.handOutMuestas = async(req, res) => {
  var muestras = await Muestra.findAll({include: [Categoria, Participante], raw: true, nest: true});
  var participantes = await Participante.findAll({
    where:{
      esJurado: false
    },
    include: [{
      model: Muestra,
      include: [Categoria],
    }]
  });
  var mesas = await Mesa.findAll({
    include: [ {
      model: Muestra,
      include: [Categoria],
    }, {
      model: Participante,
      include: [Muestra],
    },
    {
      model: Participante,
      as: "participantesSecundarios",
      include: [Muestra],
    },
    {
      model: Categoria
    }]
    , raw: true
    , nest: true
  })

  participantes = participantes.map((participante) => {
    participante.dataValues.categorias = [];
    participante.dataValues.muestras.forEach((muestra) => {
      if(!participante.dataValues.categorias.includes(muestra.categoria.id)){
        participante.dataValues.categorias.push(muestra.categoria.id);
      }
    });
    return participante;
  });

  let muestrasPorCategoria = muestras.reduce(function(muestrasPorCategoria, muestra){
    var categoriaActual = muestrasPorCategoria.find((categoria)=>muestra.categoria.id===categoria.id);
    if(!categoriaActual){
      categoriaActual = muestra.categoria;
      categoriaActual.muestras = [];
      muestrasPorCategoria.push(muestra.categoria);
    }
    delete muestra.categoria;
    categoriaActual.muestras.push(muestra);

    return muestrasPorCategoria;
  }, []);

  mesas = mesas.map((mesa)=>{
    return({
      ...mesa,
      participantes: [],
      muestras: []
    })
  });

  muestrasPorCategoria = muestrasPorCategoria.map((categoria)=>{
    return({
      ...categoria,
      mesasCount: Math.round((categoria.muestras.length/muestras.length)*mesas.length)
    })
  });

  muestrasPorCategoria = muestrasPorCategoria.sort((a,b)=>b.mesasCount-a.mesasCount);

  let mesaIndex = 0;

  muestrasPorCategoria.forEach((categoria)=>{
    for (let i = 0; i < categoria.mesasCount && i+mesaIndex < mesas.length; i++) {
      const mesa = mesas[i+mesaIndex].categoria = {
        id: categoria.id,
        name: categoria.name
      };
    }
    mesaIndex+=categoria.mesasCount;
  });

  const getMesaByCategoria = (categoria)=>{
    return mesas.filter((mesa)=>mesa.categoria.id===categoria.id);
  };

  const getMesaWithMinorMuestrasByCategoria = (categoria, avoidMuestras = [], avoidMesas = [])=>{
    return getMesaByCategoria(categoria).filter((mesa)=>{
      let finded = false;
      for (const muestra of avoidMuestras) {
        for (let i = 0; i < mesa.muestras.length; i++) {
          finded = finded || mesa.muestras.find((muestraMesa)=>muestraMesa.id===muestra.id);
        }
      }
      return !finded;
    }).filter((mesa)=>{
      return !avoidMesas.includes(mesa.id);
    }).sort((a,b)=>a.muestras.length-b.muestras.length)[0];
  }

  const getMesaWithMinorParticipantesByCategoria = (categoria, avoidMuestras = [])=>{
    let mesasWithCategoria = getMesaByCategoria(categoria);
    mesasWithCategoria = mesasWithCategoria.filter((mesa)=>{
      let finded = false;
      for (const muestra of avoidMuestras) {
        for (let i = 0; i < mesa.muestras.length; i++) {
          finded = finded || mesa.muestras.find((muestraMesa)=>muestraMesa.id===muestra.dataValues.id);
        }
      }
      return !finded;
    })
    return mesasWithCategoria.sort((a,b)=>a.participantes.length-b.participantes.length)[0];
  }

  const getMesaByMuestra = (muestra)=>{
    return mesas.find((mesa)=>{
      return mesa.muestras.find((muestraMesa)=>muestraMesa.id===muestra.dataValues.id);
    });
  }

  const switchMuestraToOtherMesa = (muestra)=>{
    const mesa = getMesaByMuestra(muestra);
    mesa.muestras = mesa.muestras.filter((muestraMesa)=>muestraMesa.id!==muestra.dataValues.id);
    const mesaWithMinorMuestras = getMesaWithMinorMuestrasByCategoria(mesa.categoria, [muestra.id], [mesa.id]);
    mesaWithMinorMuestras.muestras.push(muestra);
  }

  const copyMuestasPorCategoria = JSON.parse(JSON.stringify(muestrasPorCategoria));

  for (const categoria of copyMuestasPorCategoria) {
    while(categoria.muestras.length>0){
      const mesa = getMesaWithMinorMuestrasByCategoria(categoria);
      const indexSel = Math.round(Math.random()*categoria.muestras.length)-1;
      const muestra = categoria.muestras.splice(indexSel, 1)[0];
      mesa.muestras.push(muestra);
      if(!mesa.avoidParticipants){
        mesa.avoidParticipants = [];
      }
      mesa.avoidParticipants.push(muestra.participante.id);
    }
  }

  while(participantes.length>0){
    const indexSel = Math.round(Math.random()*participantes.length)-1;
    const participanteCurrent = participantes.splice(indexSel, 1)[0];
    const mesa = getMesaWithMinorParticipantesByCategoria({id: participanteCurrent.dataValues.categorias[0]}, participanteCurrent.muestras);
    if(mesa){
      if(!mesa.participantes){
        mesa.participantes = [];
      }
      mesa.participantes.push(participanteCurrent.id);
    }else{
      //Switch Muestras
      switchMuestraToOtherMesa(participanteCurrent.muestras[0]);
      participantes.push(participanteCurrent);
    }
  }

  const t = await sequelize.transaction();

  try {
    for (const mesa of mesas) {
      const currentMesa = await Mesa.findByPk(mesa.id, {transaction: t});
      const currentCategoria = await Categoria.findByPk(mesa.categoria.id, {transaction: t});
      await currentMesa.addCategoria(currentCategoria, {transaction: t});
      for (const muestra of mesa.muestras) {
        const currentMuestra = await Muestra.findByPk(muestra.id, {transaction: t});
        await currentMesa.addMuestra(currentMuestra, {transaction: t});
      }
      for (const participanteId of mesa.participantes) {
        const currentParticipante = await Participante.findByPk(participanteId, {transaction: t});
        await currentMesa.addParticipante(currentParticipante, {transaction: t});
      }
    }
    console.log("Commit...");
    await t.commit();
  } catch (error) {
    console.error("Transaction error...", error);
    await t.rollback();
    res.status(400).send("No se pudo repartir los participantes y las muestras");
  }

  res.status(200).send("Participantes y muestras repartidas equitativamente");
};