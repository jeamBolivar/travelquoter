//Entidad cotización.

class Quotation {
  
  static schema = {
    type: "object",
      properties: {
        categoryId : {type: "integer", errorMessage:'must be of integer type'},
        fromId: {type: "integer", errorMessage:'must be of integer type'},
        toId: {type: "integer", errorMessage:'must be of integer type'},
        date: {type: "string", errorMessage:'must be of integer type'},
        passengersQuantity: {type: "integer", errorMessage:'must be of integer type'}       
      },
      required: ["fromId","toId","passengersQuantity"],
      additionalProperties: false,
  }

  constructor(id, categoryId, fromId, toId, date, passengersQuantity, status) {

    this.id = id;
    this.CategoryId = categoryId;
    this.FromId = fromId;
    this.ToId = toId;
    this.date = date;
    this.passengersQuantity = passengersQuantity;
    this.status = status;

  }
}

module.exports = Quotation;