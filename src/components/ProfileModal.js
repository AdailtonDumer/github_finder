import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { MaterialIcons } from '@expo/vector-icons'
import { GithubApi } from "../services/GithubApi";
import Avatar from '../../assets/def_avatar.png'
import { RepositoryCard } from "./RepositoryCard";

export function ProfileModal({
    visible,
    close = () => { },
    user
}) {
    const [userDetail, setUserDetail] = useState({});
    const [userRepos, setUserRepos] = useState([])
    const [loading, setLoading] = useState(true);
    const api = GithubApi();

    function handleClose() {
        setUserDetail({});
        close();
    }

    const show = async () => {
        setLoading(true)
        if (!!user) {
            const response = await api.GetUserDetails(user)
            setUserDetail(response)
        } else {
            setUserDetail({})
        }
        setLoading(false);
    };

    return (
        <Modal
            transparent
            animationType="slide"
            statusBarTranslucent
            visible={visible}
            onShow={show}
        >
            {!loading ? (
                <View style={[styles.modal, { paddingTop: getStatusBarHeight() }]}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={handleClose}>
                            <MaterialIcons name="arrow-back" style={styles.modalCloseIcon} />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>
                            Perfil de {userDetail.login}
                        </Text>
                    </View>
                    <View style={styles.separator} />
                    <ScrollView style={{ flex: 1, paddingHorizontal: 8, paddingBottom: 25 }}>
                        <View style={styles.modalProfileDetail}>
                            <Image
                                source={{
                                    uri: userDetail.avatar_url,
                                }}
                                defaultSource={Avatar}
                                style={styles.modalProfilePic}
                            />
                            <Text style={styles.profileName}>
                                {userDetail.login}
                            </Text>
                            <View style={styles.counters}>
                                <View style={styles.counter}>
                                    <MaterialIcons name="people" style={styles.counterText} />
                                    <Text style={[styles.counterText, { marginLeft: 3 }]}>{userDetail.followers} Seguidores</Text>
                                </View>
                                <View style={styles.counter}>
                                    <MaterialIcons name="people" style={styles.counterText} />
                                    <Text style={[styles.counterText, { marginLeft: 3 }]}>{userDetail.following} Seguindo</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.repositorieslist}>
                            <Text style={styles.repositoryTitle}>Repositórios</Text>

                        </View>
                        <View style={{paddingBottom: Platform.OS === 'ios' ? 25 : 0}}>
                            {userDetail?.repos?.map((item, index) =>
                            (
                                <React.Fragment key={index}>
                                <RepositoryCard item={item}/>
                                {index != userDetail.repos?.length - 1 && (
                                    <View style={styles.divider}/>
                                )}   
                                </React.Fragment>                             
                            )
                            )}
                        </View>
                    </ScrollView>
                </View>
            ) : (
                <View style={styles.activityIndicator}>
                    <ActivityIndicator color='white' size={30} />
                    <Text style={{ color: 'white' }}>Carregando</Text>
                </View>

            )}
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: '#2f3437',
    },
    modalHeader: {
        padding: 14,
        flexDirection: "row",
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'white',
        opacity: 0.7
    },
    modalCloseIcon: {
        fontSize: 22,
        color: 'white',
        padding: 5
    },
    modalProfileDetail: {
        alignItems: 'center',
        marginTop: 30
    },
    modalProfilePic: {
        width: 150,
        height: 150,
        borderRadius: 9999,
    },
    profileName: {
        color: 'white',
        fontSize: 22,
        marginTop: 15
    },
    counters: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        marginTop: 10
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterText: {
        color: '#b3b3b3',
        fontSize: 14
    },
    activityIndicator: {
        position: "relative",
        zIndex: 99999999,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#2f3437',
    },
    repositorieslist: {
        marginTop: 20
    },
    repositoryTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold"
    },
    divider: {
        width: '100%',
        height:1,
        backgroundColor: 'white'
    }
})