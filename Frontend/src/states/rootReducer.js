import appReducer from "./modules/app";
import authReducer from "./modules/auth";
import profileReducer from "./modules/profile";
import homeReducer from "./modules/home";
import aboutReducer from "./modules/about";
import employeeReducer from "./modules/employee";
import manageReducer from "./modules/manage";

const rootReducer = {
	app: appReducer,
	auth: authReducer,
	manage: manageReducer,
	profile: profileReducer,
	home: homeReducer,
	about: aboutReducer,
	employee: employeeReducer,
};

export default rootReducer;
