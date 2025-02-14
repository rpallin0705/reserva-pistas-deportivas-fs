import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const ReservaForm = () => {
    let { id } = useParams();
    const [horarioId, setHorarioId] = useState('');
    const [fecha, setFecha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const ruta = useLocation();

    const estado = () => {
        if (ruta.pathname.includes('add')) return 'add';
        if (ruta.pathname.includes('del')) return 'del';
        if (ruta.pathname.includes('edit')) return 'edit';
    };

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
            console.log(err);
        }
    };

    const deleteForm = async (event) => {
        event.preventDefault();
        try {
            await api.delete(`/mis-reservas/${id}`);
            navigate('/mis-reservas');
        } catch (err) {
            setError('No se puede completar la petición');
            console.log(err);
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
                    console.log(err);
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
                <Form.Label>Horario ID:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="ID del Horario"
                    aria-label="ID del Horario"
                    value={horarioId}
                    disabled={estado() === 'del'}
                    onChange={(e) => setHorarioId(e.target.value)}
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