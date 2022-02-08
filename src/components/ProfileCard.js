import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function ProfileCard({profilePic, name, onPress = ()=>{}}) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image style={styles.image}
                source={{ uri: profilePic }}
            />
            <Text style={styles.nameText}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 14,
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 8
    },
    image: {
        width: 45,
        height: 45
    },
    nameText: {
        color: 'white',
        marginLeft: 15,
        fontWeight: 'bold',
        fontSize: 20
    }
});