import appReducer from "./modules/app";
import authReducer from "./modules/auth";
import userReducer from "./modules/user";
import profileReducer from "./modules/profile";
import homeReducer from "./modules/home";
import employeeReducer from "./modules/employee";
import manageReducer from "./modules/manage";
import talentReducer from "./modules/talent";
import projectReducer from "./modules/project";
import chatReducer from "./modules/chat";
import notificationReducer from "./modules/notification";
import artificialIntelligenceReducer from "./modules/artificialIntelligence";
import articleReducer from "./modules/article";

const rootReducer = {
	app: appReducer,
	auth: authReducer,
	article: articleReducer,
	user: userReducer,
	manage: manageReducer,
	profile: profileReducer,
	home: homeReducer,
	employee: employeeReducer,
	talent: talentReducer,
	project: projectReducer,
	chat: chatReducer,
	notification: notificationReducer,
	artificialIntelligence: artificialIntelligenceReducer,
};

export default rootReducer;
