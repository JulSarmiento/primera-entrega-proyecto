const fs = require("fs");
const readFiles = require("../utilities/readFiles");
const saveFiles = require("../utilities/saveFiles");

class Container {

  constructor(filename) {
    this.filename = `db/${filename}.txt`;
  }

  async saveProduct(element){
    const array = await this.getAll();
    element.id = array.length > 0 ? array[array.length -1].id + 1 : 1;
    element.timestamp = new Date().toLocaleString();

    try{
      array.push(element);
      saveFiles(this.filename, array);
      return element;
    }
    catch (err) {
      (err);
    }
  };

  async getRandom() {
    const array = await readFiles(this.filename);
    const random = Math.round(Math.random() * array.length);
    return this.getbyId(random);
  }

  async getbyId(elementId){    
    try{
      const array = await readFiles(this.filename);
      return array.find(element => element.id === elementId);
    }
    catch (err) {
      console.log(`Elemento no encontrado, error: ${err}.`);
    }

  };

  async getAll(){
    try {
      const products = await readFiles(this.filename);
      return products;
    } catch (err) {
      console.log(err);
    }
    
  };

  async update(id, data){
    try{
      const array = await readFiles(this.filename);
      const current = array.find(item => item.id === Number(id));
      const currentIndex = array.indexOf(current);
      array[currentIndex] = {...current, ...data};
      saveFiles(this.filename, array);    
      return array[currentIndex];
    }
    catch (err) {
      console.log(err)
    }
    
  };

  async deleteById(elementId){
    try{
      const array = await readFiles(this.filename);
      saveFiles(this.filename, array.filter(element => element.id !== elementId));
    }
    catch (err) {
      console.log(`No fue posible elimenar el producto: ${err}`)
    }

  };

  async deleteAll(){
    try {
      await fs.promises.writeFile(this.filename, "");
    }
    catch (err) {
      console.log(err);
    }
  };
}


module.exports = Container;