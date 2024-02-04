import { HomeScreen } from './screens/HomeScreen';
import { SchoolHomeScreen } from './screens/SchoolHomeScreen';
import { TimetableViewerScreen } from './screens/TimetableViewerScreen';
import { Stack, stackLinking } from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from "react-native";
import { ThemeContext } from './styles/ThemeContext';
import { AppWrapper } from './components/AppWrapper';
import { useTheme } from './styles/useTheme';

export default function App() {

    const theme = useTheme();

    return (
        <ThemeContext.Provider value={theme}>
            <AppWrapper>
                <ThemeProvider theme={theme}>
                    <NavigationContainer
                        linking={stackLinking}
                        theme={theme.navigation}
                    >
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
                        <StatusBar barStyle={theme.isDark ? "light-content" : "dark-content"} backgroundColor={theme.colors.statusBar} />
                    </NavigationContainer>
                </ThemeProvider>
            </AppWrapper>
        </ThemeContext.Provider>
    );
}