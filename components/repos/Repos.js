import React from "react";
import RepoItem from './RepoItem'

const Repos = (props)=>{
    return props.repos.map((item)=>{
       return <RepoItem repo={item} key={item.id}></RepoItem>
    })

};
export default Repos;