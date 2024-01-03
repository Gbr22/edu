import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './screens/HomeScreen';
import { SchoolHomeScreen } from './screens/SchoolHomeScreen';
import { TimetableViewerScreen } from './screens/TimetableViewerScreen';
import { Stack, stackLinking } from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import { lightTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components/native';

export default function App() {

    let theme = lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <NavigationContainer linking={stackLinking}>
                <Stack.Navigator
                    screenOptions={{
                        contentStyle: {
                            backgroundColor: theme.colors.background
                        },
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="SchoolHome" component={SchoolHomeScreen} />
                    <Stack.Screen name="TimetableViewer" component={TimetableViewerScreen} />
                </Stack.Navigator>
                <StatusBar style={theme.isDark ? "light" : "dark"} backgroundColor={theme.colors.statusBar} />
            </NavigationContainer>
        </ThemeProvider>
    );
}