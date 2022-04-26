import React from "react";
import UserItem from "./UserItem";

const Users = props =>{
    return (
        <div style={userStyle}>
            {props.users.map((item,index)=>{
                return <UserItem key={item.id} user={item}/>
            })};
        </div>
    )
};

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users;