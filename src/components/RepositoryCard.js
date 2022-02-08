import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons, Octicons } from '@expo/vector-icons'

export function RepositoryCard({ item }) {
    const { name, stargazers_count, forks, description } = item
    return (
        <TouchableOpacity style={styles.container}>
            <View style={{flex: 1}}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.description} ellipsizeMode='tail' numberOfLines={1}>{!!description ? description : 'Sem Descrição'}</Text>
            </View>
            <View style={styles.infos}>
                <View style={styles.info}>
                    <MaterialIcons name='star-outline' size={15} color='white' style={styles.infoIcon} />
                    <Text style={styles.infoText}>{stargazers_count}</Text>
                </View>
                <View style={styles.info}>
                    <Octicons name='repo-forked' color='white' size={15} style={styles.infoIcon} />
                    <Text style={styles.infoText}>{forks}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 8,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        
    },
    title: {
        color: 'white',
    },
    description: {
        color: '#b3b3b3',
    },
    infos: {
        flexDirection: 'row',
        alignItems: "center"
    },
    info: {
        flexDirection: "row",
        marginHorizontal: 3,
        alignItems: "center"
    },
    infoIcon: {
        marginHorizontal: 4
    },
    infoText: {
        color: 'white'
    }
})