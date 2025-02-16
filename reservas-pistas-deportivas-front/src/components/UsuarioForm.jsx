import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const UsuarioForm = () => {
    let { id } = useParams();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tipo, setTipo] = useState('USUARIO');
    const [enabled, setEnabled] = useState(true);
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
            const usuario = { username, email, password, tipo, enabled };
            if (estado() === 'add') {
                await api.post('/admin/usuario', usuario);
            } else if (estado() === 'edit') {
                await api.put(`/admin/usuario/${id}`, usuario);
            }
            navigate('/usuarios');
        } catch (err) {
            setError('No se puede completar la petición');
            console.log(err);
        }
    };

    const deleteForm = async (event) => {
        event.preventDefault();
        try {
            await api.delete(`/admin/usuario/${id}`);
            navigate('/usuarios');
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
                    const response = await api.get(`/admin/usuario/${id}`);
                    setUsername(response.data.username);
                    setEmail(response.data.email);
                    setTipo(response.data.tipo);
                    setEnabled(response.data.enabled);
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
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Rol:</Form.Label>
                <Form.Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="USUARIO">USUARIO</option>
                    <option value="OPERARIO">OPERARIO</option>
                    <option value="ADMIN">ADMIN</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Activo:</Form.Label>
                <Form.Check
                    type="switch"
                    checked={enabled}
                    onChange={(e) => setEnabled(e.target.checked)}
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

export default UsuarioForm;