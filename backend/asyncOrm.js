const {sequelize} = require("./models")

sequelize
.authenticate()
.then(() => {
    sequelize.sync({alter:true})
})
.then(()=> {
    console.log("database synced");
})
.catch ((error) => {
    console.log(error);
})