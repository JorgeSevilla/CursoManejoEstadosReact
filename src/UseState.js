import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
    const [state, setState] = React.useState({
        value: '', 
        error: false, 
        loading: false,
        deleted: false, 
        confirmed: false,
    })

  console.log(state);

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
            setState({
                ...state,
                error: false,
                loading: false,
                confirmed: true,
            });
          //setLoading(false);
          //setError(true);
        } else {
            setState({
                ...state,
                loading: false,
                error: true,
            });
          //setError(true);
          //setLoading(false);
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
                setState({
                    ...state,
                    value: event.target.value,
                });
              //setError(false); //Aqui recarga repetidamente
              //setValue(event.target.value);
            }}
          />
          <button
            onClick={() => {
                setState({
                    ...state,
                    loading: true,
                });
              //setError(false); //Es una solución
              //setLoading(true);
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
                    setState({
                        ...state,
                        deleted: true,
                    });
                }}
            >
                Si, eliminar
            </button>
            <button
                onClick={() =>{
                    setState({
                        ...state,
                        confirmed: false,
                        value: '',
                    });
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
                    setState({
                        ...state,
                        confirmed: false,
                        deleted: false,
                        value: ''
                    });
                }}
            >
                Volver atrás
            </button>
        </React.Fragment>
    );
 }
}

export { UseState };
