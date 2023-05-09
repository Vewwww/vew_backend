exports.allRequires = (app) => {
  app.use("/driver", require("../components/driver/driver.api"));
  // app.use("/chat/", require("../components/chat/chat.api"));
  // app.use("/cartype/", require("../components/carType/carType.api"));
  app.use("/mechanic",require("../components/MechanicWorkshop/mechanicWorkshop.api"));
  app.use("/winch",require("../components/winch/winch.api") );
  // app.use("/",require("../components/Handlers/allUsers.api"));
 
};
