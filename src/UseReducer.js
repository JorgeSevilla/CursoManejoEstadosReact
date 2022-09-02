/**
 * ¿Qué es un reducer?

Son una herramienta que nos permite declarar todos los posibles estados de nuestra App para llamarlos de forma declarativa.
Necesitan 2 objetos esenciales: los estados compuestos y las acciones.
Los estados compuestos:

Son un objeto donde van a vivir como propiedades todos nuestros estados
Acciones

Responsables, al ser disparados, de pasar de un estado a otro.
Este objeto tiene 2 propiedades: action type y action payload.
Action type:

Define el nombre clave para encontrar el nuevo estado.
Action payload:

Es opcional e importante con estados dinámicos. Un estado es dinamico cuando depende del llamado de un API, 
de lo escrito por el usuario en un input, etc. Estos son estados dinámicos y los recibimos con un payload.
Flujo de trabajo:

Definimos distintos tipos de acciones con type y payload.
Enviamos estas acciones a nuestro reducer.
El reducer define los posibles estados por donde pasara nuestra App.
Con action type elegimos cual de esos estados queremos disponer con el cambio o evento del usuario.
Con action payload damos dinamismo a dicho estado. Será el mismo estado pero le daremos características especiales
 */
import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

  console.log(state);

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {

        if (state.value === SECURITY_CODE) {
            dispatch({ type: 'CONFIRM'});

        } else {
            dispatch({ type: 'ERROR'});
        }
      }, 3000);
    }
  }, [state.loading]);

 if(!state.deleted && !state.confirmed){
    return (
        <div>
          <h2>Eliminar {name}</h2>
          <p>Por favor, escribe el código de seguridad</p>
    
          {state.error && !state.loading && <p>Error: el código es incorrecto</p>}
    
          {state.loading && <p>Cargando...</p>}
    
          <input
            placeholder="Código de seguridad"
            value={state.value}
            onChange={(event) => {
                dispatch({ type: 'WRITE', payload: event.target.value});

            }}
          />
          <button
            onClick={() => {
                dispatch({ type: 'CHECK'});
            }}
          >
            Comprobar
          </button>
        </div>
      );
 }else if(!!state.confirmed && !state.deleted){
    return(
        <React.Fragment>
            <p>Está seguro?</p>
            <button
                onClick={() =>{
                    dispatch({ type: 'DELETE'});
                }}
            >
                Si, eliminar
            </button>
            <button
                onClick={() =>{
                    dispatch({ type: 'RESET'});
                }}
            >
                Cancelar
            </button>
        </React.Fragment>
    );
 }else {
    return(
        <React.Fragment>
            <p>Eliminado con éxito</p>
            <button
                onClick={() =>{
                    dispatch({ type: 'RESET'});                   
                }}
            >
                Volver atrás
            </button>
        </React.Fragment>
    );
 }
}

const initialState = {
    value: '', 
    error: false, 
    loading: false,
    deleted: false, 
    confirmed: false,
};

// 3 formas de crear un reducer 

//Primera forma 
//const reducer = (state, action) =>{

//}

/*const reducerIf = (state, action) => {
    if(action.type === 'ERROR'){
        return{
            ...state,
            error: true,
            loading: false,
        };
    }
    else if(action.type === 'CHECK'){
        return{
            ...state,
            loading: true,
        };
    }
    else{
        return {
            ...state
        };
    }
}

//Segunda forma 
const reducerSwitch = (state, action) =>{
    switch(action, type){
        case 'ERROR':
            return{
                ...state,
                error: true,
                loading: false,
            };
        case 'CHECK':
            return{
                ...state,
                loading: true,
            };

        default:
            return{
                ...state,
            };
    }
}*/

//Tercera forma
const reducerObject = (state, payload) =>({
    'CONFIRM':{
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },

    'ERROR':{
        ...state,
        error: true,
        loading: false, 
    },

    'WRITE':{
        ...state, 
        value: payload
    },

    'CHECK':{
        ...state,
        loading: true, 
    },

    'DELETE':{
        ...state,
        deleted: true,
    },

    'RESET':{
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    }
});

const reducer = (state, action) =>{
    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type];
    }else {
        return state;
    }
};

export { UseReducer };