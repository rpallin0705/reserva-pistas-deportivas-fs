import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const ReservaForm = () => {
    let { id } = useParams();
    const [horarioId, setHorarioId] = useState('');
    const [fecha, setFecha] = useState('');
    const [error, setError] = useState('');
    const [horariosDisponibles, setHorariosDisponibles] = useState([]);
    const navigate = useNavigate();
    const ruta = useLocation();

    const estado = () => {
        if (ruta.pathname.includes('add')) return 'add';
        if (ruta.pathname.includes('del')) return 'del';
        if (ruta.pathname.includes('edit')) return 'edit';
    };

    // Función para obtener los horarios disponibles
    const obtenerHorariosDisponibles = async (instalacionId, fecha) => {
        try {
            
            const response = await api.get(`/horario/instalacion/${instalacionId}/fecha/${fecha}`);
            console.log("Horarios disponibles:", response.data);
            setHorariosDisponibles(response.data);
        } catch (err) {
            
                setError('No se pudieron cargar los horarios disponibles');
                console.error("Error al obtener horarios:", err);
        }
    };

    
    useEffect(() => {
        if (fecha) {
            const instalacionId = 1;
            console.log("Obteniendo horarios para fecha:", fecha);
            obtenerHorariosDisponibles(instalacionId, fecha);
        }
    }, [fecha]);

    const manejaForm = async (event) => {
        event.preventDefault();
        try {
            const reserva = { horario: { id: horarioId }, fecha };
            if (estado() === 'add') {
                await api.post('/mis-reservas', reserva);
            } else if (estado() === 'edit') {
                await api.put(`/mis-reservas/${id}`, reserva);
            }
            navigate('/mis-reservas');
        } catch (err) {
            setError('No se puede completar la petición');
            console.error("Error al enviar el formulario:", err);
        }
    };

    const deleteForm = async (event) => {
        event.preventDefault();
        try {
            await api.delete(`/mis-reservas/${id}`);
            navigate('/mis-reservas');
        } catch (err) {
            setError('No se puede completar la petición');
            console.error("Error al eliminar la reserva:", err);
        }
    };

    const manejaAtras = async (event) => {
        event.preventDefault();
        navigate(-1);
    };

    useEffect(() => {
        const peticion = async () => {
            if (!isNaN(id)) {
                try {
                    const response = await api.get(`/mis-reservas/${id}`);
                    setHorarioId(response.data.horario.id);
                    setFecha(response.data.fecha);
                } catch (err) {
                    setError('No se puede completar la operación');
                    console.error("Error al obtener la reserva:", err);
                }
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
                    placeholder="ID de Reserva"
                    aria-label="Identificador de la reserva"
                    disabled
                    value={id}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Fecha:</Form.Label>
                <Form.Control
                    type="date"
                    placeholder="Fecha de la reserva"
                    aria-label="Fecha de la reserva"
                    value={fecha}
                    disabled={estado() === 'del'}
                    onChange={(e) => setFecha(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Horario:</Form.Label>
                <Form.Select
                    aria-label="Selecciona un horario"
                    value={horarioId}
                    disabled={estado() === 'del'}
                    onChange={(e) => setHorarioId(e.target.value)}
                >
                    <option value="">Selecciona un horario</option>
                    {horariosDisponibles.map((horario) => (
                        <option key={horario.id} value={horario.id}>
                            {`${horario.horaInicio} - ${horario.horaFin}`}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                {
                    {
                        'add': <Button className="btn-success" onClick={manejaForm}>Crear</Button>,
                        'edit': <Button className="btn-success" onClick={manejaForm}>Actualizar</Button>,
                        'del': <Button className="btn-danger" onClick={deleteForm}>Borrar</Button>
                    }[estado()]
                }
                <Button onClick={manejaAtras}>Cancelar</Button>
            </Form.Group>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </Form>
    );
};

export default ReservaForm;