import App from '@/app';
import LoginRoutes from '@/router/v1/routes/Login.routes';
import UserRoutes from '@/router/v1/routes/User.routes';
// import EntityController from '@/router/v1/routes/Entity.routes';

const app = new App([
	new UserRoutes(),
	new LoginRoutes(),
	// new EntityController('user'),
]);

app.listen();