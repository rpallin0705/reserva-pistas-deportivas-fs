package com.iesvdc.acceso.pistasdeportivas.servicios;


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
     * Crea o actualiza una reserva. Si tiene ID la reserva actualizamos.
     * Si actualizamos comprobamos que la reserva esté a nombre del usuario
     * que hizo login. En caso contrario lanzamos excepción.
     * 
     * @param reserva la reserva a guardar
     * @return la reserva guardada
     * @throws Exception 
     */
    public Reserva saveReserva(Reserva reserva) throws Exception {
        Usuario uLogged = serviUsuario.getLoggedUser();
        if (reserva.getId()!=null) {
            Optional<Reserva> oReserva = repoReserva.findById(reserva.getId());
            if (oReserva.isPresent()) {
                if (!oReserva.get().getUsuario().equals(uLogged)) {
                    throw new Exception("Reserva a nombre de otra persona");    
                }
            } else {
                throw new Exception("Reserva inexistente");
            }
        } else {
            // crear una nueva reserva, con el usuario que hizo login
            reserva.setUsuario(uLogged);
        }
        
        return repoReserva.save(reserva);
    }

    /**
     * Elimina una reserva por su identificador. si el usuario no coincide 
     * lo tratamos como si no existe la reserva en la BBDD.
     *
     * @param id el id de la reserva a eliminar
     */
    public Optional<Reserva> deleteReserva(Long id) {
        Optional<Reserva> reserva = repoReserva.findById(id);
        if (reserva.isPresent())
            if (reserva.get().getUsuario().equals(serviUsuario.getLoggedUser())){
                repoReserva.deleteById(id);                
            } else {
                // si el usuario no coincide lo tratamos como si no existe en la BBDD
                return Optional.empty(); 
            }
        return reserva;
    }
}
