import React, {useState, useEffect, useContext} from 'react'
import {View, Text, StyleSheet, Image, Linking, ScrollView } from 'react-native'
import {GithubContext} from "../context/context/githubContext";
import Repos from "../components/Repos";
import Loading from "../components/Loading";

export default ({navigation}) => {
    const loginUrl = navigation.getParam('login')
    const {getUser, getRepos, user, repos, loading} = useContext(GithubContext)

    useEffect(() => {
        getUser(loginUrl)
        getRepos(loginUrl)
        // eslint-disable-next-line
    }, [])

    const {
        name, company, avatar_url,
        location, bio, blog,
         html_url, followers,
        following, public_repos,
        public_gists, login
    } = user

    const userData =( <View style={styles.container} >
        <Image style={styles.image} source={ { uri: avatar_url } } />
        <Text style={styles.name} >{name}</Text>

        <ScrollView>
        {location ?  <Text> <Text style={styles.bold}>Location:</Text> {location}</Text> : null}
        <View>
            {bio ? <Text> <Text style={styles.bold}>BIO:</Text> {bio}</Text> : null}
        </View>

        <Text style={styles.link}
              onPress={() => Linking.openURL(html_url)}
        >Open profile</Text>

        {login ? <Text> <Text style={styles.bold}>Username:</Text> {login}</Text> : null}
        {company ? <Text> <Text style={styles.bold}>Company:</Text> {company}</Text> : null}
        {blog ? <Text> <Text style={styles.bold}>Website:</Text> {blog}</Text>: null}

        <Text> <Text style={styles.bold}>Followers:</Text> {followers}</Text>
        <Text> <Text style={styles.bold}>Following:</Text> {following}</Text>
        <Text> <Text style={styles.bold}>Public repos:</Text> {public_repos}</Text>
        <Text> <Text style={styles.bold}>Gists:</Text> {public_gists}</Text>

        <Repos repos={repos}/>
        </ScrollView>
    </View>
)

    return loading ? <Loading/> : userData

}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 300,
        alignSelf: 'center',
        marginBottom: 20
    },
    container: {
        marginTop: 15,
        marginLeft: 15,
        flex: 1
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    bold: {
        fontWeight: 'bold'
    },
    link: {
        color: 'blue',
        fontWeight: 'bold'
    }
})
