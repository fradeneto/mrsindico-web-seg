import { createBrowserHistory } from 'history';
// const history = createBrowserHistory();
const basename = process.env.PUBLIC_PATH;
const history = createBrowserHistory({ basename });
export default history;
