package com.iesvdc.acceso.pistasdeportivas.controladores;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iesvdc.acceso.pistasdeportivas.modelos.Horario;
import com.iesvdc.acceso.pistasdeportivas.modelos.Instalacion;
import com.iesvdc.acceso.pistasdeportivas.modelos.Reserva;
import com.iesvdc.acceso.pistasdeportivas.servicios.ServiHorario;
import com.iesvdc.acceso.pistasdeportivas.servicios.ServiInstalacion;
import com.iesvdc.acceso.pistasdeportivas.servicios.ServiMisReservas;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Schema;

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

    @GetMapping("/horario/instalacion/{id}/fecha/{fecha}")
    @Operation(summary = "Obtener horarios disponibles", description = "Devuelve una lista con los horarios disponibles para una instalación en una fecha específica.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de horarios disponibles", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Horario.class)) }),
            @ApiResponse(responseCode = "404", description = "No hay horarios disponibles para la instalación y fecha especificadas", content = @Content)
    })
    public ResponseEntity<List<Horario>> horariosPorInstalacionFecha(
            @Parameter(description = "ID de la instalación") @PathVariable long id,
            @Parameter(description = "Fecha para la búsqueda de horarios libres (Formato: YYYY-MM-DD)") @PathVariable LocalDate fecha) {

        List<Horario> listFreeHorarios = serviHorario.findFreeHorarios(id, fecha);

        return !listFreeHorarios.isEmpty() ? ResponseEntity.ok(listFreeHorarios)
                : ResponseEntity.notFound().build();
    }

}
