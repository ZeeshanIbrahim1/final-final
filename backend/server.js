const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const ports = process.env.PORT || 3000;
const cors = require('cors');
const app = express();

const errorController = require("./controllers/error");
const authController = require("./controllers/auth")
const authRoutes = require("./routes/auth");
const patientsRoutes = require("./routes/patients");
const casesRoutes = require("./routes/cases");
const specialtyRoutes = require('./routes/specialty');
const firmRoutes = require('./routes/firms');
const doctorRoutes = require('./routes/doctors');
const insuranceRoutes = require('./routes/insurance');
const practiceRoutes = require('./routes/practicelocation');
const appointRoutes = require('./routes/appointments');
const categoryRoutes = require('./routes/category');
const caseTypeRoutes = require('./routes/caseType')
const purposeOfVisitRoutes = require('./routes/purposeOfVisit')
const specs = require('./config/swaggerConfig.js');
const swaggerUi = require('swagger-ui-express')

app.use(bodyParser.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use("/auth", authRoutes);
app.use('/patients',authController.verifyToken, patientsRoutes);
app.use('/cases',authController.verifyToken, casesRoutes);
app.use('/specialty',authController.verifyToken, specialtyRoutes);
app.use('/firm',authController.verifyToken, firmRoutes);
app.use('/doctors',authController.verifyToken, doctorRoutes);
app.use('/insurance',authController.verifyToken, insuranceRoutes);
app.use('/appoint',authController.verifyToken, appointRoutes)
app.use('/practicelocation',authController.verifyToken,practiceRoutes)
app.use('/category',authController.verifyToken, categoryRoutes)
app.use('/caseType',authController.verifyToken, caseTypeRoutes )
app.use('/purposeOfVisit',authController.verifyToken, purposeOfVisitRoutes )

app.use(errorController.get404);
app.use(errorController.get500);

app.listen(ports, (error) => {
  if (error) {
    console.log(`Error in "server.listen :" `, error);
  } else {
    console.log(`server is running on ${ports}`);
  }
});
