package com.iesvdc.acceso.pistasdeportivas.controladores;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iesvdc.acceso.pistasdeportivas.modelos.Horario;
import com.iesvdc.acceso.pistasdeportivas.modelos.Instalacion;
import com.iesvdc.acceso.pistasdeportivas.modelos.Reserva;
import com.iesvdc.acceso.pistasdeportivas.servicios.ServiHorario;
import com.iesvdc.acceso.pistasdeportivas.servicios.ServiInstalacion;
import com.iesvdc.acceso.pistasdeportivas.servicios.ServiMisReservas;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/mis-reservas")
public class ReservaController {

    @Autowired
    ServiMisReservas serviMisReservas;

    @Autowired
    ServiHorario serviHorario;

    @Autowired
    ServiInstalacion serviInstalacion;

    @GetMapping
    public List<Reserva> findAll() {
        return serviMisReservas.findReservasByUsuario();
    }

    @PostMapping
    public ResponseEntity<Reserva> create(@RequestBody Reserva reserva) {
        try {
            reserva = serviMisReservas.saveReserva(reserva);
            return ResponseEntity.ok(reserva);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Reserva> delete(@PathVariable long id) {
        Optional<Reserva> oReserva;
        try {
            oReserva = serviMisReservas.deleteReserva(id);
            if (oReserva.isPresent()) {
                return ResponseEntity.ok(oReserva.get());
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Controlador que devuelve una lista con los horarios disponibles para una instalación
     * en una fecha definida
     * @param id de la instalación a la cual se quiere realizar la reserva
     * @param fecha en la que se quiere realizar la reserva para buscar horaris libres
     * @return Lista de horarios disponibles | 404 Not Found si está vacía
     */
    @GetMapping("/horario/instalacion/{id}/fecha/{fecha}")
    public ResponseEntity<List<Horario>> horariosPorInstalacionFecha(
            @PathVariable long id,
            @PathVariable LocalDate fecha) {
        // TO-DO
        /*
         * Hacer un método que me diga para una fecha qué
         * horarios están sin reservas para una instalación
         */
        List<Horario> listFreeHorarios = serviHorario.findFreeHorarios(id, fecha);

        return !listFreeHorarios.isEmpty() ? ResponseEntity.ok(listFreeHorarios)
                : ResponseEntity.notFound().build();
    }
}
