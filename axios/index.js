const  axios = require("./axios.instance") ;

const getProducts = async () => {
  try {
    const response = await axios.get(`/`);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};
const getProduct = async (id) => {
    try {
      const response = await axios.get(`/${id}`);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
};
const createProduct = async () => {
  try {
    const response = await axios.post(`/`, {
        title: "empanada de jamón y queso",
        description: "empanada de jamón y queso",
        code:200,
        price:300,
        thumbnail:"/img/jyq-empa.webp",
        stock:300
    });

    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};
let producto={}

const changeProduct = async (id) => {
    try {
      producto= {
        title: "Pizza Jamon ",
        description: "muzza y jamón",
        code:132,
        price:3000,
        thumbnail:"/img/pjamon2.jpg",
        stock:50,
      }
      const response = await axios.put(`/${id}`, producto);
  
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

const deleteById = async (id) => {
    try {
        const response = await axios.delete(`/${id}`);
    
        console.log(response.data);
    } catch (err) {
    console.log(err);
    }
}
// getProducts()
// getProduct ("6325e134691a867ef6d0ffd3")
createProduct()
// changeProduct("6325e134691a867ef6d0ffd3")
// deleteById("633ddec1c7fdf16359c4651e")