import {createAppContainer} from "react-navigation"
import {createStackNavigator} from 'react-navigation-stack'
import LoginForm from "./components/LoginForm";
import EmployeeList from "./components/EmployeeList";
import EmployeeCreate from "./components/EmployeeCreate";
import EmployeeEdit from "./components/EmployeeEdit";


const navigator = createStackNavigator({
    Login: LoginForm,
    Employee: EmployeeList,
    Create: EmployeeCreate,
    Edit: EmployeeEdit
}, {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
        title: 'Manager'
    }
})

export default createAppContainer(navigator)
