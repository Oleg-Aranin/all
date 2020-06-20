import {createAppContainer} from "react-navigation"
import {createStackNavigator} from 'react-navigation-stack'
import DriverList from "./screens/DriverList";
import DriverDetails from "./screens/DriverDetails";
import RaceDetails from "./screens/RaceDetails";
import SeasonsScreen from "./screens/SeasonsScreen";


const navigator = createStackNavigator({
    Drivers: DriverList,
    Details: DriverDetails,
    RaceDetails: RaceDetails,
    Seasons: SeasonsScreen
}, {
    initialRouteName: 'Drivers',
    defaultNavigationOptions: {
        title: 'F1'
    }
})

export default createAppContainer(navigator)
