import React from "react";

const RepoItem = (props)=>{
    // console.log(props.repo);
    return(
        <div className="card">
            <h3>
                <a href={props.repo.html_url}>{props.repo.name}</a>
            </h3>
         
        </div>
    )
};

export default RepoItem;