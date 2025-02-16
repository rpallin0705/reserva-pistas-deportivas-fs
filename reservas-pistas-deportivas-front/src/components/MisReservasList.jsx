import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const MisReservasList = () => {
    const [reservas, setReservas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const peticion = async () => {
            try {
                const response = await api.get("/mis-reservas");
                setReservas(response.data);
            } catch (err) {
                navigate("/login");
                console.log(err);
            }
        };
        peticion();
    }, [navigate]);

    const isEditableOrDeletable = (fechaReserva) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const reservaDate = new Date(fechaReserva);
        reservaDate.setHours(0, 0, 0, 0);
        return reservaDate >= today;
    };

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Instalación</th>
                        <th>Hora reserva</th>
                        <th>Fecha reserva</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva) => {
                        const editable = isEditableOrDeletable(reserva.fecha);
                        return (
                            <tr key={reserva.id}>
                                <td>{reserva.id}</td>
                                <td>{reserva.horario.instalacion.nombre}</td>
                                <td>{reserva.horario.horaInicio}</td>
                                <td>{reserva.fecha}</td>
                                <td>
                                    {editable ? (
                                        <Button
                                            as={Link}
                                            to={`/mis-reservas/edit/${reserva.id}`}
                                            state={{ reserva }}
                                            className="btn-success"
                                        >
                                            Editar
                                        </Button>
                                    ) : (
                                        <Button
                                            disabled
                                            title="No se puede editar una reserva pasada"
                                            className="btn-secondary"
                                        >
                                            No editable
                                        </Button>
                                    )}
                                </td>
                                <td>
                                    {editable ? (
                                        <Button
                                            as={Link}
                                            to={`/mis-reservas/del/${reserva.id}`}
                                            state={{ reserva }}
                                            className="btn-danger"
                                        >
                                            Eliminar
                                        </Button>
                                    ) : (
                                        <Button
                                            disabled
                                            title="No se puede borrar una reserva pasada"
                                            className="btn-secondary"
                                        >
                                            No eliminable
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    );
};

export default MisReservasList;
