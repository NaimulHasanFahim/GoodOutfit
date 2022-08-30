import { faker } from '@faker-js/faker';
import Product from '../models/Product.js';

export const seed = async (req, res) => {
    
    for (let i = 0; i < 5; i++) {
        let title = faker.commerce.productName();
        let desc = faker.commerce.productDescription()
        let categories = new Array();
        // categories.push("women");
        categories.push("child");
        let size = new Array();
        size.push("XS");
        size.push("M");
        size.push("S");
        // console.log(size);
        let color = [];
        color.push(faker.commerce.color());
        color.push(faker.commerce.color());
        color.push(faker.commerce.color());
        
        let price = faker.commerce.price();
        let inStock = true; 
        let sellerpayment = '01521532529'
        let img = faker.image.imageUrl();
        // let image = "https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png";
        
        let item = new Product({title,desc,img,categories,size,color,price,inStock,sellerpayment});
        // console.log(item);
        try {
            await item.save();
            // res.status(201).json(newPostMessage);
        } catch (error) {
            console.log(error)
            // res.status(409).json({ message: error.message });
        }
      }
  };
  