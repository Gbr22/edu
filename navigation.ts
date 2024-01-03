import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { LinkingOptions, ParamListBase, useNavigation as useNativeNavigation } from '@react-navigation/native';

interface ParamList extends ParamListBase {
    Home: {},
    SchoolHome: {
        schoolId: string
    },
    TimetableViewer: {
        schoolId: string
        type: string
        timetableId: string
        objectId: string
    }
  }
  
export type Navigation = NativeStackScreenProps<ParamList>['navigation']
export function useNavigation(){
    return useNativeNavigation<Navigation>();
}
export type SchoolHomeRoute = NativeStackScreenProps<ParamList,'SchoolHome'>['route']
export type TimetableViewerRoute = NativeStackScreenProps<ParamList,'TimetableViewer'>['route']
  
export const Stack = createNativeStackNavigator<ParamList>();
  
export const stackLinking: LinkingOptions<ParamList> = {
    prefixes: [],
    config:{
        screens:{
            Home: {
                path: ""
            },
            SchoolHome:{
                path: "/:schoolId/",
            },
            TimetableViewer:{
                path: "/:schoolId/timetable/:timetableId/:type/:objectId",
            }
        },
        initialRouteName:"Home",
    },
}