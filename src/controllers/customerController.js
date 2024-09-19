
const {
    uploadSingleFile,
    uploadMutlipleFile,
  } = require("../services/fileServices");


const {
  createCustomerServies,
  createArrayCustomerServies,
  getAllCustomersApi,
  putCustomerApi,
  deleteCustomerApi,
  deleteArrayCustomerApi
} = require('../services/customerSevices')


module.exports = {
  postCustomerApi: async (req,res) =>{
        let {name, address, phone, email, description}=req.body;

        let imgURL='';
       
          if (typeof req.files.image === "object" && Array.isArray(req.files.image)) {
            let result = await uploadMutlipleFile(req.files.image);
            console.log(">>>>result:", result);
          } else {
            let result = await uploadSingleFile(req.files.image);
            imgURL = result.fileName;
            console.log(">>>>result:", result.fileName);
          }

        let custumerData = {
            name,address, phone, email, description,
            image : imgURL
        }
        
           let Custumer =  await createCustomerServies(custumerData)
            return res.status(201).json({
                errorCode: 0,
                data: Custumer,
        })
    },
  postArrayCustomerApi: async(req,res) => {
      let custumers = await createArrayCustomerServies(req.body.custumers)
      if (custumers) {
        return res.status(201).json({
        errorCode: 0,
        data: custumers,})
    } else {
      return res.status(201).json({
        errorCode: -1,
        data: custumers,})
    }
    },
  getAllCustomersApi: async(req,res) => {
    let results = await getAllCustomersApi(req.query.limit, req.query.page, req.query.name,req.query)
      return res.status(200).json({
      errorCode: 0,
      data: results,
  });
  },
   putUpdateCustomerAPI : async (req, res) => {
    let {name, address, phone, email, description, Id}=req.body;
    let customer = await putCustomerApi(name, address, phone, email, description, Id)
    return res.status(200).json({
      errorCode: 0,
      data: customer,
    });
  },
  deleteCustomerAPI : async (req,res) => {
    let Id=req.body.Id;
    console.log(Id)
    let customer = await deleteCustomerApi(Id)
    return res.status(200).json({
      errorCode: 0,
      data: customer,
    });
  },
  deleteArrayCustomerAPI: async (req,res) => {
    let Id=req.body.customersId;
    console.log(Id)
    let customer = await deleteArrayCustomerApi(req.body.customersId)
    return res.status(200).json({
      errorCode: 0,
      data: customer,
    });
  }
}

