import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1", 
      description: "Car description", 
      daily_rate: 110.0, 
      license_plate: "DEF-1234", 
      fine_amount: 40, 
      brand: "Car_brand", 
      category_id: "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("shoud be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2", 
      description: "Car description", 
      daily_rate: 110.0, 
      license_plate: "DEF-1234", 
      fine_amount: 40, 
      brand: "Car_brand_test", 
      category_id: "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test"
    });
    expect(cars).toEqual([car]);
  });

  it("shoud be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_name", 
      description: "Car description", 
      daily_rate: 110.0, 
      license_plate: "DEF-1234", 
      fine_amount: 40, 
      brand: "Car_brand_test", 
      category_id: "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car_name"
    });
    expect(cars).toEqual([car]);
  });

  it("shoud be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_name", 
      description: "Car description", 
      daily_rate: 110.0, 
      license_plate: "DEF-1234", 
      fine_amount: 40, 
      brand: "Car_brand_test", 
      category_id: "12345"
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345"
    });
    expect(cars).toEqual([car]);
  });
})