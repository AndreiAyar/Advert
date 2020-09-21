import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { getCookie } from '../helpers'

const MainStateContext = React.createContext();

const GET_ME = gql`
    query($token:String) {
        me(token:$token) {
            id
            username,
            email
        }
    }
`;


const MainState = ({children}) =>{
    const [state, setState] = useState({
        user: null
    });

    const { loading, error, data } = useQuery(GET_ME, {
        variables: {
            token: getCookie('_token')
        },
        onCompleted(data) {
            if (data.me !== null) {
                setState({
                    ...state,
                    user: data.me,  
                    token:data.token
                });
            }
        }
    });

    return (
        <MainStateContext.Provider value={{state, setState}}>
            {children}
        </MainStateContext.Provider>
    );
}

export {
    MainState,
    MainStateContext
}