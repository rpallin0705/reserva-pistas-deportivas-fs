import { useLocation } from "react-router-dom";
import MisReservasForm from "../components/MisReservasForm";

const MisReservasFormPage = () => {
    const location = useLocation();

    const getTitulo = () => {
        if (location.pathname.includes('add')) return 'Añadir una instalación';
        if (location.pathname.includes('edit')) return 'Editar una instalación';
        return 'Añadir/editar una instalación'; 
    };

    return (
        <div>
            <h3>{getTitulo()}</h3>
            <MisReservasForm />
        </div>
    );
};

export default MisReservasFormPage;
