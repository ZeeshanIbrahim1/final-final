const express = require("express");
const bodyParser = require("body-parser");
const ports = process.env.PORT || 3000;
const cors = require('cors');
const app = express();

const errorController = require("./controllers/error");
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

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/patients", patientsRoutes);
app.use("/cases", casesRoutes);
app.use('/specialty', specialtyRoutes);
app.use('/firm', firmRoutes);
app.use('/doctors', doctorRoutes);
app.use('/insurance', insuranceRoutes);
app.use('/appoint', appointRoutes)
app.use('/practicelocation',practiceRoutes)
app.use('/category', categoryRoutes)
app.use('/caseType', caseTypeRoutes )

app.use(errorController.get404);
app.use(errorController.get500);

app.listen(ports, (error) => {
  if (error) {
    console.log(`Error in "server.listen :" `, error);
  } else {
    console.log(`server is running on ${ports}`);
  }
});
