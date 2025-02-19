import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const MisReservasForm = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const ruta = useLocation();

    const [instalaciones, setInstalaciones] = useState([]);
    const [selectedInstalacion, setSelectedInstalacion] = useState(null);
    const [horariosDisponibles, setHorariosDisponibles] = useState([]);
    const [selectedHorario, setSelectedHorario] = useState(null);
    const [error, setError] = useState("");
    const [formError, setFormError] = useState("");
    const [reservaId, setReservaId] = useState(null);
    const [fecha, setFecha] = useState("");

    const estado = () => {
        if (ruta.pathname.includes("add")) return "add";
        if (ruta.pathname.includes("del")) return "del";
        if (ruta.pathname.includes("edit")) return "edit";
    };

    useEffect(() => {
        const fetchInstalaciones = async () => {
            try {
                const response = await api.get("/instalacion");
                setInstalaciones(response.data);
                if (estado() !== "edit" && estado() !== "del" && id) {
                    const selected = response.data.find(instalacion => instalacion.id == id);
                    setSelectedInstalacion(selected || null);
                }
            } catch (err) {
                setError("No se puede completar la operación");
                console.error(err);
            }
        };
        fetchInstalaciones();
    }, [id, ruta]);

    useEffect(() => {
        if ((estado() === "edit" || estado() === "del") && location.state?.reserva) {
            const reserva = location.state.reserva;
            setReservaId(reserva.id);
            setFecha(reserva.fecha);
            setSelectedInstalacion(reserva.horario.instalacion);
            setSelectedHorario(reserva.horario);
        }
    }, [location]);

    useEffect(() => {
        if (selectedInstalacion && fecha) {
            const fetchHorarios = async () => {
                try {
                    const response = await api.get(`/mis-reservas/horario/instalacion/${selectedInstalacion.id}/fecha/${fecha}`);
                    setHorariosDisponibles(response.data);
                } catch (err) {
                    setError(err.response?.data?.message || "No se pudo obtener los horarios disponibles");
                    console.error(err);
                }
            };
            fetchHorarios();
        }
    }, [selectedInstalacion, fecha]);

    const handleSelectChange = (e) => {
        const selected = instalaciones.find(instalacion => instalacion.id == e.target.value);
        setSelectedInstalacion(selected);
        setSelectedHorario(null);
    };


    const validateForm = () => {
        if (!selectedInstalacion || !fecha || !selectedHorario) {
            setFormError("Todos los campos son obligatorios.");
            return false;
        }

        const today = new Date();
        const selectedDate = new Date(fecha);
        if (selectedDate <= today) {
            setFormError("La fecha no puede ser anterior a hoy.");
            return false;
        }

        const nextWeek = new Date(today.setDate(today.getDate() + 7));
        if (selectedDate > nextWeek) {
            setFormError("La fecha no puede ser más de una semana en el futuro.");
            return false;
        }

        return true;
    };

    const manejaForm = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        const reservaData = {
            id: estado() === "edit" ? reservaId : null,
            usuario: undefined,
            horario: {
                id: selectedHorario.id,
                instalacion: {
                    id: selectedInstalacion.id,
                    nombre: selectedInstalacion.nombre,
                },
                horaInicio: selectedHorario.horaInicio,
                horaFin: selectedHorario.horaFin,
            },
            fecha: fecha,
        };

        console.log(reservaData)

        try {
            const response = await api.post("/mis-reservas", reservaData);
            if (response.status === 200) {
                navigate("/mis-reservas");
            } else {
                setError(estado() === "edit" ? "Hubo un error al actualizar la reserva. Intenta nuevamente." : "Hubo un error al crear la reserva. Intenta nuevamente.");
            }
        } catch (err) {
            setError("No se puede completar la petición");
            console.error(err);
        }
    };

    const deleteForm = async (event) => {
        event.preventDefault();
        try {
            await api.delete(`/mis-reservas/${reservaId}`);
            navigate("/mis-reservas");
        } catch (err) {
            setError("No se puede completar la petición");
            console.error(err);
        }
    };

    const manejaAtras = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>ID de Instalación:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="ID de Instalación"
                    disabled
                    value={selectedInstalacion?.id || ""}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Nombre Instalación:</Form.Label>
                <Form.Select
                    value={selectedInstalacion?.id || ""}
                    onChange={handleSelectChange}
                    disabled={estado() === "del"}
                >
                    <option value="">Selecciona una instalación</option>
                    {instalaciones.map((instalacion) => (
                        <option key={instalacion.id} value={instalacion.id}>
                            {instalacion.nombre}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Fecha:</Form.Label>
                <Form.Control
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    disabled={estado() === "del"}
                    min={new Date().toISOString().split("T")[0]}
                    max={new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0]}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Horario:</Form.Label>
                <Form.Select
                    value={selectedHorario ? `${selectedHorario.horaInicio} - ${selectedHorario.horaFin}` : ""}
                    onChange={(e) => {
                        const horario = horariosDisponibles.find(
                            (horario) => `${horario.horaInicio} - ${horario.horaFin}` === e.target.value
                        );
                        setSelectedHorario(horario || null);
                    }}
                    disabled={estado() === "del"}
                >
                    <option value="">Selecciona un horario</option>
                    {horariosDisponibles.map((horario) => (
                        <option key={horario.id} value={`${horario.horaInicio} - ${horario.horaFin}`}>
                            {`${horario.horaInicio} - ${horario.horaFin}`}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                {estado() === "add" && (
                    <Button className="btn-success" onClick={manejaForm}>
                        Alta
                    </Button>
                )}
                {estado() === "edit" && (
                    <Button className="btn-success" onClick={manejaForm}>
                        Actualizar
                    </Button>
                )}
                {estado() === "del" && (
                    <Button as={Link} className="btn-danger" onClick={deleteForm}>
                        Borrar
                    </Button>
                )}
                <Button as={Link} onClick={manejaAtras}>
                    Cancelar
                </Button>
            </Form.Group>

            {formError && <p style={{ color: "red" }}>{formError}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </Form>
    );
};

export default MisReservasForm;
