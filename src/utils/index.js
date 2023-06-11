exports.allRequires = (app) => {
  app.use("/driver", require("../components/driver/driver.api"));
  app.use(
    "/maintenanceCenter",
    require("../components/MaintenanceCenter/maintenanceCenter.api")
  );
  // app.use("/chat", require("../components/chat/chat.api"));
  app.use("/cartype", require("../components/carType/carType.api.js"));
  app.use("/service", require("../components/Service/service.api"));
  app.use(
    "/mechanic",
    require("../components/MechanicWorkshop/mechanicWorkshop.api")
  );
  app.use("/winch", require("../components/winch/winch.api"));
  app.use("/gasStation", require("../components/GasStation/gasStation.api"));
  app.use("/allusers",require("../components/Handlers/allUsers.api"));
  app.use("/car", require("../components/Car/car.api"));

};
