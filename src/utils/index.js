exports.allRequires=(app)=>{
    app.use("/driver",require("../components/driver/driver.api"))
app.use("/mechanic",require("../components/MechanicWorkshop/mechanicWorkshop.api"))
}