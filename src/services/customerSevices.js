const Customer = require('../models/customer');
const aqp = require('api-query-params');

const createCustomerServies = async (data) => {
 try {
    let result = await Customer.create({
        name: data.name,
        address:data.address,
        phone: data.phone, 
        email: data.email,
        description: data.description,
        image : data.image
    })
    return result
 } catch (error) {
    console.log(error)
    return null
 }
}
const createArrayCustomerServies = async(arr) => {
    try {
        let result = await Customer.insertMany(arr);
        return result
    } catch (error) {
        console.log("error>>>:",error)
        return null
    }
}

const getAllCustomersApi = async(limit, page, name, quyeryString) => {
    try{
        let result = null
        let offset = limit*(page-1) || 0
        const {filter }= aqp(quyeryString)
        delete filter.page
        console.log("check>>>:",filter)
        if (limit && page) {
            result = await Customer.find(filter).skip(offset).limit(limit).exec();
        } else {
            result = await Customer.find({});
        }
        
        return result
    } catch (error) {
        console.log("error>>>:",error)
        return null
    }
}

const putCustomerApi = async(name, address, phone, email, description, Id) => {
    try{
       const result =  Customer.updateOne(
            { _id: Id },
            {
                name, address, phone, email, description
            }
          );
          return result

    } catch (error) {
        console.log("error>>>:",error)
        return null
    }
}

const deleteCustomerApi = async(Id) => {
    try{
        let result = await Customer.deleteById({_id: Id})
        return result
    } catch (error){
        console.log("error>>>:",error)
        return null
    }
}

const deleteArrayCustomerApi = async(Id) => {
    try{
        let result = await Customer.delete({_id:{$in:Id}})
        return result
    } catch (error){
        console.log("error>>>:",error)
        return null
    }
}

module.exports = {
    createCustomerServies,
    createArrayCustomerServies,
    getAllCustomersApi,
    putCustomerApi,
    deleteCustomerApi,
    deleteArrayCustomerApi
}
