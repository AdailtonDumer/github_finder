import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Keyboard,
    Alert,
    FlatList,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from "react";
import { GithubApi } from "../services/GithubApi";
import { ProfileCard } from "../components/ProfileCard";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { ProfileModal } from "../components/ProfileModal";

export default function Home() {
    const { Search } = GithubApi();
    const [userName, setUserName] = useState('');
    const [inputError, setInputError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [userSelected, setUserSelected] = useState();

    async function handleSearch() {
        try {
            if (userName.trim().length < 1) {
                setInputError(true)
                return
            } else {
                setInputError(false)
            }
            Keyboard.dismiss();

            setLoading(true);

            var response = await Search(userName.trim());
            setResults(response.items);

            setLoading(false);
        }
        catch (ex) {
            setLoading(false);
            console.log(ex)
            Alert.alert('Erro na requisição', 'Tente novamente')
        }
    }

    function handleOpenModal(user) {
        setUserSelected(user)
        setModalVisible(true)
    }

    function handleCloseModal() {
        setUserSelected(undefined)
        setModalVisible(false)
    }


    return (
        <>
            <ProfileModal
                visible={modalVisible}
                close={handleCloseModal}
                user={userSelected}
            />

            <View style={[styles.container, { paddingTop: getStatusBarHeight() }]}>
                <Text style={styles.title}>Github Finder</Text>
                <View style={styles.searchContainer}>
                    <View style={styles.inputBox}>
                        <TextInput
                            onSubmitEditing={handleSearch}
                            onChangeText={setUserName}
                            placeholder="Nome do perfil"
                            style={styles.input}
                            value={userName}
                            keyboardAppearance="dark"
                            returnKeyType="search"
                        />
                        <TouchableOpacity
                            style={userName.length < 1 ? { display: "none" } : { marginRight: 5 }}
                            onPress={() => setUserName('')}
                        >
                            <MaterialIcons name="close" size={18} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleSearch} style={styles.search}>
                        <MaterialIcons name="search" style={styles.searchIcon} />
                    </TouchableOpacity>

                </View>
                <Text style={inputError ? { color: 'red' } : { display: "none" }}>Preencha um nome</Text>
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>
                        Perfis
                    </Text>
                    <FlatList
                        refreshing={loading}
                        onRefresh={handleSearch}
                        data={results}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) =>
                            <ProfileCard
                                name={item.login}
                                profilePic={item.avatar_url}
                                onPress={() => handleOpenModal(item)}
                            />
                        }
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2f3437',
        padding: 8
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: 'white',
    },
    searchContainer: {
        flexDirection: "row",
        marginTop: 25
    },
    input: {
        fontSize: 16,
        padding: 12,
        flex: 1
    },
    inputBox: {
        backgroundColor: 'white',
        borderRadius: 6,
        flex: 1,
        marginRight: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    search: {
        backgroundColor: 'gray',
        borderRadius: 6,
        padding: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    searchIcon: {
        fontSize: 30,
        color: 'white'
    },
    resultContainer: {
        marginTop: 15,
        flex: 1,
    },
    resultTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    separator: {
        height: 1,
        backgroundColor: 'white'
    },
});