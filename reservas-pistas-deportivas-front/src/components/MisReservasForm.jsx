import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api"

const MisReservasForm = () => {

    let { id } = useParams();

    const [instalaciones, setInstalaciones] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const ruta = useLocation();

    const estado = () => {
        if (ruta.pathname.includes('add')) return 'add';
        if (ruta.pathname.includes('del')) return 'del';
        if (ruta.pathname.includes('edit')) return 'edit';
    }

    const manejaForm = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/admin/instalacion', { id, nombre: instalaciones });
            console.log(response);
            navigate('/instalaciones')
        } catch (err) {
            setError('No se puede completar la petición');
            console.log(err);
        }
    }

    const deleteForm = async (event) => {
        event.preventDefault();
        try {
            const response = await api.delete('/admin/instalacion/' + id, { id, nombre: instalaciones });
            /*
            setId(response.data.id);
            setNombre(response.data.nombre);
            */
            console.log(response);
            navigate('/instalaciones')
        } catch (err) {
            setError('No se puede completar la petición');
            console.log(err);
        }
    }

    const manejaAtras = async (event) => {
        event.preventDefault();
        navigate(-1);
    }

    useEffect(() => {
        const peticion = async () => {
            if (!isNaN(id))
                try {
                    const response = await api.get('/instalacion');
                    setInstalaciones(response.data);
                } catch (err) {
                    setError('No se puede completar la operación');
                    // navigate('/login')
                    console.log(err);
                }
        };
        peticion();
    }, [id]);

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>ID:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="ID de Instalación"
                    aria-label="Identificador de la instalación"
                    disabled
                    value={id}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Nombre Instalacion:</Form.Label>
                <Form.Select aria-label="Instalacion" value={id}>
                    {instalaciones.map(instalacion => (
                        // TODO Hacer que la isntalacion seleccionada por defecto sea la de la ruta
                        // Hacer que a add se le pueda pasar una id por url o no si la pasa habrá una seleccionada si no no
                        <option key={instalacion.id} value={instalacion.nombre}>
                            {instalacion.nombre}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>


            {/* <Form.Group className="mb-3">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nombre de Instalación"
                    aria-label="Nombre de la instalación"
                    value={instalaciones}
                    disabled={estado()=='del'}
                    onChange={(e) => setInstalaciones(e.target.value)}
                />
            </Form.Group> */}
            <Form.Group className="mb-3">
                {
                    {
                        'add': <Button className="btn-success" onClick={manejaForm}>Alta</Button>,
                        'edit': <Button className="btn-success" onClick={manejaForm}>Actualizar</Button>,
                        'del': <Button as={Link} className="btn-danger" onClick={deleteForm} >Borrar</Button>
                    }[estado()]
                }
                <Button as={Link} onClick={manejaAtras} >
                    Cancelar
                </Button>
            </Form.Group>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </Form>
    );


}



export default MisReservasForm;