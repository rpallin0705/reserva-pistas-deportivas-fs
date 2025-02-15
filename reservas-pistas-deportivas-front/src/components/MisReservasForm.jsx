import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const MisReservasForm = () => {
    let { id } = useParams();

    const [instalaciones, setInstalaciones] = useState([]);
    const [selectedInstalacion, setSelectedInstalacion] = useState(null);
    const [horariosDisponibles, setHorariosDisponibles] = useState([]);
    const [selectedHorario, setSelectedHorario] = useState(null);
    const [error, setError] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [fecha, setFecha] = useState("");
    const [formError, setFormError] = useState("");

    const navigate = useNavigate();
    const ruta = useLocation();

    const estado = () => {
        if (ruta.pathname.includes("add")) return "add";
        if (ruta.pathname.includes("del")) return "del";
        if (ruta.pathname.includes("edit")) return "edit";
    };

    const manejaForm = async (event) => {
        event.preventDefault();

        if (!selectedInstalacion || !fecha || !horaInicio || !horaFin || !selectedHorario) {
            setFormError("Todos los campos son obligatorios.");
            return;
        }


        const today = new Date();
        const selectedDate = new Date(fecha);

        if (selectedDate <= today) {
            setFormError("La fecha no puede ser anterior a hoy.");
            return;
        }


        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        if (selectedDate > nextWeek) {
            setFormError("La fecha no puede ser más de una semana en el futuro.");
            return;
        }

        try {
            const response = await api.post("/mis-reservas", {
                usuario: { id: 0 },
                horario: {
                    id: selectedHorario.id,
                    instalacion: { id: selectedInstalacion.id, nombre: selectedInstalacion.nombre },
                    horaInicio: selectedHorario.horaInicio,
                    horaFin: selectedHorario.horaFin
                },
                fecha: fecha,
            });

            if (response.status === 200) {
                navigate("/mis-reservas");
            } else {
                setError("Hubo un error al crear la reserva. Intenta nuevamente.");
            }
        } catch (err) {
            setError("No se puede completar la petición");
            console.log(err);
        }
    };

    const deleteForm = async (event) => {
        event.preventDefault();
        try {
            const response = await api.delete(`/mis-reservas`);
            console.log(response);
            navigate("/mis-reservas");
        } catch (err) {
            setError("No se puede completar la petición");
            console.log(err);
        }
    };

    const manejaAtras = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    useEffect(() => {
        const peticion = async () => {
            try {
                const response = await api.get("/instalacion");
                setInstalaciones(response.data);

                if (id) {
                    const selected = response.data.find(
                        (instalacion) => instalacion.id == id
                    );
                    setSelectedInstalacion(selected || null);
                } else {
                    setSelectedInstalacion(null);
                }
            } catch (err) {
                setError("No se puede completar la operación");
                console.log(err);
            }
        };
        peticion();
    }, [id]);

    useEffect(() => {
        if (selectedInstalacion && fecha) {
            const obtenerHorarios = async () => {
                try {
                    const response = await api.get(
                        `/mis-reservas/horario/instalacion/${selectedInstalacion.id}/fecha/${fecha}`
                    );
                    setHorariosDisponibles(response.data);
                } catch (err) {
                    if (err.response && err.response.data) {
                        setError(err.response.data.message || "No se pudo obtener los horarios disponibles");
                    } else {
                        setError("No se pudo obtener los horarios disponibles");
                    }
                    console.log(err);
                }
            };
            obtenerHorarios();
        }
    }, [selectedInstalacion, fecha]);

    const handleSelectChange = (e) => {
        const selected = instalaciones.find(
            (instalacion) => instalacion.id == e.target.value
        );
        setSelectedInstalacion(selected);
    };

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>ID:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="ID de Instalación"
                    aria-label="Identificador de la instalación"
                    disabled={estado() === "add" && selectedInstalacion === null}
                    value={selectedInstalacion ? selectedInstalacion.id : ""}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Nombre Instalación:</Form.Label>
                <Form.Select
                    aria-label="Instalación"
                    value={selectedInstalacion ? selectedInstalacion.id : ""}
                    onChange={handleSelectChange}
                >
                    <option value="">Selecciona una instalación</option>{" "}
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
                    min={new Date().toISOString().split("T")[0]}
                    max={new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0]}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Horario:</Form.Label>
                <Form.Select
                    aria-label="Horario"
                    value={horaInicio && horaFin ? `${horaInicio} - ${horaFin}` : ""}
                    onChange={(e) => {
                        const selectedHorario = horariosDisponibles.find(
                            (horario) => `${horario.horaInicio} - ${horario.horaFin}` === e.target.value
                        );
                        if (selectedHorario) {
                            setHoraInicio(selectedHorario.horaInicio);
                            setHoraFin(selectedHorario.horaFin);
                            setSelectedHorario(selectedHorario);
                        }
                    }}
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
                {
                    {
                        add: (
                            <Button className="btn-success" onClick={manejaForm}>
                                Alta
                            </Button>
                        ),
                        edit: (
                            <Button className="btn-success" onClick={manejaForm}>
                                Actualizar
                            </Button>
                        ),
                        del: (
                            <Button as={Link} className="btn-danger" onClick={deleteForm}>
                                Borrar
                            </Button>
                        ),
                    }[estado()]
                }
                <Button as={Link} onClick={manejaAtras}>
                    Cancelar
                </Button>
            </Form.Group>
            {formError && <p style={{ color: "red" }}>{formError}</p>}{" "}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </Form>
    );
};

export default MisReservasForm;
