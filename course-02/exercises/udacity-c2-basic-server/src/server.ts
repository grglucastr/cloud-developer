import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { Car, cars as cars_list } from './cars';

(async () => {
  let cars:Car[]  = cars_list;

  //Create an express applicaiton
  const app = express(); 
  //default port to listen
  const port = 8082; 
  
  //use middleware so post bodies 
  //are accessable as req.body.{{variable}}
  app.use(bodyParser.json()); 

  // Root URI call
  app.get( "/", ( req: Request, res: Response ) => {
    res.status(200).send("Welcome to the Cloud!");
  } );

  // Get a greeting to a specific person 
  // to demonstrate routing parameters
  // > try it {{host}}/persons/:the_name
  app.get( "/persons/:name", 
    ( req: Request, res: Response ) => {
      let { name } = req.params;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get( "/persons/", ( req: Request, res: Response ) => {
    let { name } = req.query;

    if ( !name ) {
      return res.status(400)
                .send(`name is required`);
    }

    return res.status(200)
              .send(`Welcome to the Cloud, ${name}!`);
  } );

  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as 
  // an application/json body to {{host}}/persons
  app.post( "/persons", 
    async ( req: Request, res: Response ) => {

      const { name } = req.body;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );
  
  app.get("/cars", (req:Request, res:Response) => {
    const {make, type} = req.query;

    let filteredCars = cars;

    if(make){
      filteredCars = filteredCars.filter(car => car.make === make);
    }

    if(type){
      filteredCars = filteredCars.filter(car => car.type === type);
    }

    if(filteredCars.length === 0){
      return res.status(404).send([]);
    }

    return res.status(200).send(filteredCars);
  });

  app.get("/cars/:id", (req:Request, res:Response) => {
    const { id } = req.params;

    if(!id){
      return res.status(400).send("Car ID is required");
    }

    const car = cars.filter(car => car.id === parseInt(id));
    if(!car){
      return res.status(404).send("Car not found");
    }

    return res.status(200).send(car);
  });

  app.post("/cars", (req:Request, res:Response) => {
    const { id, type, model, cost, make } = req.body;

    if(!id) { return res.status(400).send("Car ID is mandatory"); }
    if(!type) { return res.status(400).send("Car TYPE is mandatory"); }
    if(!model) { return res.status(400).send("Car MODEL is mandatory"); }
    if(!cost) { return res.status(400).send("Car COST is mandatory"); }

    const car = {id, type, model, cost, make};
    cars = [...cars, car];

    res.status(201).send(car);
  });

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();