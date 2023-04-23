import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';

const App = () => {

    const [tareas, setTareas] = useState([]);
    const [descripcion, setDescripcion] = useState("");


    const mostrarTareas = async () => {
        const response = await fetch("api/tareas/Lista");

        if (response.ok) {
            const data = await response.json();
            setTareas(data);
        } else {
            console.log("status code:" + response.status)
        }
    }


    // Método para convertir fecha
    const formatDate = (string) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = new Date(string).toLocaleDateString("es-PE", options);
        let hora = new Date(string).toLocaleTimeString();

        return fecha + " | " + hora
    }


    useEffect(() => {

        mostrarTareas();

    }, [])


    const guardarTarea = async(e) => {
        e.preventDefault()

        const response = await fetch("api/tareas/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'            
            },
            body: JSON.stringify({descripcion:descripcion})
        })

        if (response.ok) {
            setDescripcion("");
            mostrarTareas();
        }

    }


    const cerrarTarea = async (id) => {

        const response = await fetch("api/tareas/Cerrar/" + id, {
            method: "DELETE",
        })

        if (response.ok) {
            mostrarTareas();
        }

    }




    return (

        <div className="container bg-dark p-4 vh-100%">

            <h2 className="text-withe">Lista de tareas</h2>

            <div className="row">

                <div className="col-sm-12">
                    <form onSubmit={guardarTarea}>
                        <div className="input-group">
                            <input type="text"
                                className="form-control"
                                placeholder="Ingrese una nueva descripcion de tarea"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                            <button type="submit" className="btn btn-success">Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-12">

                    <div className="list-group">
                        {
                            tareas.map(
                                (item) => (
                                    <div key={ item.idTarea } className="list-group-item list-group-item-action">
                                        <h5 className="text-dark">{item.descripcion}</h5>

                                        <div className="d-flex justify-content-between">
                                            <small className="text-muted">{formatDate(item.fechaRegistro)}</small>
                                            <button onClick={() => cerrarTarea(item.idTarea)} className="btn btn-lg btn-outline-danger">Cerrar</button>                                            
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default App