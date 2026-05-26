import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
    return(
        <Tabs screenOptions={{ tabBarActiveTintColor: '#3b82f6', headerShown: false, }}>
            <Tabs.Screen name="index" options={{ title: 'Início', tabBarIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={24}/>),}}/>
            <Tabs.Screen name="categorias" options={{ title: 'Categorias', tabBarIcon: ({ color, focused }) => ( <MaterialIcons name="category" size={24} color="black" />),}}/>
        </Tabs>
    )
}