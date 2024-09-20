//Entidad cobertura.

class Coverage {
  
  static schema = {
    type: "object",
      properties: {
        fromId : {type: "integer", errorMessage:'must be of integer type'},
        toId : {type: "integer", errorMessage:'must be of integer type'},
        providerId : {type: "integer", errorMessage:'must be of integer type'},
        vehicleId : {type: "integer", errorMessage:'must be of integer type'},
        startTime : {type: "string", errorMessage:'must be of string type'},
        duration : {type: "integer", errorMessage:'must be of integer type'},
      },
      required: ["fromId","toId","providerId","vehicleId","startTime","duration"],
      additionalProperties: false,
  }

  constructor(id, fromId, toId, providerId, vehicleId, startTime, duration) {

    this.id = id;
    this.FromId = fromId;
    this.ToId = toId;
    this.ProviderId = providerId;
    this.VehicleId = vehicleId;
    this.startTime = startTime;
    this.duration = duration;

  }
}

module.exports = Coverage;