package com.iesvdc.acceso.pistasdeportivas.servicios;

import com.iesvdc.acceso.pistasdeportivas.configuraciones.ValidadorReserva;
import com.iesvdc.acceso.pistasdeportivas.modelos.Reserva;
import com.iesvdc.acceso.pistasdeportivas.modelos.Usuario;
import com.iesvdc.acceso.pistasdeportivas.repos.RepoReserva;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiMisReservas {

    @Autowired
    private RepoReserva repoReserva;

    @Autowired
    private ServiUsuario serviUsuario;

    /**
     * Obtiene las reservas del usuario que hizo login.
     *
     * @param usuario el usuario del que se quieren obtener las reservas
     * @return lista de reservas realizadas por el usuario
     */
    public List<Reserva> findReservasByUsuario() {
        return repoReserva.findByUsuario(serviUsuario.getLoggedUser());
    }

    /**
     * Crea o actualiza una reserva. Si tiene ID la reserva se actualiza.
     * Se validan las siguientes reglas:
     * - No se pueden hacer reservas en fechas pasadas.
     * - No se pueden hacer reservas con más de dos semanas de antelación.
     * - No se pueden hacer reservas duplicadas para el mismo usuario y fecha.
     * - No se pueden hacer reservas en instalaciones que ya estén ocupadas.
     * - No se pueden editar reservas que ya han pasado o son para hoy.
     *
     * @param reserva la reserva a guardar
     * @return la reserva guardada
     * @throws Exception si hay errores de validación
     */
    public Reserva saveReserva(Reserva reserva) throws Exception {
        Usuario uLogged = serviUsuario.getLoggedUser();
        reserva.setUsuario(uLogged);

        ValidadorReserva.validarFechaReserva(reserva.getFecha());

        if (reserva.getId() != null) {
            Optional<Reserva> oReserva = repoReserva.findById(reserva.getId());

            if (oReserva.isPresent()) {
                if (!oReserva.get().getUsuario().equals(uLogged)) {
                    throw new Exception("No puedes modificar una reserva que no te pertenece.");
                }
                ValidadorReserva.validarReservaPasada(oReserva.get());
                ValidadorReserva.validarReservaDuplicada(uLogged, reserva.getFecha(), repoReserva, reserva.getId());
            } else {
                throw new Exception("La reserva no existe.");
            }
        } else {
            ValidadorReserva.validarReservaDuplicada(uLogged, reserva.getFecha(), repoReserva, null);
            ValidadorReserva.validarInstalacionReservada(reserva, repoReserva);
        }

        return repoReserva.save(reserva);
    }

    /**
     * Elimina una reserva por su identificador. Se validan las siguientes reglas:
     * - El usuario debe ser el dueño de la reserva.
     * - No se pueden eliminar reservas que ya han pasado o que son para hoy.
     *
     * @param id el id de la reserva a eliminar
     * @return la reserva eliminada si existía y se pudo borrar
     */
    public Optional<Reserva> deleteReserva(Long id) {
        Optional<Reserva> reserva = repoReserva.findById(id);

        if (reserva.isPresent()) {
            Usuario uLogged = serviUsuario.getLoggedUser();

            if (!reserva.get().getUsuario().equals(uLogged)) {
                return Optional.empty();
            }

            ValidadorReserva.validarReservaPasada(reserva.get());

            repoReserva.deleteById(id);
        }

        return reserva;
    }
}
