import React, {Component} from 'react';

function deleteClient(id){
    fetch('//localhost:3000/clients/delete/' + id,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "DELETE",
        body: JSON.stringify({
            id: id
        })
    })
    .catch(function(res){ 
        Console.log(res); 
    })
};

export default deleteClient