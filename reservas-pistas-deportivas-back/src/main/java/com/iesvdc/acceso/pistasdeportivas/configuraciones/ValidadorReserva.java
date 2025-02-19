package com.iesvdc.acceso.pistasdeportivas.configuraciones;

import java.time.LocalDate;

import com.iesvdc.acceso.pistasdeportivas.exceptions.FechaInvalidaException;
import com.iesvdc.acceso.pistasdeportivas.exceptions.ReservaDuplicadaException;
import com.iesvdc.acceso.pistasdeportivas.exceptions.ReservaPasadaException;
import com.iesvdc.acceso.pistasdeportivas.exceptions.InstalacionReservadaException; // Nueva excepción personalizada
import com.iesvdc.acceso.pistasdeportivas.modelos.Reserva;
import com.iesvdc.acceso.pistasdeportivas.modelos.Usuario;
import com.iesvdc.acceso.pistasdeportivas.repos.RepoReserva;

public class ValidadorReserva {

    public static void validarReservaDuplicada(Usuario usuario, LocalDate fecha, RepoReserva reservaRepositorio) {
        boolean existeReserva = reservaRepositorio.existsByUsuarioAndFecha(usuario, fecha);
        if (existeReserva) {
            throw new ReservaDuplicadaException("El usuario ya tiene una reserva para la fecha: " + fecha);
        }
    }

    public static void validarFechaReserva(LocalDate fecha) {
        LocalDate hoy = LocalDate.now();
        LocalDate maxFecha = hoy.plusWeeks(2);

        if (fecha.isBefore(hoy)) {
            throw new FechaInvalidaException("No se pueden realizar reservas en fechas pasadas.");
        }

        if (fecha.isAfter(maxFecha)) {
            throw new FechaInvalidaException("No se pueden realizar reservas con más de dos semanas de antelación.");
        }
    }

    public static void validarReservaPasada(Reserva reserva) {
        LocalDate hoy = LocalDate.now();
        if (reserva.getFecha().isBefore(hoy) || reserva.getFecha().isEqual(hoy)) {
            throw new ReservaPasadaException("No se pueden actualizar reservas que ya han pasado o que son para hoy.");
        }
    }

    public static void validarInstalacionReservada(Reserva reserva, RepoReserva reservaRepositorio) {
        boolean instalacionReservada = reservaRepositorio.existsByFechaAndHorario(
            reserva.getFecha(),
            reserva.getHorario()
        );

        if (instalacionReservada) {
            throw new InstalacionReservadaException(
                "La instalación ya está reservada en esta fecha y horario: " +
                reserva.getFecha() + " " +
                reserva.getHorario().getHoraInicio() + " - " +
                reserva.getHorario().getHoraFin()
            );
        }
    }
}