exports.allRequires = (app) => {
  app.use("/driver", require("../components/driver/driver.api"));
  app.use(
    "/maintenanceCenter",
    require("../components/MaintenanceCenter/maintenanceCenter.api")
  );
  app.use("/chat", require("../components/chat/chat.api"));
  app.use("/cartype", require("../components/carBrand/carBrand.api.js"));
  app.use("/service", require("../components/Service/service.api"));
  app.use(
    "/mechanic",
    require("../components/MechanicWorkshop/mechanicWorkshop.api")
  );
  app.use("/winch", require("../components/winch/winch.api"));
  app.use("/gasStation", require("../components/GasStation/gasStation.api"));
  app.use("/allusers", require("../components/Handlers/allUsers.api"));
  app.use("/car", require("../components/Car/car.api"));
  app.use("/color", require("../components/color/color.api"));
  app.use("/sign", require("../components/Sign/sign.api"));
  app.use("/request", require("../components/request/request.api"));
  app.use("/admin",require("../components/driver/admin.api"));
  app.use("/admin",require("../components/driver/admin.api"));
};
