const Car = require("./cars-model");
const db = require("../../data/db-config");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  const car = await Car.getById(req.params.id);
  if (!car) {
    next({
      message: `car with id ${req.params.id} is not found`,
      status: 404,
    });
  } else {
    req.car = car;
    next();
  }
};

const checkCarPayload = (req, res, next) => {
  try {
    const { vin, make, model, mileage } = req.body;
    if (!vin) {
      next({
        message: `vin is missing`,
        status: 400,
      });
    }
    if (!make) {
      next({
        message: `make is missing`,
        status: 400,
      });
    }
    if (!model) {
      next({
        message: `model is missing`,
        status: 400,
      });
    }
    if (!mileage) {
      next({
        message: `mileage is missing`,
        status: 400,
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkVinNumberValid = async (req, res, next) => {
  try {
    const isValid = vinValidator.validate(req.body.vin);
    if (isValid) {
      next();
    } else {
      next({
        message: `vin ${req.body.vin} is invalid`,
        status: 400,
      });
    }
  } catch (err) {
    next(err);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body;
  const foundVin = await db("cars").where("vin", vin).first();
  if (foundVin) {
    next({
      message: `vin ${vin} already exists`,
      status: 400,
    });
  } else {
    next();
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
