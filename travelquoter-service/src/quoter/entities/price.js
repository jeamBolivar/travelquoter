//Entidad precio.

class Price {
  
  static schema = {
    type: "object",
      properties: {
        coverageId : {type: "integer", errorMessage:'must be of integer type'},
        fromDate: {type: "string",  errorMessage:'must be of date type (YYYY-MM-DD)'},
        toDate: {type: "string", errorMessage:'must be of date type (YYYY-MM-DD)'},
        price: {type: "number", errorMessage:'must be of number type'}
      },
      required: ["coverageId","fromDate","toDate","price"],
      additionalProperties: false,
  }

  constructor(id, coverageId, fromDate, toDate, price) {

    this.id = id;
    this.CoverageId = coverageId;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.price = price;

  }
}

module.exports = Price;