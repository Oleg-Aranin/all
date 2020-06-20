import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {Context} from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

export default ({navigation}) => {
    const {state, editBlogPost} = useContext(Context)
    const idBlog = navigation.getParam('id')
    const blogPost = state.find(({id}) => id === idBlog)



    return <BlogPostForm
        initialValues={{title: blogPost.title, content: blogPost.content}}
        onSubmit={(title, content) => {
        editBlogPost(idBlog, title, content, () => navigation.pop())
        }}
    />
}

const styles = StyleSheet.create({})
