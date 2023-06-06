import db from "database/models";

export default function handler(req, res){
    switch(req.method){
        case 'GET':
            return getState (req, res);

        case 'POST':
            return addState (req, res);

        case 'PUT':
            return updateState (req, res);

        case 'DELETE':
            return deleteState (req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
}

const addState = async (req, res) => {
  try {
      console.log(req.body);
      
      const state = await db.State.create({...req.body});

      res.json({
          state,
          message: 'El Estado fue registrado correctamente'
      })
  } catch (error) {
      console.log(error);
      let errors = []

      if (error.errors) {
          errors = error.errors.map((item) => ({
              error: item.message,
              field: item.path,
          }));
      }
      return res.status(400).json(
          {

              message: `ocurrio un error al procesar la petición: ${error.message}`,
              errors,
          }
      )
  }
}



const getState = async (req, res) => {
  try {
      //leer el state a flitrar
      const { id } = req.query;

      //leer las states
      let states = [];
      if (id) {
          states = await db.State.findAll({
              where:{
                  id,
              },
          });
      } else {
          states = await db.State.findAll({
          }); 
      }
      return res.json(states);
  } catch(error){
      console.log(error);
      return res.status(400).json(
          {
              error: true,
              message:`Ocurrió un error al procesar la petición: ${error.message}`
          }
      )
  }
}


const updateState = async (req, res) => {
    try{
        let {id} = req.query;
        await db.State.update({...req.body},
            {
                where:{
                    id:id
                },
            })
            res.json({
                message: 'el estado fue actualizado'
            })
        
    }
    catch(error){
        res.status(400).json({error: "error al actualizar el estado"})
    }
}




//DELETE: /clientes
const deleteState = async (req, res) => {
    try {
        //eliminar los datos de la unidad
        const { id } = req.query;
        await db.State.destroy({
            where: {
                id: id
            }
        });

        res.json({
            message: 'El estado fue eliminado correctamente'
        });
    } catch (error) {
        console.log(error);
        let errors = [];
        if (error.errors) {
            //extraer la información de los campos que tienen error
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la información: ${error.message}`,
                errors,
            }
        )
    }
}