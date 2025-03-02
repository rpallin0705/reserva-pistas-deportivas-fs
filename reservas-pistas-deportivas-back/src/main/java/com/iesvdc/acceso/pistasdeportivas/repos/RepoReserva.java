package com.iesvdc.acceso.pistasdeportivas.repos;


import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iesvdc.acceso.pistasdeportivas.modelos.Horario;
import com.iesvdc.acceso.pistasdeportivas.modelos.Instalacion;
import com.iesvdc.acceso.pistasdeportivas.modelos.Reserva;
import com.iesvdc.acceso.pistasdeportivas.modelos.Usuario;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;



@Repository
public interface RepoReserva extends JpaRepository<Reserva, Long> {

    // Reservas para un usuario
    List<Reserva> findByUsuario(Usuario usuario);
    List<Reserva> findByUsuario(Usuario usuario, Pageable page);
    Optional<Reserva> findByUsuarioAndFecha(Usuario usuario, LocalDate fecha);


    boolean existsByUsuarioAndFecha(Usuario usuario, LocalDate fecha);
    boolean existsByFechaAndHorario(LocalDate fecha, Horario horario);

    // Reservas para una instalación
    @Query("SELECT r FROM Reserva r WHERE r.horario.instalacion = :instalacion")
    List<Reserva> findByInstalacion(@Param("instalacion") Instalacion instalacion);
    // Reservas para una isntalación y una fecha
    @Query("SELECT r FROM Reserva r WHERE r.horario.instalacion = :instalacion ANd r.fecha = :fecha")
    List<Reserva> findByInstalacionAndDate(@Param("instalacion") Instalacion instalacion, @Param("fecha") LocalDate fecha);
    @Query("SELECT r FROM Reserva r WHERE r.horario.instalacion = :instalacion ANd r.fecha = :fecha")
    List<Reserva> findByInstalacionAndDate(@Param("instalacion") Instalacion instalacion, @Param("fecha") LocalDate fecha, Pageable page);

    @Query("SELECT r FROM Reserva r WHERE r.horario.instalacion = :instalacion")
    List<Reserva> findByInstalacion(@Param("instalacion") Instalacion instalacion, Pageable pageable);

    // Horarios disponibles (sin reservas) para una instalación y una fecha
    @Query("SELECT h FROM Horario h WHERE h.instalacion = :instalacion " +
           "AND h.id NOT IN (SELECT r.horario.id FROM Reserva r WHERE r.fecha = :fecha)")
    List<Horario> findHorarioByInstalacionFree(@Param("instalacion") Instalacion instalacion, 
                                               @Param("fecha") LocalDate fecha);
}
