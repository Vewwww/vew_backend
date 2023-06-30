exports.allRequires = (app) => {
  app.use('/driver', require('../components/driver/driver.api'));
  app.use('/chat', require('../components/chat/chat.api'));
  app.use('/cartype', require('../components/carBrand/carBrand.api.js'));
  app.use('/service', require('../components/Service/service.api'));
  app.use('/mechanic', require('../components/MechanicWorkshop/mechanicWorkshop.api'));
  app.use('/winch', require('../components/winch/winch.api'));
  app.use('/allusers', require('../components/Handlers/allUsers.api'));
  app.use('/car', require('../components/Car/car.api'));
  app.use('/color', require('../components/color/color.api'));
  app.use('/sign', require('../components/Sign/sign.api'));
  app.use('/admin', require('../components/driver/admin.api'));
  app.use('/carModel', require('../components/carModel/carModel.api'));
  app.use('/question', require('../components/CBR/Question/question.api'));
  app.use('/case', require('../components/CBR/Case/case.api'));
  app.use('/problem', require('../components/CBR/problem/problem.api'));
};
