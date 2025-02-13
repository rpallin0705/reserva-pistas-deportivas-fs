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
        return  serviMisReservas.findReservasByUsuario();
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
            oReserva =  serviMisReservas.deleteReserva(id);
            if (oReserva.isPresent()) {
                return ResponseEntity.ok(oReserva.get());
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/horario/instalacion/{id}/fecha/{fecha}")
    public List<Horario> horariosPorInstalacionFecha(
        @PathVariable long id,
        @PathVariable LocalDate fecha) {    
        // TO-DO
        /*
         * Hacer un método que me diga para una fecha qué
         * horarios están sin reservas para una instalación
         */
        Optional<Instalacion> oInstalacion = serviInstalacion.findById(id);
        
        if (oInstalacion.isPresent())
            return serviHorario.findByInstalacion(oInstalacion.get());
        else 
            return new ArrayList<Horario>();
    }
}
